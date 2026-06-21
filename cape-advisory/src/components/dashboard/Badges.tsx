import { labelFor, LEAD_STATUSES } from "@/lib/options";

export function TierBadge({ tier }: { tier: "A" | "B" | "C" }) {
  const map = {
    A: "bg-sea text-white",
    B: "bg-harbor-50 text-harbor border border-harbor/30",
    C: "bg-paper-deep text-fog border border-line",
  } as const;
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${map[tier]}`}>
      {tier}
    </span>
  );
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-harbor-50 text-harbor border-harbor/30",
  contacted: "bg-wood-50 text-wood border-wood/30",
  scheduled: "bg-sea/15 text-sea border-sea/30",
  roadmap_sent: "bg-sand text-ink/80 border-line",
  client: "bg-sea text-white border-sea",
  archived: "bg-paper-deep text-fog border-line",
};

export function StatusPill({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-paper-deep text-fog border-line";
  return (
    <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-medium ${style}`}>
      {labelFor(LEAD_STATUSES, status)}
    </span>
  );
}

export function MeterBar({ value }: { value: number }) {
  const color = value >= 70 ? "bg-sea" : value >= 45 ? "bg-harbor" : "bg-wood";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-paper-deep">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}
