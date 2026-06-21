import type { Metadata } from "next";
import Link from "next/link";
import { services, serviceGroups, getService } from "@/content/services";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Modular, plain-English advisory services for Cape Cod owner-operators — from a free Business Clarity Session to fractional controller support.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="paper-wash border-b border-line">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow">Services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-ink sm:text-5xl">
            Pick the piece that hurts most. Start there.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            Everything here is modular and scoped in plain English. You don&rsquo;t buy a
            mysterious &ldquo;engagement&rdquo; — you fix a specific thing, with a tangible
            deliverable. Most owners start with the free Clarity Session and let the
            roadmap point the way.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink/75 transition hover:border-harbor hover:text-harbor"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page py-14">
        {serviceGroups.map((group) => (
          <section key={group.title} className="mb-14">
            <div className="mb-6 border-b border-line pb-4">
              <h2 className="text-2xl font-semibold text-ink">{group.title}</h2>
              <p className="mt-1 text-fog">{group.blurb}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {group.slugs.map((slug) => {
                const s = getService(slug);
                if (!s) return null;
                return <ServiceCard key={slug} service={s} />;
              })}
            </div>
          </section>
        ))}
      </div>

      <CTASection heading="Not sure which one you need? That's what the free session is for." />
    </>
  );
}

function ServiceCard({ service: s }: { service: ReturnType<typeof getService> }) {
  if (!s) return null;
  return (
    <article
      id={s.slug}
      className={`card scroll-mt-24 p-7 ${s.featured ? "border-harbor/40 bg-harbor-50/60" : "bg-white/70"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-ink">{s.name}</h3>
          <p className="mt-1 text-sm font-medium text-wood">{s.tagline}</p>
        </div>
        {s.featured && (
          <span className="shrink-0 rounded-full bg-harbor px-3 py-1 text-xs font-semibold text-paper">
            Start here · Free
          </span>
        )}
      </div>

      <dl className="mt-5 space-y-4 text-sm leading-6">
        <div>
          <dt className="font-semibold text-ink/60">The problem</dt>
          <dd className="mt-1 text-ink/85">{s.problem}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink/60">What you get</dt>
          <dd className="mt-1 text-ink/85">{s.outcome}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <p className="text-sm font-semibold text-ink/60">What&rsquo;s included</p>
        <ul className="mt-2 space-y-1.5">
          {s.includes.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-6 text-ink/85">
              <span aria-hidden className="mt-0.5 text-sea">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <span className="text-xs font-medium uppercase tracking-wide text-fog">{s.format}</span>
        <Link
          href="/clarity-session"
          className="text-sm font-medium text-harbor hover:underline"
        >
          {s.featured ? "Book the session →" : "Discuss this →"}
        </Link>
      </div>
    </article>
  );
}
