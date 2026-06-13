// SmartClose — Express backend
// Contract review & entity protection tool for multi-entity small business owners.

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { v4: uuidv4 } = require('uuid');
const Anthropic = require('@anthropic-ai/sdk');

const PORT = process.env.PORT || 3001;
const MODEL = 'claude-opus-4-8';
const MAX_CONTRACT_CHARS = 12000;

const DATA_DIR = path.join(__dirname, 'data');
const ENTITIES_FILE = path.join(DATA_DIR, 'entities.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// ---------------------------------------------------------------------------
// Bootstrap: make sure data/ + uploads/ exist and entities.json is valid JSON
// ---------------------------------------------------------------------------
function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  if (!fs.existsSync(ENTITIES_FILE)) {
    fs.writeFileSync(ENTITIES_FILE, JSON.stringify({ entities: [] }, null, 2));
  }
}
ensureStorage();

function readEntities() {
  try {
    const raw = fs.readFileSync(ENTITIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.entities)) return { entities: [] };
    return parsed;
  } catch (err) {
    return { entities: [] };
  }
}

function writeEntities(data) {
  fs.writeFileSync(ENTITIES_FILE, JSON.stringify(data, null, 2));
}

// ---------------------------------------------------------------------------
// Anthropic client + prompt design
// ---------------------------------------------------------------------------
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a contract review assistant for small business owners who operate through multiple legal entities. Your job is to read contracts and catch problems before the owner signs — especially entity mismatches, tax exposure, expired licenses, blank fields, and unfavorable terms.

You always output valid JSON and nothing else. No preamble, no markdown, no explanation outside the JSON structure.

Your tone in all user-facing text (redFlag details, recommendations, email body) is plain English — written for a smart business owner, not a lawyer. Avoid legal jargon. Be direct and specific. If something is critical, say so clearly.`;

function buildUserMessage(entityProfileJson, contractText) {
  return `Here is the owner's entity profile:
${entityProfileJson}

Here is the contract text:
${contractText}

Review this contract against the entity profile and return a JSON object with this exact structure:
{
  "contractSummary": "2-3 sentence plain English summary of what this contract is for and who the parties are",
  "redFlags": [
    {
      "severity": "critical | high | medium | low",
      "issue": "short title of the issue",
      "detail": "plain English explanation of the problem and why it matters",
      "recommendation": "specific action to take"
    }
  ],
  "entityCheck": {
    "contractEntity": "the entity name as written in the contract on the buyer/homeowner/client side",
    "correctEntity": "the entity from the profile that should own this asset or sign this contract, based on what the contract is for",
    "mismatch": true or false,
    "explanation": "plain English: why does it matter which entity signs this particular contract?"
  },
  "correctionEmail": {
    "to": "vendor/contractor email address if found in contract, otherwise empty string",
    "subject": "email subject line",
    "body": "full ready-to-send email requesting the correction, professional but friendly tone, referencing the specific contract ID or date if present"
  },
  "overallRisk": "green if ok to sign as-is, yellow if minor issues to address, red if do not sign without corrections",
  "okToSign": true if no critical or high issues, false if any critical or high issues exist
}

Flag these issues if present:
- Entity name on contract does not match the correct owning entity from the profile
- Contractor/vendor license or registration appears expired (check any expiration dates listed)
- Blank fields that should be filled in
- Missing exhibits referenced in the contract
- Arbitration clauses that waive court rights
- Payment terms that require more than 1/3 upfront before work begins (flag if deposit exceeds this)
- Personal liability clauses that could pierce the LLC
- No warranty or unusually short warranty
- Work start date already passed or unrealistic completion timeline
- Any field where the wrong legal entity type is used (e.g. residential contract for a commercial property)

Return only the JSON object. No other text.`;
}

// Claude sometimes wraps JSON in ```json fences despite instructions — strip them.
function extractJson(text) {
  if (!text) return null;
  let cleaned = text.trim();
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) cleaned = fenceMatch[1].trim();
  // Fall back to the first { ... last } if there's stray prose.
  const first = cleaned.indexOf('{');
  const last = cleaned.lastIndexOf('}');
  if (first !== -1 && last !== -1 && last > first) {
    cleaned = cleaned.slice(first, last + 1);
  }
  return JSON.parse(cleaned);
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const upload = multer({ dest: UPLOADS_DIR });

// GET /api/entities — return saved entity profiles
app.get('/api/entities', (req, res) => {
  res.json(readEntities());
});

// POST /api/entities — save/update the full entity profile
app.post('/api/entities', (req, res) => {
  const incoming = Array.isArray(req.body?.entities) ? req.body.entities : [];
  const now = new Date().toISOString();

  const entities = incoming.map((e) => ({
    id: e.id || uuidv4(),
    name: e.name || '',
    type: e.type || '',
    role: e.role || '',
    owns: e.owns || '',
    doesNotDo: e.doesNotDo || '',
    email: e.email || '',
    cpa: e.cpa || '',
    notes: e.notes || '',
    createdAt: e.createdAt || now,
    updatedAt: now,
  }));

  writeEntities({ entities });
  res.json({ success: true });
});

// POST /api/review — analyze an uploaded contract against an entity profile
app.post('/api/review', upload.single('contract'), async (req, res) => {
  const filePath = req.file ? req.file.path : null;

  const cleanup = () => {
    if (filePath) {
      fs.unlink(filePath, () => {});
    }
  };

  try {
    if (!filePath) {
      return res.json({ error: 'No contract file uploaded.' });
    }

    // 1. Parse the PDF to text
    let contractText;
    try {
      const buffer = fs.readFileSync(filePath);
      const parsed = await pdfParse(buffer);
      contractText = (parsed.text || '').trim();
      if (!contractText) throw new Error('Empty PDF text');
    } catch (err) {
      cleanup();
      return res.json({ error: 'Could not read PDF. Please try a different file.' });
    }

    // 2. Truncate overly long contracts
    if (contractText.length > MAX_CONTRACT_CHARS) {
      contractText =
        contractText.slice(0, MAX_CONTRACT_CHARS) +
        '\n\n[Contract truncated for length — first 12000 characters shown]';
    }

    // 3. Select the relevant entity profile(s)
    const { entities } = readEntities();
    const entityId = req.body.entityId;
    let selected = entities;
    if (entityId && entityId !== 'all') {
      const match = entities.find((e) => e.id === entityId);
      selected = match ? [match] : entities;
    }
    const entityProfileJson = JSON.stringify({ entities: selected }, null, 2);

    // 4. Call the Anthropic API
    let responseText;
    try {
      const message = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: buildUserMessage(entityProfileJson, contractText) },
        ],
      });
      responseText = message.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('');
    } catch (err) {
      cleanup();
      return res.json({ error: 'Analysis failed. Please try again.' });
    }

    // 5. Parse Claude's JSON response
    let report;
    try {
      report = extractJson(responseText);
      if (!report || typeof report !== 'object') throw new Error('Not an object');
    } catch (err) {
      cleanup();
      return res.json({ error: 'Could not parse analysis. Please try again.' });
    }

    // 6. Delete the temp upload and return the structured report
    cleanup();
    return res.json(report);
  } catch (err) {
    cleanup();
    return res.json({ error: 'Analysis failed. Please try again.' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`SmartClose server running on http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠  ANTHROPIC_API_KEY is not set — contract review will fail until you add it to .env');
  }
});
