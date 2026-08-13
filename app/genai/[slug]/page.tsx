import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/content/markdown";
import { FieldSection } from "@/components/content/field-section";
import { PageHeader } from "@/components/content/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { RelatedContent } from "@/components/related/related-content";
import { DemoNotice } from "@/components/ui/demo-notice";
import { genaiConcepts, getItem, itemPath } from "@/lib/content";
import { genaiLearningStages } from "@/lib/learning-path";
import { referencedBy, relatedGroups } from "@/lib/relationships";
import { articleJsonLd, breadcrumbJsonLd, contentMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return genaiConcepts().map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/genai/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem("genai", slug);
  if (!item) return {};
  return contentMetadata(item.meta);
}

export default async function GenaiConceptPage({
  params,
}: PageProps<"/genai/[slug]">) {
  const { slug } = await params;
  const item = getItem("genai", slug);
  if (!item || item.meta.contentType !== "concept") notFound();
  const concept = item.meta;

  const ordered = genaiConcepts().sort(
    (a, b) =>
      (a.meta.learningOrder ?? 999) - (b.meta.learningOrder ?? 999) ||
      a.meta.title.localeCompare(b.meta.title),
  );
  const index = ordered.findIndex((c) => c.meta.slug === concept.slug);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined;

  const stage = genaiLearningStages.find((s) =>
    concept.tags.some((tag) => (s.topics as readonly string[]).includes(tag)),
  );

  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd(concept),
            breadcrumbJsonLd(concept),
          ]),
        }}
      />
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "GenAI", href: "/genai" },
          { label: concept.title },
        ]}
      />
      {concept.demo && <DemoNotice />}
      <PageHeader
        kicker={
          stage
            ? `Learning path · ${stage.title}${concept.learningOrder ? ` · ${String(concept.learningOrder).padStart(2, "0")}` : ""}`
            : "GenAI Concept"
        }
        title={concept.title}
        description={concept.shortDefinition.trim()}
        definition
      />

      <FieldSection label="Why it matters" items={concept.whyItMatters} />
      <FieldSection label="Key ideas" items={concept.keyIdeas} />

      {item.body && (
        <div className="border-t border-border pt-8">
          <Markdown source={item.body} />
        </div>
      )}

      <nav
        aria-label="Learning path"
        className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={itemPath(prev.meta)}
            className="panel group p-5 transition-all hover:shadow-lift"
          >
            <p className="eyebrow text-muted">Previous</p>
            <p className="mt-2 font-medium transition-colors group-hover:text-accent">
              ← {prev.meta.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={itemPath(next.meta)}
            className="panel group p-5 text-right transition-all hover:shadow-lift sm:justify-self-end sm:text-left"
          >
            <p className="eyebrow text-muted">Next</p>
            <p className="mt-2 font-medium transition-colors group-hover:text-accent">
              {next.meta.title} →
            </p>
          </Link>
        ) : null}
      </nav>

      <p className="mt-8 text-xs text-faint">
        Updated {concept.updatedAt}
        {" · "}
        <Link href="/genai" className="text-accent hover:text-accent-hover">
          Full learning path
        </Link>
      </p>

      <RelatedContent
        groups={relatedGroups(concept)}
        usedBy={referencedBy(concept)}
      />
    </article>
  );
}
