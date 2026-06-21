# Clear Harbor Advisory — Cape Cod Small Business Operating Platform

A polished marketing site **and** internal operating platform for a Cape Cod–based
small business advisory practice. It turns a market-stall conversation
("…the admin side is a little scattered") into a structured funnel: a free
**Business Clarity Session**, a scored lead in an internal CRM, and a one-page
**Business Clarity Roadmap** the owner keeps.

> **Working brand name:** _Clear Harbor Advisory_. It is **not** hardcoded — change
> one file (`src/lib/brand.ts`) to re-brand the entire platform (nav, footer,
> metadata, roadmap header, emails). See [Re-branding](#re-branding).

---

## What's inside

| Area | Route | Notes |
| --- | --- | --- |
| Homepage | `/` | Headline, "get control of" grid, the insight, "ready if…", process, "not another accounting firm", local credibility |
| Services | `/services` | 12 modular services, grouped; problem → outcome → tangible deliverables |
| About | `/about` | Founder background, principles, the Mashpee-market origin |
| Business Clarity Session intake | `/clarity-session` | Accessible multi-section form (the conversion funnel) |
| Confirmation | `/clarity-session/confirmation` | "What to expect" + categorized focus preview + checklist download |
| Resources | `/resources` | Article library + the content engine (LinkedIn / IG / newsletter / workshops) |
| Article | `/resources/[slug]` | 9 articles (4 full, 5 outlines) |
| On the Cape | `/local-strategy` | Local business-development strategy + outreach playbook |
| Contact | `/contact` | Lightweight contact + CTA |
| Operating Checklist | `/checklist` | Printable / "Save as PDF" lead magnet (9 areas) |
| **Advisor console** | `/dashboard` | Passphrase-gated internal CRM |
| Lead detail | `/dashboard/leads/[id]` | Score breakdown, detected needs, opportunity summary, notes |
| Roadmap generator | `/dashboard/leads/[id]/roadmap` | Auto-draft → edit → print the one-page roadmap |
| Intake API | `POST /api/leads` | Validated, honeypot-protected form handler |

### The "intelligence" layer (all explainable, no black boxes)

- **`src/lib/scoring.ts`** — lead scoring across the seven dimensions from the brief
  (revenue scale, complexity, current systems, urgency, owner pain, benefit
  potential, recurring likelihood) → composite score, A/B/C tier, urgency, and
  recurring-fit, each with a human-readable note.
- **`src/lib/classify.ts`** — tags the business type and ranks likely service needs
  from the intake answers.
- **`src/lib/roadmap.ts`** — synthesizes a first-draft roadmap (snapshot, top 3
  issues, immediate wins, 30/90-day priorities, system recommendations, engagement
  structure, impact **categories** — never dollar claims). The advisor edits before
  sending.

---

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for the design system (palette + fonts in `tailwind.config.ts`)
- **Prisma** ORM with **SQLite** for zero-config local dev (swap to Postgres for prod)
- **Zod** for server-side form validation
- Server Actions for all dashboard mutations; one JSON API route for public intake

---

## Quick start

```bash
cd cape-advisory
npm install              # install dependencies
cp .env.example .env     # create local env (defaults work out of the box)
npm run setup            # create the SQLite DB schema + seed 9 fictional businesses
npm run dev              # http://localhost:3000
```

Then:

- Public site → <http://localhost:3000>
- Submit a test intake → `/clarity-session`
- Advisor console → `/dashboard` (passphrase: **`capecod`**, from `.env`)
- Open a seeded lead → **Generate roadmap** → edit → **Print / Save PDF**

### Useful scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run start` | Run the production build |
| `npm run setup` | `prisma db push` + seed |
| `npm run db:seed` | Re-seed fictional leads |
| `npm run db:reset` | Wipe + recreate + re-seed |
| `npm run lint` | Lint |

---

## Environment variables

See `.env.example`. All have sensible local defaults.

| Var | Purpose |
| --- | --- |
| `DATABASE_URL` | DB connection. Default `file:./dev.db` (SQLite). |
| `ADVISOR_DASHBOARD_PASSWORD` | Shared passphrase for `/dashboard`. **Change before deploying.** Blank = gate disabled (local only). |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL used in metadata. |

---

## Re-branding

Everything reads from **`src/lib/brand.ts`** — name, tagline, positioning sentence,
the primary offer, and contact details. Change those values and the whole platform
updates. Candidate names are listed in that file's comment (Clear Harbor Advisory,
HarborPoint Advisory, Cape Operating Co., The Owner's Office, Local Ledger Advisory,
Northstar Business Advisory, …).

Colors and typography live in **`tailwind.config.ts`** (palette) and
**`src/app/layout.tsx`** (fonts — Fraunces + Inter). The visual language is
intentionally _not_ generic coastal: warm paper, deep harbor slate, natural wood,
sea-glass — no anchors, whales, or navy-and-white clichés.

### Editing content (no code required)

- **Services** → `src/content/services.ts`
- **Articles** → `src/content/articles.ts` (add an entry; it appears in `/resources`)
- **Checklist** → `src/content/checklist.ts`
- **Local strategy / outreach** → `src/content/outreach.ts`
- **Content engine (post/newsletter/workshop templates)** → `src/content/contentStrategy.ts`
- **Form options** (revenue bands, channels, etc.) → `src/lib/options.ts`

---

## Deploying to production

### Recommended: Vercel + a hosted Postgres

1. **Switch the database to Postgres** (SQLite is for local dev):
   - In `prisma/schema.prisma`, set `datasource.provider = "postgresql"`.
   - Provision Postgres (Vercel Postgres, Neon, Supabase, RDS, …).
2. **Push the repo** and import the `cape-advisory/` project into Vercel.
3. **Set env vars** in Vercel: `DATABASE_URL`, `ADVISOR_DASHBOARD_PASSWORD`
   (a strong value), `NEXT_PUBLIC_SITE_URL`.
4. **Apply the schema**: run `npx prisma migrate deploy` (create an initial
   migration with `npx prisma migrate dev --name init` locally first), or
   `npx prisma db push` for a quick start.
5. **Deploy.** The build runs `prisma generate` automatically (`npm run build`).
6. *(Optional)* seed reference/demo data with `npm run db:seed`.

### Any Node host (Render, Railway, Fly, a VPS)

```bash
npm ci
npm run build
npm run start        # serves on $PORT (default 3000)
```

Put it behind a reverse proxy with TLS. Set the same env vars. Use a managed
Postgres for anything beyond a single-box demo.

### Hardening checklist before launch

- [ ] Set a strong `ADVISOR_DASHBOARD_PASSWORD` (and consider replacing the simple
      passphrase gate in `src/lib/auth.ts` with a real provider like Auth.js for
      multiple advisors).
- [ ] Move to Postgres; create a real migration history.
- [ ] Add an email notification on new intake (e.g. Resend) inside
      `src/app/api/leads/route.ts` after the lead is created.
- [ ] Wire the `/contact` `mailto:` form to a real handler if desired.
- [ ] Add analytics + a privacy policy.

---

## Project structure

```
cape-advisory/
├─ prisma/
│  ├─ schema.prisma        # Lead + Roadmap models
│  └─ seed.ts              # 9 fictional Cape Cod businesses
├─ src/
│  ├─ app/
│  │  ├─ (site)/           # Public marketing site (shared header/footer)
│  │  ├─ dashboard/        # Internal advisor console (gated) + server actions
│  │  └─ api/leads/        # Intake API route
│  ├─ components/          # UI: header, footer, logo, forms, roadmap doc, badges
│  ├─ content/             # Editable content modules (services, articles, etc.)
│  └─ lib/                 # brand, options, db, validation, scoring, classify, roadmap, auth
└─ README.md
```

See **`LAUNCH.md`** for the recommended go-to-market launch sequence and the
positioning rationale.

---

## A note on honesty

Per the brief, this build uses realistic **fictional** examples but invents **no**
testimonials, client results, revenue figures, or credentials. Founder background is
limited to what was provided (CPA; finance/operator; PE, audit, corporate accounting
& reporting, process redesign, systems implementation; grew up on Cape Cod; Boston
College; NYC finance). Real stories and outcomes should be added with permission as
the practice grows.
