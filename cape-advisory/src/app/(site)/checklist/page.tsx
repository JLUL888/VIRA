import type { Metadata } from "next";
import Link from "next/link";
import { checklistSections, checklistMeta } from "@/content/checklist";
import { brand } from "@/lib/brand";
import { LogoMark } from "@/components/Logo";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: checklistMeta.title,
  description: checklistMeta.subtitle,
};

export default function ChecklistPage() {
  return (
    <div className="container-narrow py-12 md:py-16">
      <div className="no-print mb-8 flex items-center justify-between gap-4">
        <Link href="/resources" className="text-sm font-medium text-harbor hover:underline">
          ← Resources
        </Link>
        <PrintButton />
      </div>

      <div className="print-clean card overflow-hidden bg-white">
        {/* Header */}
        <div className="border-b border-line bg-paper-deep px-7 py-8 sm:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9 text-harbor" />
              <span className="font-display text-lg font-semibold text-ink">{brand.fullName}</span>
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-fog">Operating checklist</span>
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-ink">{checklistMeta.title}</h1>
          <p className="mt-2 text-fog">{checklistMeta.subtitle}</p>
          <p className="mt-4 rounded-xl border border-line bg-white/70 p-4 text-sm leading-6 text-ink/80">
            {checklistMeta.scoring}
          </p>
        </div>

        {/* Sections */}
        <div className="divide-y divide-line px-7 py-2 sm:px-10">
          {checklistSections.map((section, idx) => (
            <section key={section.id} id={section.id} className="py-7">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-xl text-wood">{String(idx + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
                  <p className="text-sm text-fog">{section.intro}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 inline-block h-5 w-5 shrink-0 rounded border-2 border-harbor/50"
                    />
                    <span className="text-[0.98rem] leading-6 text-ink/85">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer / CTA */}
        <div className="border-t border-line bg-harbor px-7 py-8 text-paper sm:px-10">
          <h2 className="text-xl font-semibold">Checked fewer than half in an area?</h2>
          <p className="mt-2 text-paper/80">
            That&rsquo;s your starting point — and exactly what a free Business Clarity
            Session is for. One hour, no cost, and you leave with a one-page roadmap.
          </p>
          <div className="no-print mt-5">
            <Link href="/clarity-session" className="btn-wood">
              Book a Clarity Session
            </Link>
          </div>
          <p className="mt-5 text-sm text-paper/60">
            {brand.contact.email} · {brand.contact.phone} · {brand.contact.region}
          </p>
        </div>
      </div>
    </div>
  );
}
