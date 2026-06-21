import { brand } from "@/lib/brand";
import { LogoMark } from "@/components/Logo";

export type RoadmapView = {
  businessName: string;
  ownerName: string;
  town: string;
  preparedBy: string;
  snapshot: string;
  topIssues: string[];
  immediateWins: string[];
  priorities30: string[];
  priorities90: string[];
  systemRecs: string[];
  engagement: string;
  impactAreas: string[];
  date: string;
};

/** The polished, client-facing one-page Business Clarity Roadmap. */
export function RoadmapDocument({ data }: { data: RoadmapView }) {
  return (
    <div className="print-clean mx-auto max-w-3xl rounded-2xl border border-line bg-white p-8 shadow-soft sm:p-10">
      {/* Header */}
      <header className="flex items-start justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8 text-harbor" />
            <span className="font-display text-lg font-semibold text-ink">{brand.fullName}</span>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-wood">
            Business Clarity Roadmap
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink">{data.businessName}</h1>
          <p className="text-sm text-fog">
            Prepared for {data.ownerName}
            {data.town ? ` · ${data.town}` : ""} · {data.date}
          </p>
        </div>
        <div className="text-right text-xs text-fog">
          {data.preparedBy && <p>Prepared by {data.preparedBy}</p>}
          <p>{brand.contact.email}</p>
          <p>{brand.contact.phone}</p>
        </div>
      </header>

      {/* Snapshot */}
      <Section title="Current business snapshot">
        <p className="leading-7 text-ink/85">{data.snapshot}</p>
      </Section>

      {/* Top issues */}
      <Section title="Top three operating issues">
        <ol className="space-y-2">
          {data.topIssues.map((issue, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-harbor text-xs font-bold text-paper">
                {i + 1}
              </span>
              <span className="leading-7 text-ink/85">{issue}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Two-column: immediate wins + impact */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Section title="Immediate wins">
          <BulletList items={data.immediateWins} accent="sea" />
        </Section>
        <Section title="Where this should help">
          <BulletList items={data.impactAreas} accent="wood" />
        </Section>
      </div>

      {/* 30 / 90 */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Section title="First 30 days">
          <BulletList items={data.priorities30} accent="harbor" numbered />
        </Section>
        <Section title="Next 90 days">
          <BulletList items={data.priorities90} accent="harbor" numbered />
        </Section>
      </div>

      {/* Systems */}
      <Section title="Recommended systems & workflow improvements">
        <BulletList items={data.systemRecs} accent="sea" />
      </Section>

      {/* Engagement */}
      <Section title="Recommended way to work together">
        <p className="leading-7 text-ink/85">{data.engagement}</p>
      </Section>

      <footer className="mt-8 border-t border-line pt-4 text-xs leading-5 text-fog">
        This roadmap is a practical starting point based on our conversation and the
        details you shared. Impact is described in terms of time, clarity, and control —
        not specific financial promises. It&rsquo;s yours to keep and act on at your own pace.
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-fog">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function BulletList({
  items,
  accent,
  numbered,
}: {
  items: string[];
  accent: "sea" | "wood" | "harbor";
  numbered?: boolean;
}) {
  const color = { sea: "text-sea", wood: "text-wood", harbor: "text-harbor" }[accent];
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink/85">
          <span className={`mt-0.5 shrink-0 font-semibold ${color}`}>
            {numbered ? `${i + 1}.` : "›"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
