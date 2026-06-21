import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "A CPA and finance operator who grew up on Cape Cod, bringing sophisticated but practical operating support to local owner-operated businesses.",
};

const principles = [
  {
    title: "Practical over theoretical",
    body: "Every engagement ends in something you can use — a clean file, a pricing model, a working system, a one-page dashboard. Not a binder.",
  },
  {
    title: "Plain English, always",
    body: "If you can't explain a number, you can't act on it. We translate finance into decisions, not the other way around.",
  },
  {
    title: "Sized to your business",
    body: "No enterprise software bolted onto a two-person shop. The right tools, connected, and nothing you don't need.",
  },
  {
    title: "Nonjudgmental",
    body: "Behind on books? Running on a notebook and Venmo? That's the normal starting point, not a problem to be embarrassed about.",
  },
];

const background = [
  { label: "Private equity", note: "Evaluating and improving how businesses actually make money." },
  { label: "Audit", note: "A trained eye for where the numbers don't add up." },
  { label: "Corporate accounting & reporting", note: "Building books and reporting that leadership can trust." },
  { label: "Operational process redesign", note: "Rebuilding how work flows so it's faster and cleaner." },
  { label: "Systems implementation", note: "Standing up the tools that run a business day to day." },
  { label: "Owner-led advisory", note: "Sitting across from owners and helping them decide." },
];

export default function AboutPage() {
  return (
    <>
      <section className="paper-wash border-b border-line">
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div>
            <p className="eyebrow">About {brand.name}</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
              Big-finance discipline, applied with a small-business touch.
            </h1>
            <p className="mt-6 text-lg leading-8 text-ink/80">
              {brand.fullName} was started to close a specific gap: Cape Cod is full of
              businesses with excellent products and loyal customers whose back office
              never caught up to their success. The skills that keep large companies
              organized are exactly what these owners need — just sized down, made
              practical, and delivered without the jargon.
            </p>
          </div>
          <div className="card bg-white/80 p-7">
            <p className="text-sm font-semibold text-harbor">The founder, in short</p>
            <p className="mt-3 leading-7 text-ink/85">{brand.founder.summary}</p>
            <p className="mt-4 text-sm text-fog">
              Grew up on Cape Cod · Boston College · years in New York finance · now
              bringing it home.
            </p>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="container-page py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">The background</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            Where the approach comes from.
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Each of these disciplines maps directly onto a real problem a growing
            local business runs into.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {background.map((b) => (
            <div key={b.label} className="card bg-white/70 p-6">
              <h3 className="text-base font-semibold text-ink">{b.label}</h3>
              <p className="mt-2 text-sm leading-6 text-fog">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why this, why here */}
      <section className="border-y border-line bg-paper-deep">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow">Why this, why here</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              The Mashpee market started it.
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-8 text-ink/80">
            <p>
              The idea crystallized at a farmers market in Mashpee Commons, watching a
              custom woodworker explain to a customer that yes, his pieces were probably
              available online or on Amazon &mdash; but the &ldquo;administrative side&rdquo; of the
              business wasn&rsquo;t very organized.
            </p>
            <p>
              Strong product. Real demand. Custom orders. Online listings. Inventory.
              Customer messages. Tax exposure. Uneven cash flow. And no consolidated view
              of any of it. That&rsquo;s not an unusual business on the Cape &mdash; it&rsquo;s the
              typical one. And it&rsquo;s exactly where a finance operator&rsquo;s skills are
              unusually valuable.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="container-page py-16 md:py-20">
        <p className="eyebrow">How we work</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl">
          Four principles you&rsquo;ll feel in the first hour.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="card bg-white/70 p-7">
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 leading-7 text-ink/80">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-white/60 p-6 text-sm leading-6 text-fog">
          <strong className="font-semibold text-ink/70">A note on honesty:</strong>{" "}
          This site intentionally avoids invented testimonials, client results, revenue
          figures, or credentials that haven&rsquo;t been verified. As the practice grows,
          real client stories and outcomes will be added here with permission.
        </div>
      </section>

      <CTASection />
    </>
  );
}
