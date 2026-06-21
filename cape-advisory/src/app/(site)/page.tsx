import Link from "next/link";
import { brand } from "@/lib/brand";
import { CTASection } from "@/components/CTASection";
import { LogoMark } from "@/components/Logo";

const controlAreas = [
  { title: "Cash flow", note: "See what's coming before the slow months arrive." },
  { title: "Pricing", note: "Set prices on margin, not on a feeling." },
  { title: "Profitability", note: "Know which products, jobs, and channels pay." },
  { title: "Bookkeeping", note: "Books that are current and tell the truth." },
  { title: "Inventory", note: "One reliable place for what you have and owe." },
  { title: "Customer follow-up", note: "Stop letting requests die in your texts." },
  { title: "Online sales", note: "Shopify, Etsy, and Amazon that reconcile." },
  { title: "Vendor management", note: "Know what you owe and when it's due." },
  { title: "Taxes", note: "Clean records and a calm hand-off, not a fire drill." },
  { title: "Payroll", note: "Pay people right without the monthly scramble." },
  { title: "Operating processes", note: "Workflows that fit how you actually work." },
];

const readyIf = [
  "You're busy and growing, but you're not fully sure where the money or the time is going.",
  "Custom orders and customer requests live in your phone, your texts, and your memory.",
  "You sell in a few places — markets, a storefront, Shopify, Etsy, Amazon — and the totals never match.",
  "QuickBooks is either not set up, set up wrong, or you're paying for it and barely using it.",
  "You can name your best-selling product, but not your most profitable one.",
  "Cash is flush in summer and tight by winter, and the off-season is a scramble.",
  "Tax season is a shoebox-and-stress event every single year.",
  "You spend your days making, selling, and talking to customers — and your nights on admin.",
];

const steps = [
  {
    n: "01",
    title: "Free Business Clarity Session",
    body: "A relaxed, one-hour working session — in person on the Cape or by video. We walk through how you sell, track orders, get paid, and keep books. No pitch.",
  },
  {
    n: "02",
    title: "Your one-page operating roadmap",
    body: "You leave with a clear, written roadmap: your biggest bottleneck, what to fix first, what can wait, and where the business is losing time, money, or visibility. It's yours to keep.",
  },
  {
    n: "03",
    title: "Fix the foundation",
    body: "If it makes sense to work together, we start with a focused project — cleanup, pricing, systems — sized to your business. Tangible deliverables, clear scope.",
  },
  {
    n: "04",
    title: "Keep it running (optional)",
    body: "When you're ready, a light monthly review keeps the numbers current and catches problems while they're small. Month to month. Step up or step back with the season.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="paper-wash relative overflow-hidden">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
          <div>
            <p className="eyebrow">Small business advisory · {brand.contact.region}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.07] text-ink sm:text-5xl lg:text-[3.4rem]">
              You built a business people love. Now make it easier to run.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/80">
              {brand.positioning} Practical help with pricing, cash flow, bookkeeping,
              inventory, online sales, and the systems that tie them together.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/clarity-session" className="btn-primary px-7 py-3.5 text-base">
                Book a free Clarity Session
              </Link>
              <Link href="/services" className="btn-ghost px-7 py-3.5 text-base">
                See how we help
              </Link>
            </div>
            <p className="mt-5 text-sm text-fog">
              One hour, no cost, no obligation — you leave with a one-page operating roadmap.
            </p>
          </div>

          {/* Archetype card */}
          <div className="relative">
            <div className="card relative z-10 bg-white/85 p-7">
              <div className="flex items-center gap-3">
                <LogoMark className="h-9 w-9 text-harbor" />
                <p className="text-sm font-semibold text-ink">The situation we fix</p>
              </div>
              <p className="mt-5 text-[1.05rem] leading-7 text-ink/85">
                &ldquo;A woodworker at the Mashpee market tells a customer,
                <span className="text-harbor"> yes, you can find it online too &mdash; the admin side just isn&rsquo;t very organized.</span>
                &rdquo;
              </p>
              <p className="mt-4 text-sm leading-6 text-fog">
                Great product. Real demand. Custom orders, market sales, online
                listings, inventory, customer messages — and no single place that
                ties it together. That gap is exactly what we close.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Strong product", "Real demand", "Scattered back office"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-ink/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute -right-3 -top-3 -z-0 h-full w-full rounded-2xl bg-sand/60" aria-hidden />
          </div>
        </div>
      </section>

      {/* ---------------- Get control of ---------------- */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">What we help you get control of</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            One business, finally pulling in the same direction.
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Most owner-operators don&rsquo;t need more software. They need the pieces
            they already have to work together — and someone who can read the numbers.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {controlAreas.map((a) => (
            <div key={a.title} className="bg-paper p-6 transition-colors hover:bg-white">
              <h3 className="text-base font-semibold text-ink">{a.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-fog">{a.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- The insight ---------------- */}
      <section className="border-y border-line bg-paper-deep">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow">The insight</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Most Cape Cod businesses don&rsquo;t lack demand. They lack an
              administrative operating system.
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-8 text-ink/80">
            <p>
              The product got good fast. The systems didn&rsquo;t get a chance to keep up.
              So the business runs on the owner&rsquo;s memory, a phone full of texts, a
              notebook, a few spreadsheets, and whatever the register and the
              marketplaces happen to report.
            </p>
            <p>
              That works — until it doesn&rsquo;t. We build the missing layer: the
              connected, right-sized system that lets you see the whole business and
              spend your time on the work that actually grows it.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Ready if ---------------- */}
      <section className="container-page py-16 md:py-20">
        <p className="eyebrow">You may be ready for help if…</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl">
          Any of these sound like your week?
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {readyIf.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border border-line bg-white/60 p-5">
              <CheckIcon />
              <span className="text-[1.02rem] leading-7 text-ink/85">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-ink/75">
          If a few of these landed, that&rsquo;s normal — and fixable.{" "}
          <Link href="/clarity-session" className="font-medium text-harbor underline-offset-4 hover:underline">
            Start with a free Clarity Session.
          </Link>
        </p>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="border-y border-line bg-ink text-paper">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow text-wood-soft">How the advisory process works</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Clear, low-pressure, and useful from the first hour.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-paper/10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="bg-ink p-7">
                <span className="font-display text-3xl text-wood">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-paper">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-paper/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Not another accounting firm ---------------- */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Not another accounting firm</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              We&rsquo;re here to make the business easier to run — not just to file a return.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/80">
              A tax preparer files your taxes once a year. A bookkeeper records what
              already happened. Both matter. Neither sits down with you to figure out
              why custom orders feel chaotic, whether your pricing holds up, or how to
              get the slow season to stop catching you off guard.
            </p>
            <p className="mt-4 text-lg leading-8 text-ink/80">
              That&rsquo;s operating work — and it&rsquo;s the gap most Cape Cod owners are
              standing in.
            </p>
          </div>
          <div className="grid content-start gap-4">
            <Compare
              not="A firm that talks in jargon and bills by the hour"
              yes="Plain English, scoped projects, and tangible deliverables"
            />
            <Compare
              not="Software for software's sake"
              yes="The few right tools, connected and documented"
            />
            <Compare
              not="A report you file away and never read"
              yes="One page you actually use to make decisions"
            />
            <Compare
              not="Corporate process bolted onto a local business"
              yes="Systems sized to how you actually work"
            />
          </div>
        </div>
      </section>

      {/* ---------------- Local credibility ---------------- */}
      <section className="border-t border-line bg-paper-deep">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:py-20">
          <div>
            <p className="eyebrow">Rooted on the Cape</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Built for Cape Cod businesses, by someone from here.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/80">
              {brand.founder.summary} The result: sophisticated, big-finance thinking,
              applied with a small-business touch — for the makers, growers, builders,
              and shopkeepers who give the Cape its character.
            </p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-medium text-harbor hover:underline">
              More about the founder
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { k: "From here", v: "Grew up on Cape Cod; serving Mashpee, Falmouth, Sandwich, Barnstable, and beyond." },
              { k: "Serious finance background", v: "Private equity, audit, corporate accounting, and financial reporting." },
              { k: "Systems & operations", v: "Hands-on process redesign and systems implementation experience." },
              { k: "Owner-first", v: "Practical, nonjudgmental help built for real owner-operators." },
            ].map((c) => (
              <div key={c.k} className="card bg-white/70 p-6">
                <p className="text-sm font-semibold text-harbor">{c.k}</p>
                <p className="mt-2 text-sm leading-6 text-ink/75">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sea/15 text-sea">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Compare({ not, yes }: { not: string; yes: string }) {
  return (
    <div className="card bg-white/70 p-5">
      <p className="flex items-center gap-2 text-sm text-fog line-through decoration-fog/40">
        <span aria-hidden className="text-fog/60">✕</span>
        {not}
      </p>
      <p className="mt-2 flex items-center gap-2 text-[0.98rem] font-medium text-ink">
        <span aria-hidden className="text-sea">✓</span>
        {yes}
      </p>
    </div>
  );
}
