import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { scoreLead } from "@/lib/scoring";
import { classifyBusinessType, detectServiceNeeds } from "@/lib/classify";
import {
  labelFor,
  LEAD_STATUSES,
  REVENUE_RANGES,
  HEADCOUNT_BANDS,
  ACCOUNTING_SYSTEMS,
} from "@/lib/options";
import { TierBadge, StatusPill, MeterBar } from "@/components/dashboard/Badges";
import { updateLeadAction, generateRoadmapAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { roadmap: { select: { id: true, updatedAt: true } } },
  });
  if (!lead) notFound();

  const score = scoreLead(lead);
  const type = classifyBusinessType(lead);
  const needs = detectServiceNeeds(lead);

  const yn = (v: string) =>
    ({ yes: "Yes", somewhat: "Somewhat", no: "No", sometimes: "Sometimes", a_little: "A little" })[v] ?? v;

  return (
    <div className="container-page py-8">
      <Link href="/dashboard" className="text-sm font-medium text-harbor hover:underline">
        ← All leads
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-ink">{lead.businessName}</h1>
            <StatusPill status={lead.status} />
          </div>
          <p className="mt-1 text-sm text-fog">
            {lead.ownerName} · {lead.town} · received {lead.createdAt.toLocaleDateString()}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/80">
            <a href={`mailto:${lead.email}`} className="hover:text-harbor">{lead.email}</a>
            <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} className="hover:text-harbor">{lead.phone}</a>
            {lead.links && <span className="text-fog">{lead.links}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/leads/${lead.id}/roadmap`}
            className={lead.roadmap ? "btn-ghost text-sm" : "hidden"}
          >
            View roadmap
          </Link>
          <form action={generateRoadmapAction}>
            <input type="hidden" name="id" value={lead.id} />
            <button type="submit" className="btn-primary text-sm">
              {lead.roadmap ? "Regenerate roadmap" : "Generate roadmap"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT column */}
        <div className="space-y-6">
          {/* Opportunity summary */}
          <Panel title="Preliminary opportunity summary">
            <div className="flex items-center gap-3">
              <TierBadge tier={score.tier} />
              <div>
                <p className="font-semibold text-ink">{score.tierLabel} · score {score.total}/100</p>
                <p className="text-sm text-fog">{score.headline}</p>
              </div>
            </div>
            <p className="mt-4 leading-7 text-ink/85">
              <strong>{type}</strong> in {lead.town || "the Cape"}. Most likely starting
              points: {needs.slice(0, 3).map((n) => n.label).join(", ")}.
            </p>
          </Panel>

          {/* Score breakdown */}
          <Panel title="Why this score">
            <div className="space-y-3.5">
              {score.dimensions.map((d) => (
                <div key={d.key}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-ink">{d.label}</span>
                    <span className="text-xs font-semibold text-fog">{d.score}</span>
                  </div>
                  <div className="mt-1"><MeterBar value={d.score} /></div>
                  <p className="mt-1 text-xs text-fog">{d.note}</p>
                </div>
              ))}
            </div>
          </Panel>

          {/* Detected needs */}
          <Panel title="Likely service needs">
            <ul className="space-y-2.5">
              {needs.map((n) => (
                <li key={n.slug} className="flex items-center justify-between gap-4 rounded-xl border border-line bg-paper p-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{n.label}</p>
                    <p className="text-xs text-fog">{n.reason}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-harbor">{n.weight}%</span>
                </li>
              ))}
            </ul>
          </Panel>

          {/* Intake detail */}
          <Panel title="What they told us">
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <Detail label="What they sell" value={lead.whatTheySell} wide />
              <Detail label="Where they sell" value={lead.whereTheySell} wide />
              <Detail label="Revenue" value={labelFor(REVENUE_RANGES, lead.revenueRange)} />
              <Detail label="Team" value={labelFor(HEADCOUNT_BANDS, lead.headcount)} />
              <Detail label="Accounting system" value={labelFor(ACCOUNTING_SYSTEMS, lead.accountingSystem)} />
              <Detail label="Engagement interest" value={lead.engagementInterest.replace(/_/g, " ")} />
              <Detail label="Confident in pricing" value={yn(lead.confidentInPricing)} />
              <Detail label="Knows profitability" value={yn(lead.knowsProfitability)} />
              <Detail label="Cash-flow struggle" value={yn(lead.cashFlowStruggle)} />
              <Detail label="Behind on books" value={yn(lead.behindOnBooks)} />
              <Detail label="Wants online help" value={lead.needsOnlineHelp ? "Yes" : "No"} />
              <Detail label="Wants tax help" value={lead.needsTaxHelp ? "Yes" : "No"} />
            </dl>
            <div className="mt-5 rounded-xl border-l-4 border-wood bg-wood-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-wood">Biggest frustration, in their words</p>
              <p className="mt-1 leading-7 text-ink/90">&ldquo;{lead.biggestFrustration}&rdquo;</p>
            </div>
          </Panel>
        </div>

        {/* RIGHT column — advisor controls */}
        <div className="space-y-6">
          <Panel title="Follow-up & notes">
            <form action={updateLeadAction} className="space-y-4">
              <input type="hidden" name="id" value={lead.id} />
              <div>
                <label htmlFor="status" className="field-label">Status</label>
                <select id="status" name="status" defaultValue={lead.status} className="field">
                  {LEAD_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="advisorNotes" className="field-label">Intake & call notes</label>
                <textarea
                  id="advisorNotes"
                  name="advisorNotes"
                  rows={10}
                  defaultValue={lead.advisorNotes}
                  placeholder="Notes from the call, scheduling details, what to dig into…"
                  className="field"
                />
              </div>
              <button type="submit" className="btn-primary w-full">Save</button>
            </form>
          </Panel>

          <Panel title="Roadmap">
            {lead.roadmap ? (
              <div className="text-sm text-ink/80">
                <p>Roadmap created. Last updated {lead.roadmap.updatedAt.toLocaleDateString()}.</p>
                <Link href={`/dashboard/leads/${lead.id}/roadmap`} className="btn-ghost mt-3 w-full">
                  Open roadmap editor
                </Link>
              </div>
            ) : (
              <div className="text-sm text-fog">
                <p>No roadmap yet. Generate a draft from the intake, then edit it before the call.</p>
                <form action={generateRoadmapAction} className="mt-3">
                  <input type="hidden" name="id" value={lead.id} />
                  <button type="submit" className="btn-primary w-full">Generate draft roadmap</button>
                </form>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-fog">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Detail({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-fog">{label}</dt>
      <dd className="mt-0.5 text-sm capitalize text-ink/85">{value}</dd>
    </div>
  );
}
