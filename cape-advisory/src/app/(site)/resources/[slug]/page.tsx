import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/articles";
import { ArticleBody } from "@/components/ArticleBody";
import { CTASection } from "@/components/CTASection";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article not found" };
  return { title: a.title, description: a.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="container-narrow py-14 md:py-20">
        <Link href="/resources" className="text-sm font-medium text-harbor hover:underline">
          ← All resources
        </Link>

        <div className="mt-6 flex items-center gap-2">
          <span className="rounded-full bg-harbor-50 px-2.5 py-1 text-xs font-medium text-harbor">
            {article.category}
          </span>
          <span className="text-xs text-fog">{article.readMinutes} min read</span>
          {article.status === "outline" && (
            <span className="rounded-full bg-paper-deep px-2.5 py-1 text-xs italic text-fog">
              Draft outline
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-fog">{article.dek}</p>

        <hr className="my-8 border-line" />

        <ArticleBody blocks={article.body} />

        <div className="mt-12 rounded-2xl border border-harbor/30 bg-harbor-50/50 p-6">
          <p className="text-sm font-semibold text-harbor">Want this looked at for your business?</p>
          <p className="mt-1 text-ink/80">
            A free Business Clarity Session turns this from an article into a roadmap for
            your specific situation.
          </p>
          <Link href="/clarity-session" className="btn-primary mt-4">
            Book a Clarity Session
          </Link>
        </div>
      </article>

      <section className="border-t border-line bg-paper-deep">
        <div className="container-page py-14">
          <h2 className="text-xl font-semibold text-ink">Keep reading</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {more.map((a) => (
              <Link key={a.slug} href={`/resources/${a.slug}`} className="card bg-white/70 p-6 transition hover:shadow-lift">
                <span className="text-xs font-medium text-wood">{a.category}</span>
                <h3 className="mt-2 font-semibold leading-snug text-ink">{a.title}</h3>
                <p className="mt-2 text-sm text-fog">{a.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
