import type { Metadata } from "next";
import { IntakeForm } from "@/components/IntakeForm";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Book a Business Clarity Session",
  description:
    "Request your free one-hour Business Clarity Session. Tell us a bit about your business and you'll leave with a one-page operating roadmap.",
};

const expect = [
  "A relaxed, one-hour conversation — in person on the Cape or by video.",
  "No sales pitch. The goal is to find your biggest bottleneck, not to sign you up.",
  "A one-page operating roadmap afterward: what to fix first, what can wait.",
  "It's yours to keep, whether or not we ever work together.",
];

export default function ClaritySessionPage() {
  return (
    <section className="paper-wash">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          {/* Left rail */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">Free · No obligation</p>
            <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Book your Business Clarity Session
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink/80">
              {brand.primaryOffer.deliverable}
            </p>
            <ul className="mt-7 space-y-3">
              {expect.map((e) => (
                <li key={e} className="flex gap-3 text-sm leading-6 text-ink/85">
                  <span aria-hidden className="mt-0.5 text-sea">✓</span>
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-line bg-white/70 p-5 text-sm leading-6 text-fog">
              The more you share, the more useful the first hour is — but answer only what
              you can. We&rsquo;ll fill in the rest together.
            </div>
          </aside>

          {/* Form */}
          <div>
            <IntakeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
