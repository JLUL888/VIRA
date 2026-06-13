# SmartClose

A contract review tool for small business owners who operate through multiple legal
entities (LLCs, S-Corps, etc.). Upload a vendor contract (PDF), and SmartClose compares
it against your saved entity profile and returns a plain-English red-flag report plus a
ready-to-send correction email.

It catches:

- **Entity mismatches** — the wrong LLC/entity named on the contract
- **Tax & liability exposure** — personal-liability clauses, wrong entity type
- **Contract red flags** — expired licenses, blank fields, missing exhibits, arbitration
  waivers, oversized deposits, weak/no warranty, unrealistic timelines

## Tech stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **AI:** Anthropic Claude API (`claude-opus-4-8`)
- **PDF parsing:** `pdf-parse`
- **Storage:** local JSON file (`data/entities.json`) — no database needed for the MVP

## Setup

```
1. cd smartclose
2. npm install
3. cp .env.example .env   # then add your ANTHROPIC_API_KEY
4. npm run dev
5. Open http://localhost:5173
6. Start by clicking "My Entities" and building your entity profile
7. Then go to "Review a Contract" and upload a PDF
```

`npm run dev` runs the Express API (port 3001) and the Vite dev server (port 5173)
together. Vite proxies `/api/*` to the backend, so the browser only talks to one origin
in development.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Run API + client together (development) |
| `npm run server` | Run the Express API only |
| `npm run client` | Run the Vite dev server only |
| `npm run build` | Build the client for production into `client/dist` |
| `npm start` | Run the Express API (production) |

## API

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/entities` | Return saved entity profiles |
| `POST` | `/api/entities` | Save/replace the entity profile (`{ entities: [...] }`) |
| `POST` | `/api/review` | Multipart upload: `contract` (PDF) + `entityId` (`"all"` or an id) |

`/api/review` always responds with HTTP 200. On failure it returns `{ "error": "..." }`
so the frontend can show a useful message. On success it returns the structured report
(`contractSummary`, `redFlags[]`, `entityCheck`, `correctionEmail`, `overallRisk`,
`okToSign`).

## Notes

- The entity profile persists between sessions in `data/entities.json` — this is the
  context that makes the tool more valuable over time.
- Uploaded PDFs are stored only temporarily in `uploads/` and deleted right after
  analysis.
- Contract text is truncated to the first 12,000 characters before being sent to the API.
- All API calls stay server-side; the browser never sees the Anthropic API key.
- SmartClose is a drafting aid, **not legal advice.**
