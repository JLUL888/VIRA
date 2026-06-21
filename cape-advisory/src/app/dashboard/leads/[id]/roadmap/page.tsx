import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { RoadmapDocument } from "@/components/dashboard/RoadmapDocument";
import { PrintButton } from "@/components/PrintButton";
import { saveRoadmapAction, generateRoadmapAction } from "../../../actions";

export const dynamic = "force-dynamic";

function parseList(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export default async function RoadmapPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { roadmap: true },
  });
  if (!lead) notFound();

  // No roadmap yet → offer to generate.
  if (!lead.roadmap) {
    return (
      <div className="container-narrow py-16 text-center">
        <h1 className="text-2xl font-semibold text-ink">No roadmap yet</h1>
        <p className="mt-2 text-fog">
          Generate a draft from {lead.businessName}&rsquo;s intake, then refine it before the call.
        </p>
        <form action={generateRoadmapAction} className="mt-6">
          <input type="hidden" name="id" value={lead.id} />
          <button type="submit" className="btn-primary">Generate draft roadmap</button>
        </form>
        <Link href={`/dashboard/leads/${lead.id}`} className="mt-4 inline-block text-sm text-harbor hover:underline">
          ← Back to lead
        </Link>
      </div>
    );
  }

  const r = lead.roadmap;
  const view = {
    businessName: lead.businessName,
    ownerName: lead.ownerName,
    town: lead.town,
    preparedBy: r.preparedBy,
    snapshot: r.snapshot,
    topIssues: parseList(r.topIssues),
    immediateWins: parseList(r.immediateWins),
    priorities30: parseList(r.priorities30),
    priorities90: parseList(r.priorities90),
    systemRecs: parseList(r.systemRecs),
    engagement: r.engagement,
    impactAreas: parseList(r.impactAreas),
    date: r.updatedAt.toLocaleDateString(),
  };

  return (
    <div className="container-page py-8">
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href={`/dashboard/leads/${lead.id}`} className="text-sm font-medium text-harbor hover:underline">
            ← {lead.businessName}
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-ink">Business Clarity Roadmap</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-sea">✓ Saved</span>}
          <PrintButton label="Print / Save PDF" />
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Editor */}
        <form action={saveRoadmapAction} className="no-print space-y-4 rounded-2xl border border-line bg-white p-6">
          <input type="hidden" name="id" value={lead.id} />
          <p className="text-sm text-fog">
            Edit the draft. List fields are one item per line. Changes save to the
            client-facing document on the right.
          </p>

          <Area label="Current business snapshot" name="snapshot" defaultValue={r.snapshot} rows={5} />
          <Area label="Top three operating issues (one per line)" name="topIssues" defaultValue={parseList(r.topIssues).join("\n")} rows={4} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Area label="Immediate wins" name="immediateWins" defaultValue={parseList(r.immediateWins).join("\n")} rows={5} />
            <Area label="Where this should help" name="impactAreas" defaultValue={parseList(r.impactAreas).join("\n")} rows={5} />
            <Area label="First 30 days" name="priorities30" defaultValue={parseList(r.priorities30).join("\n")} rows={5} />
            <Area label="Next 90 days" name="priorities90" defaultValue={parseList(r.priorities90).join("\n")} rows={5} />
          </div>
          <Area label="Recommended systems & workflow improvements" name="systemRecs" defaultValue={parseList(r.systemRecs).join("\n")} rows={4} />
          <Area label="Recommended way to work together" name="engagement" defaultValue={r.engagement} rows={4} />
          <div>
            <label htmlFor="preparedBy" className="field-label">Prepared by (your name)</label>
            <input id="preparedBy" name="preparedBy" defaultValue={r.preparedBy} className="field" placeholder="e.g. the advisor's name" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">Save roadmap</button>
            <button type="submit" formAction={generateRoadmapAction} className="btn-ghost">
              Regenerate from intake
            </button>
          </div>
        </form>

        {/* Live preview / print document */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <RoadmapDocument data={view} />
        </div>
      </div>
    </div>
  );
}

function Area({
  label, name, defaultValue, rows = 4,
}: {
  label: string; name: string; defaultValue: string; rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">{label}</label>
      <textarea id={name} name={name} rows={rows} defaultValue={defaultValue} className="field text-sm" />
    </div>
  );
}
