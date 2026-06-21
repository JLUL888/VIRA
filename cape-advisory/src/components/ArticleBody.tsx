import type { Block } from "@/content/articles";

/** Renders an article's structured content blocks. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-body space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="!mt-10 text-2xl font-semibold text-ink">
                {b.text}
              </h2>
            );
          case "p":
            return <p key={i}>{b.text}</p>;
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[1.05rem] leading-7 text-ink/85">
                    <span aria-hidden className="mt-0.5 text-sea">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-wood bg-wood-50/60 px-5 py-4 text-[1.05rem] font-medium italic leading-7 text-ink/90"
              >
                {b.text}
              </blockquote>
            );
          case "numbers":
            return (
              <ol key={i} className="grid gap-3 sm:grid-cols-3">
                {b.items.map((item, j) => (
                  <li key={j} className="rounded-xl border border-line bg-white/70 p-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-wood">
                      {item.label}
                    </span>
                    <p className="mt-1 text-sm leading-6 text-ink/85">{item.text}</p>
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
