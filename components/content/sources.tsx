import { ExternalLink } from "@/components/ui/external-link";
import type { Source } from "@/lib/validation";

export function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;

  return (
    <section className="grid gap-2 border-t border-border py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <h2 className="eyebrow pt-1 text-muted">Sources</h2>
      <ul className="max-w-2xl space-y-2 text-[15px]">
        {sources.map((source) => (
          <li key={source.id}>
            <ExternalLink
              href={source.url}
              className="text-accent underline decoration-border-strong underline-offset-3 hover:decoration-accent"
            >
              {source.title}
            </ExternalLink>
            <span className="text-muted">
              {" "}
              — {source.publisher}
              {source.publishedDate ? `, ${source.publishedDate}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
