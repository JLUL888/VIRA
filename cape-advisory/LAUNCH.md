# Launch sequence & positioning

A practical go-to-market plan for the advisory practice. Sequenced so that each
phase produces something usable before the next begins. Assumptions are labeled
**[ASSUMPTION]** and are easy to change.

---

## Positioning (the one thing to get right)

**Do not lead with "fractional CFO" or "financial consulting."** That is too abstract
for the market this is built for.

**Lead with the free Business Clarity Session**, whose deliverable is a one-page
operating roadmap: _what to fix first, what can wait, and where the business is losing
time, money, or visibility._

- **Positioning sentence:** _We help Cape Cod owner-operators turn a good local
  business into an organized, scalable one — without making it corporate._
- **The niche:** owner-led businesses with **real revenue and real operating
  friction** — not startups with ideas, not businesses that only need a tax return,
  not enterprises that need a full-time CFO.
- **The archetype:** the custom-product maker at a Mashpee market — strong product,
  real demand, custom orders, online + in-person sales, inventory, customer messages,
  tax exposure, uneven cash flow, and no consolidated operating view. That is exactly
  where a controller's background is unusually valuable.
- **The bridge:** market chat → "I heard you mention the admin side is a little
  scattered" → a genuinely useful free roadmap. No tax/bookkeeping pitch required.

---

## Phase 0 — Foundation (Week 0–1)

- [ ] Choose and lock the brand name in `src/lib/brand.ts`. **[ASSUMPTION]** working
      name is _Clear Harbor Advisory_.
- [ ] Register the domain + a professional email; update `brand.contact`.
- [ ] Deploy the site (see `README.md` → Deploying). Set a strong dashboard
      passphrase and Postgres.
- [ ] Add a scheduling link (Calendly/Cal.com) and point the Clarity Session
      confirmation at it, or keep manual scheduling to start.
- [ ] Print the **Operating Checklist** (`/checklist`) and the one-page
      "Are You Making Money on Every Sale?" handout as physical leave-behinds.

## Phase 1 — Soft launch & proof (Week 2–4)

- [ ] Run **5–10 free Business Clarity Sessions** with friendly local businesses to
      pressure-test the session and the roadmap output.
- [ ] Refine the roadmap generator wording from real sessions (`src/lib/roadmap.ts`).
- [ ] Collect permission-based quotes/outcomes to replace the honesty placeholder on
      `/about` over time.

## Phase 2 — Local presence (Month 2–3)

Work the channels in `src/content/outreach.ts`:

- [ ] Become a **regular** at the Mashpee and nearby farmers markets — buy, learn
      names, talk shop, hand out the one-pager.
- [ ] Offer the free **20-minute pricing & profitability check** to vendors.
- [ ] Join 1–2 **Chambers of Commerce** (Mashpee, Falmouth) and offer to run a free
      workshop (not a sales seminar).
- [ ] Build the **referral bench**: bookkeepers, insurance agents, payroll providers,
      attorneys, banks, commercial real estate, and tax preparers/CPAs.

## Phase 3 — Content engine (ongoing, start Month 2)

Use the toolkit on `/resources` (`src/content/contentStrategy.ts`):

- [ ] Publish **"Cape Cod Small Business Fixes"** — one specific, useful fix at a time.
- [ ] Post the **LinkedIn** + **Instagram carousel** templates on a steady cadence.
- [ ] Start the **email newsletter** (Five Numbers Friday / The Off-Season Tune-Up).
- [ ] Finish the 5 outline articles in `src/content/articles.ts` into full pieces.

## Phase 4 — Convert to recurring (Month 3+)

- [ ] Convert foundation projects (cleanup, QuickBooks, pricing, systems) into
      **Owner Dashboard & Monthly Review** retainers where the fit is right
      (dashboard flags high recurring-likelihood leads).
- [ ] Introduce **Fractional Finance / Controller Support** for the larger,
      growth-stage clients.

---

## Operating cadence with the platform

1. Intake arrives → appears in `/dashboard`, **auto-scored and tagged**.
2. Triage by tier/urgency; record follow-up + call notes on the lead.
3. After the session, **Generate roadmap**, edit it, **Print/Save PDF**, send.
4. Advance status `new → contacted → scheduled → roadmap_sent → client`.

---

## Assumptions to revisit

- **[ASSUMPTION]** Brand name, contact details, phone, and email are placeholders.
- **[ASSUMPTION]** Service formats are framed as fixed-scope projects vs. monthly;
  pricing is intentionally **not** published (kept to the conversation).
- **[ASSUMPTION]** Single advisor → simple passphrase auth. Move to real auth for a team.
- **[ASSUMPTION]** SQLite for the demo; Postgres for production.
