import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FieldSection } from "@/components/content/field-section";
import { Markdown } from "@/components/content/markdown";
import { PageHeader } from "@/components/content/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { RelatedContent } from "@/components/related/related-content";
import { DemoNotice } from "@/components/ui/demo-notice";
import { getItem, workProjects } from "@/lib/content";
import { relatedGroups } from "@/lib/relationships";
import { JsonLd } from "@/components/seo/json-ld";
import { formatDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, contentMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return workProjects().map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem("work", slug);
  if (!item) return {};
  return contentMetadata(item.meta);
}

export default async function WorkProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getItem("work", slug);
  if (!item || item.meta.contentType !== "project") notFound();
  const project = item.meta;

  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <JsonLd data={[articleJsonLd(project), breadcrumbJsonLd(project)]} />
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: project.title },
        ]}
      />
      {project.demo && <DemoNotice />}
      <PageHeader
        kicker="Project"
        title={project.title}
        description={project.description}
      />

      <FieldSection label="Problem" text={project.problem} />
      <FieldSection label="Approach" text={project.approach} />
      <FieldSection label="What I built" text={project.whatIBuilt} />
      <FieldSection label="Technology" items={project.technology} />
      <FieldSection label="Outcome" text={project.outcome} />
      <FieldSection label="What I learned" text={project.whatILearned} />

      {item.body && (
        <div className="border-t border-border pt-8">
          <Markdown source={item.body} />
        </div>
      )}

      <p className="mt-0 border-t border-border pt-6 text-xs text-faint">
        Updated {formatDate(project.updatedAt)}
      </p>

      <RelatedContent groups={relatedGroups(project)} />
    </article>
  );
}
