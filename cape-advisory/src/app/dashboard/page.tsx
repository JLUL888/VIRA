import Link from "next/link";
import { prisma } from "@/lib/db";
import { scoreLead } from "@/lib/scoring";
import { classifyBusinessType, detectServiceNeeds } from "@/lib/classify";
import { labelFor, LEAD_STATUSES, REVENUE_RANGES } from "@/lib/options";
import { TierBadge, StatusPill } from "@/components/dashboard/Badges";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; tier?: string; q?: string }>;
}) {
  const { status, tier, q } = await searchParams;

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { roadmap: { select: { id: true } } },
  });

  // Enrich with score/type/needs in-memory.
  const enriched = leads.map((l) => {
    const score = scoreLead(l);
    return {
      lead: l,
      score,
      type: classifyBusinessType(l),
      topNeed: detectServiceNeeds(l)[0],
      hasRoadmap: !!l.roadmap,
    };
  });

  // Filters
  let view = enriched;
  if (status) view = view.filter((e) => e.lead.status === status);
  if (tier) view = view.filter((e) => e.score.tier === tier);
  if (q) {
    const needle = q.toLowerCase();
    view = view.filter(
      (e) =>
        e.lead.businessName.toLowerCase().includes(needle) ||
        e.lead.ownerName.toLowerCase().includes(needle) ||
        e.lead.town.toLowerCase().includes(needle) ||
        e.type.toLowerCase().includes(needle),
    );
  }
  // Sort by score within the current view.
  view = [...view].sort((a, b) => b.score.total - a.score.total);

  const stats = {
    total: enriched.length,
    new: enriched.filter((e) => e.lead.status === "new").length,
    aTier: enriched.filter((e) => e.score.tier === "A").length,
    highUrgency: enriched.filter((e) => e.score.urgency === "high").length,
    recurring: enriched.filter((e) => e.score.recurringLikelihood === "high").length,
  };

  return (
    <div className="container-page py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Leads</h1>
          <p className="mt-1 text-sm text-fog">
            Business Clarity Session intake — scored, tagged, and ranked by advisory fit.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label="Total leads" value={stats.total} />
        <Stat label="New" value={stats.new} accent />
        <Stat label="A-tier fit" value={stats.aTier} />
        <Stat label="High urgency" value={stats.highUrgency} />
        <Stat label="Recurring fit" value={stats.recurring} />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <FilterLink label="All" active={!status && !tier} href="/dashboard" />
        {LEAD_STATUSES.map((s) => (
          <FilterLink
            key={s.value}
            label={s.label}
            active={status === s.value}
            href={`/dashboard?status=${s.value}`}
          />
        ))}
        <span className="mx-1 h-5 w-px bg-line" />
        {(["A", "B", "C"] as const).map((t) => (
          <FilterLink key={t} label={`${t}-tier`} active={tier === t} href={`/dashboard?tier=${t}`} />
        ))}
        <form action="/dashboard" className="ml-auto">
          <input
            type="search"
            name="q"
            placeholder="Search name, town, type…"
            defaultValue={q ?? ""}
            className="field max-w-[16rem] py-2 text-sm"
          />
        </form>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-line bg-paper-deep text-xs uppercase tracking-wide text-fog">
              <tr>
                <th className="px-4 py-3 font-semibold">Business</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Revenue</th>
                <th className="px-4 py-3 font-semibold">Likely first need</th>
                <th className="px-4 py-3 font-semibold">Fit</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {view.map(({ lead, score, type, topNeed, hasRoadmap }) => (
                <tr key={lead.id} className="group hover:bg-paper">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/leads/${lead.id}`} className="font-medium text-ink group-hover:text-harbor">
                      {lead.businessName}
                    </Link>
                    <div className="text-xs text-fog">
                      {lead.ownerName} · {lead.town}
                      {hasRoadmap && <span className="ml-2 text-sea">● roadmap</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink/80">{type}</td>
                  <td className="px-4 py-3 text-ink/80">{labelFor(REVENUE_RANGES, lead.revenueRange)}</td>
                  <td className="px-4 py-3">
                    <span className="text-ink/80">{topNeed?.label ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <TierBadge tier={score.tier} />
                      <span className="text-xs font-semibold text-ink/70">{score.total}</span>
                      {score.urgency === "high" && (
                        <span className="rounded bg-wood/15 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase text-wood">
                          urgent
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={lead.status} />
                  </td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-fog">
                    No leads match this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? "border-harbor/30 bg-harbor-50" : "border-line bg-white"}`}>
      <div className="text-2xl font-semibold text-ink">{value}</div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-fog">{label}</div>
    </div>
  );
}

function FilterLink({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active ? "border-harbor bg-harbor text-paper" : "border-line bg-white text-ink/70 hover:border-harbor/40"
      }`}
    >
      {label}
    </Link>
  );
}
