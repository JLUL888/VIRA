import Link from "next/link";
import { brand } from "@/lib/brand";

/** Reusable closing CTA band used across marketing pages. */
export function CTASection({
  heading = "Start with a free Business Clarity Session",
  body = brand.primaryOffer.deliverable,
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="container-page py-20">
      <div className="paper-wash relative overflow-hidden rounded-2xl border border-harbor-700 bg-harbor px-6 py-14 text-center text-paper sm:px-12">
        <p className="eyebrow text-wood-soft">No cost · No obligation</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-paper/80">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/clarity-session" className="btn-wood px-7 py-3.5 text-base">
            Book your session
          </Link>
          <Link href="/services" className="btn-light px-7 py-3.5 text-base">
            See how we help
          </Link>
        </div>
        <p className="mt-6 text-sm text-paper/55">
          One hour. You leave with a one-page roadmap, whether or not we ever work together.
        </p>
      </div>
    </section>
  );
}
