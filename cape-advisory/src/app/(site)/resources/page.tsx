import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/articles";
import {
  linkedinTemplates,
  instagramCarousels,
  newsletterIdeas,
  workshopTopics,
  blogTemplate,
  downloadableChecklists,
} from "@/content/contentStrategy";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Plain-language articles, checklists, and templates on pricing, cash flow, bookkeeping, and systems for Cape Cod small businesses.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="paper-wash border-b border-line">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow">Resources</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-ink sm:text-5xl">
            Useful first. Always.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            Short, specific writing on the things that actually trip up local
            businesses — pricing, cash, books, and systems. No fluff, no jargon, no
            gated PDFs that turn out to be a sales pitch.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="container-page py-14">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-ink">Cape Cod Small Business Fixes</h2>
          <span className="text-sm text-fog">{articles.length} articles</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/resources/${a.slug}`}
              className="card group flex flex-col bg-white/70 p-6 transition hover:shadow-lift"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-harbor-50 px-2.5 py-1 text-xs font-medium text-harbor">
                  {a.category}
                </span>
                <span className="text-xs text-fog">{a.readMinutes} min</span>
                {a.status === "outline" && (
                  <span className="text-xs italic text-fog/70">· outline</span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-ink group-hover:text-harbor">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-fog">{a.dek}</p>
              <span className="mt-4 text-sm font-medium text-harbor">Read →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Downloadables */}
      <section className="border-y border-line bg-paper-deep">
        <div className="container-page py-14">
          <h2 className="text-2xl font-semibold text-ink">Downloadable checklists</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {downloadableChecklists.map((c) => (
              <Link key={c.title} href={c.href} className="card flex items-center justify-between gap-4 bg-white/80 p-6 transition hover:shadow-lift">
                <div>
                  <h3 className="font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1 text-sm text-fog">{c.description}</p>
                </div>
                <span className="shrink-0 text-2xl text-wood" aria-hidden>↓</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content engine — the working toolkit */}
      <section className="container-page py-16">
        <p className="eyebrow">The content engine</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl">
          How this practice stays visible without being salesy.
        </h2>
        <p className="mt-4 max-w-2xl text-ink/75">
          A transparent look at the marketing system — the same plain, useful approach,
          turned into a steady drip of local content. Templates included so it&rsquo;s
          repeatable.
        </p>

        {/* Blog template */}
        <div className="mt-10 card bg-white/70 p-7">
          <h3 className="text-lg font-semibold text-ink">{blogTemplate.title}</h3>
          <ol className="mt-4 space-y-2">
            {blogTemplate.structure.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-6 text-ink/85">
                <span className="font-semibold text-wood">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* LinkedIn + IG */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card bg-white/70 p-7">
            <h3 className="text-lg font-semibold text-ink">LinkedIn post templates</h3>
            <div className="mt-4 space-y-4">
              {linkedinTemplates.map((t) => (
                <details key={t.title} className="rounded-xl border border-line bg-paper p-4">
                  <summary className="cursor-pointer text-sm font-medium text-ink">{t.title}</summary>
                  <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-ink/80">{t.body}</pre>
                </details>
              ))}
            </div>
          </div>

          <div className="card bg-white/70 p-7">
            <h3 className="text-lg font-semibold text-ink">Instagram carousel concepts</h3>
            <div className="mt-4 space-y-4">
              {instagramCarousels.map((c) => (
                <details key={c.title} className="rounded-xl border border-line bg-paper p-4">
                  <summary className="cursor-pointer text-sm font-medium text-ink">{c.title}</summary>
                  <ol className="mt-3 space-y-1.5">
                    {c.slides.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-6 text-ink/80">
                        <span className="text-wood">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter + Workshops */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card bg-white/70 p-7">
            <h3 className="text-lg font-semibold text-ink">Email newsletter concepts</h3>
            <ul className="mt-4 space-y-3">
              {newsletterIdeas.map((n) => (
                <li key={n.title} className="border-l-2 border-wood/50 pl-3">
                  <p className="text-sm font-semibold text-ink">{n.title}</p>
                  <p className="text-sm text-fog">{n.angle}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="card bg-white/70 p-7">
            <h3 className="text-lg font-semibold text-ink">Workshop topics</h3>
            <ul className="mt-4 space-y-3">
              {workshopTopics.map((w) => (
                <li key={w.title} className="border-l-2 border-sea/50 pl-3">
                  <p className="text-sm font-semibold text-ink">{w.title}</p>
                  <p className="text-sm text-fog">{w.promise}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
