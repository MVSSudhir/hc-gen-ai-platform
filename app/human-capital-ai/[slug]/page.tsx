import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FieldSection } from "@/components/content/field-section";
import { Markdown } from "@/components/content/markdown";
import { PageHeader } from "@/components/content/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { RelatedContent } from "@/components/related/related-content";
import { Badge } from "@/components/ui/badge";
import { DemoNotice } from "@/components/ui/demo-notice";
import { getItem, hcaiUseCases } from "@/lib/content";
import { referencedBy, relatedGroups } from "@/lib/relationships";
import { Sources } from "@/components/content/sources";
import { JsonLd } from "@/components/seo/json-ld";
import { formatDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, contentMetadata } from "@/lib/seo";
import { labelize } from "@/lib/taxonomy";

export const dynamicParams = false;

export function generateStaticParams() {
  return hcaiUseCases().map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/human-capital-ai/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem("human-capital-ai", slug);
  if (!item) return {};
  return contentMetadata(item.meta);
}

export default async function HcaiUseCasePage({
  params,
}: PageProps<"/human-capital-ai/[slug]">) {
  const { slug } = await params;
  const item = getItem("human-capital-ai", slug);
  if (!item || item.meta.vertical !== "human-capital-ai") notFound();
  const useCase = item.meta;

  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <JsonLd data={[articleJsonLd(useCase), breadcrumbJsonLd(useCase)]} />
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Human Capital AI", href: "/human-capital-ai" },
          { label: useCase.title },
        ]}
      />
      {useCase.demo && <DemoNotice />}
      <PageHeader
        kicker={labelize(useCase.category)}
        title={useCase.title}
        description={useCase.description}
        meta={
          <>
            <Badge value={useCase.implementationStage} kind="stage" />
            <Badge value={useCase.evidenceStrength} kind="evidence" />
          </>
        }
      />

      <FieldSection label="The problem" text={useCase.problem} />
      <FieldSection label="The opportunity" text={useCase.opportunity} />
      <FieldSection label="What the solution does" text={useCase.solution} />
      <FieldSection label="How it works" text={useCase.howItWorks} />
      <FieldSection label="Who uses it" items={useCase.users} />
      <FieldSection label="Data required" items={useCase.dataRequired} />
      <FieldSection
        label="AI / technology patterns"
        items={useCase.technologyPatterns.map(labelize)}
      />

      {useCase.organizations.length > 0 && (
        <FieldSection
          label="Organizations doing it"
          items={useCase.organizations}
        />
      )}

      {useCase.reportedImpact ? (
        <FieldSection label="Reported impact" text={useCase.reportedImpact} />
      ) : (
        <FieldSection
          label="Reported impact"
          text="No independently reported impact recorded for this item yet."
        />
      )}
      {useCase.impactType.length > 0 && (
        <FieldSection
          label="Impact categories"
          items={useCase.impactType.map(labelize)}
        />
      )}

      <FieldSection label="Limitations and risks" text={useCase.risks} />
      <FieldSection
        label="What implementation requires"
        text={useCase.implementationConsiderations}
      />

      {item.body && (
        <div className="border-t border-border pt-8">
          <Markdown source={item.body} />
        </div>
      )}

      <Sources sources={useCase.sources} />

      <p className="mt-0 border-t border-border pt-6 text-xs text-faint">
        Updated {formatDate(useCase.updatedAt)}
        {useCase.lastVerified
          ? ` · Last verified ${formatDate(useCase.lastVerified)}`
          : ""}
      </p>

      <RelatedContent
        groups={relatedGroups(useCase)}
        usedBy={referencedBy(useCase)}
      />
    </article>
  );
}
