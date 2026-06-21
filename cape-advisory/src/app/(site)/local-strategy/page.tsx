import type { Metadata } from "next";
import {
  localChannels,
  referralPartners,
  playbook,
  positioningNotes,
} from "@/content/outreach";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "On the Cape",
  description:
    "How this advisory practice is built specifically for Cape Cod — the markets, the businesses, the partners, and a no-pressure outreach approach.",
};

export default function LocalStrategyPage() {
  return (
    <>
      <section className="paper-wash border-b border-line">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow">On the Cape</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-ink sm:text-5xl">
            Built for the Cape, not parachuted in.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            This practice is designed around the actual businesses of Cape Cod — where
            they sell, how they grow, and who they trust. Here&rsquo;s the strategy and the
            outreach approach, shared openly. (Owners are welcome to read it; it&rsquo;s the
            same plain, no-pressure approach you&rsquo;d get from us in person.)
          </p>
        </div>
      </section>

      {/* Niche + archetype */}
      <section className="container-page py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <Note label="The niche" text={positioningNotes.niche} />
          <Note label="The archetype" text={positioningNotes.archetype} />
          <Note label="The bridge" text={positioningNotes.bridge} />
        </div>
      </section>

      {/* Where the businesses are */}
      <section className="border-y border-line bg-paper-deep">
        <div className="container-page py-16">
          <h2 className="text-2xl font-semibold text-ink">Where the businesses are</h2>
          <p className="mt-2 max-w-2xl text-fog">
            The places and business types this practice is built to serve — and how we
            show up in each.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {localChannels.map((c) => (
              <div key={c.name} className="card bg-white/70 p-6">
                <h3 className="text-base font-semibold text-ink">{c.name}</h3>
                <p className="mt-1 text-sm text-fog">{c.who}</p>
                <p className="mt-3 border-l-2 border-wood/50 pl-3 text-sm leading-6 text-ink/80">
                  {c.approach}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The playbook */}
      <section className="container-page py-16">
        <p className="eyebrow">The outreach playbook</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl">
          Useful first. Never aggressive.
        </h2>
        <p className="mt-4 max-w-2xl text-ink/75">
          The whole approach is to be a familiar, genuinely helpful presence — and let
          the work earn the relationship.
        </p>
        <div className="mt-10 space-y-4">
          {playbook.map((step, i) => (
            <div key={step.title} className="card flex gap-5 bg-white/70 p-6">
              <span className="font-display text-3xl text-wood">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 leading-7 text-ink/80">{step.detail}</p>
                <p className="mt-2 text-sm italic text-fog">{step.tactic}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Referral partners */}
      <section className="border-t border-line bg-ink text-paper">
        <div className="container-page py-16">
          <p className="eyebrow text-wood-soft">The referral bench</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Local professionals who already have the trust.
          </h2>
          <p className="mt-4 max-w-2xl text-paper/75">
            The fastest, least-aggressive growth is through people owners already rely on.
            We send them business; they send it back.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
            {referralPartners.map((p) => (
              <div key={p.name} className="bg-ink p-6">
                <h3 className="font-semibold text-paper">{p.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-paper/70">{p.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Note({ label, text }: { label: string; text: string }) {
  return (
    <div className="card bg-white/70 p-6">
      <p className="text-sm font-semibold text-harbor">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink/80">{text}</p>
    </div>
  );
}
