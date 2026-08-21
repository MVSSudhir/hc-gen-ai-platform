import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/content/page-header";
import { genaiConcepts, itemPath } from "@/lib/content";
import { genaiLearningStages } from "@/lib/learning-path";
import { pageMetadata } from "@/lib/seo";
import { verticalMeta } from "@/lib/site";

const meta = verticalMeta.genai;

export const metadata: Metadata = pageMetadata({
  title: "Generative AI — Learning Path",
  description: meta.description,
  path: meta.path,
});

export default function GenaiIndexPage() {
  const concepts = genaiConcepts().sort(
    (a, b) =>
      (a.meta.learningOrder ?? 999) - (b.meta.learningOrder ?? 999) ||
      a.meta.title.localeCompare(b.meta.title),
  );

  const stages = genaiLearningStages
    .map((stage) => {
      const topicSet = new Set<string>(stage.topics);
      const items = concepts.filter(({ meta: c }) =>
        c.tags.some((tag) => topicSet.has(tag)),
      );
      return { ...stage, items };
    })
    .filter((stage) => stage.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14">
      <PageHeader
        kicker={meta.kicker}
        title="Generative AI"
        description={`${meta.description} ${concepts.length} concepts across ${stages.length} learning stages — follow the path in order, or jump to what you need. Each concept lists top resources with what they cover.`}
      />

      <nav
        aria-label="Learning stages"
        className="panel scroll-rail mb-10 px-4 py-3 sm:px-5 sm:py-4"
      >
        <ol className="flex snap-x snap-mandatory gap-2 sm:flex-wrap sm:snap-none">
          {stages.map((stage, index) => (
            <li key={stage.id} className="shrink-0 snap-start sm:shrink">
              <a
                href={`#${stage.id}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-[13px] text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <span className="font-serif text-xs italic text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {stage.title}
                <span className="text-faint">{stage.items.length}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-14">
        {stages.map((stage, stageIndex) => (
          <section key={stage.id} id={stage.id} className="scroll-mt-24">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-accent">
                  Stage {String(stageIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight">
                  {stage.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {stage.description}
                </p>
              </div>
              <p className="text-sm text-faint">
                {stage.items.length} concepts
              </p>
            </div>

            <ol className="panel overflow-hidden">
              {stage.items.map(({ meta: concept }, index) => (
                <li
                  key={concept.slug}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-3 border-b border-border px-4 py-5 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:gap-4 sm:px-6"
                >
                  <span className="font-serif text-sm italic text-faint tabular-nums">
                    {String(concept.learningOrder ?? index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">
                      <Link
                        href={itemPath(concept)}
                        className="transition-colors group-hover:text-accent"
                      >
                        {concept.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
                      {concept.shortDefinition.trim()}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent sm:block"
                  >
                    →
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
