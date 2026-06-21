import { brand } from "@/lib/brand";

/**
 * Brand mark — an abstract "Cape Cod light over a horizon": a thin ring with a
 * horizon line and a low sun. Deliberately geometric and calm — no anchors,
 * whales, or lobsters. Reads as clarity / a lens / first light.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label={`${brand.name} mark`}
      fill="none"
    >
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      {/* horizon */}
      <line x1="7" y1="23" x2="33" y2="23" stroke="currentColor" strokeWidth="1.5" />
      {/* low sun / first light */}
      <circle cx="20" cy="23" r="6.5" className="text-wood" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="9" x2="20" y2="16.5" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
    </svg>
  );
}

export function Logo({
  className = "",
  subdued = false,
}: {
  className?: string;
  subdued?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={`h-8 w-8 ${subdued ? "text-paper" : "text-harbor"}`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-semibold tracking-tight ${
            subdued ? "text-paper" : "text-ink"
          }`}
        >
          {brand.name}
        </span>
        <span
          className={`text-[0.62rem] font-medium uppercase tracking-[0.2em] ${
            subdued ? "text-paper/70" : "text-fog"
          }`}
        >
          Advisory
        </span>
      </span>
    </span>
  );
}
