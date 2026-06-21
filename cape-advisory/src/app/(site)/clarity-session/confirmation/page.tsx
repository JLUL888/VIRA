import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { summarizeNeeds } from "@/lib/classify";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "You're booked — what happens next",
  description: "Confirmation and what to expect from your Business Clarity Session.",
};

const steps = [
  { title: "We'll reach out to schedule", body: "Within a business day or two, by email or phone, to find a time that works — in person on the Cape or by video." },
  { title: "We prepare", body: "We review what you shared so the hour is spent on your business, not on basic questions." },
  { title: "The session", body: "One relaxed hour. We walk through how you sell, get paid, track orders, and keep books — and find the biggest bottleneck." },
  { title: "Your roadmap", body: "You receive a one-page operating roadmap: what to fix first, what can wait, and where the business is losing time, money, or visibility." },
];

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const lead = id ? await prisma.lead.findUnique({ where: { id } }) : null;

  const summary = lead
    ? summarizeNeeds({
        whatTheySell: lead.whatTheySell,
        whereTheySell: lead.whereTheySell,
        revenueRange: lead.revenueRange,
        headcount: lead.headcount,
        accountingSystem: lead.accountingSystem,
        cashFlowStruggle: lead.cashFlowStruggle,
        behindOnBooks: lead.behindOnBooks,
        confidentInPricing: lead.confidentInPricing,
        knowsProfitability: lead.knowsProfitability,
        needsOnlineHelp: lead.needsOnlineHelp,
        needsTaxHelp: lead.needsTaxHelp,
        engagementInterest: lead.engagementInterest,
        biggestFrustration: lead.biggestFrustration,
      })
    : null;

  return (
    <section className="container-narrow py-16 md:py-20">
      <div className="text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-sea/15 text-sea">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="eyebrow mt-6">Request received</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
          {lead ? `Thanks, ${firstName(lead.ownerName)} — you're on the list.` : "Thanks — your request is in."}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-ink/80">
          There&rsquo;s nothing else you need to do right now. Here&rsquo;s exactly what happens
          next.
        </p>
      </div>

      {/* What to expect */}
      <ol className="mt-12 space-y-4">
        {steps.map((s, i) => (
          <li key={s.title} className="card flex gap-5 bg-white/70 p-6">
            <span className="font-display text-2xl text-wood">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="text-lg font-semibold text-ink">{s.title}</h2>
              <p className="mt-1 leading-7 text-ink/80">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Owner-facing focus preview (doubles as the categorization output) */}
      {summary && (
        <div className="mt-10 rounded-2xl border border-harbor/30 bg-harbor-50/50 p-6">
          <p className="text-sm font-semibold text-harbor">
            Based on what you shared, here&rsquo;s where we&rsquo;ll likely look first
          </p>
          <p className="mt-1 text-sm text-ink/70">
            A starting read, not a diagnosis — we&rsquo;ll confirm it together.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {summary.topNeeds.map((n) => (
              <li key={n.slug} className="rounded-full border border-harbor/30 bg-white px-3.5 py-1.5 text-sm font-medium text-harbor">
                {n.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Checklist download */}
      <div className="mt-6 card flex flex-col items-start justify-between gap-4 bg-white/70 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-semibold text-ink">While you wait: the Operating Checklist</h2>
          <p className="mt-1 text-sm text-fog">
            A 10-minute self-assessment. Skim it before the session and we&rsquo;ll have a head start.
          </p>
        </div>
        <Link href="/checklist" className="btn-wood shrink-0">
          Open the checklist
        </Link>
      </div>

      <div className="mt-10 text-center text-sm text-fog">
        Questions in the meantime? Reach us at{" "}
        <a href={`mailto:${brand.contact.email}`} className="text-harbor hover:underline">
          {brand.contact.email}
        </a>{" "}
        or{" "}
        <a href={`tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`} className="text-harbor hover:underline">
          {brand.contact.phone}
        </a>
        .
      </div>
    </section>
  );
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}
