import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FieldSection } from "@/components/content/field-section";
import { Markdown } from "@/components/content/markdown";
import { PageHeader } from "@/components/content/page-header";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { RelatedContent } from "@/components/related/related-content";
import { Badge } from "@/components/ui/badge";
import { DemoNotice } from "@/components/ui/demo-notice";
import { getItem, paItems } from "@/lib/content";
import { referencedBy, relatedGroups } from "@/lib/relationships";
import { articleJsonLd, breadcrumbJsonLd, contentMetadata } from "@/lib/seo";
import { labelize } from "@/lib/taxonomy";
import type {
  PaDashboard,
  PaItem,
  PaMethod,
  PaMetric,
  PaUseCase,
} from "@/lib/validation";

export const dynamicParams = false;

export function generateStaticParams() {
  return paItems().map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/people-analytics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem("people-analytics", slug);
  if (!item) return {};
  return contentMetadata(item.meta);
}

function MetricSections({ metric }: { metric: PaMetric }) {
  return (
    <>
      <FieldSection label="Definition" text={metric.definition} />
      <FieldSection label="How to calculate it" text={metric.formula} />
      <FieldSection
        label="Business question"
        text={metric.businessQuestion}
      />
      <FieldSection label="How to read it" text={metric.interpretation} />
      <FieldSection
        label="Recommended segments"
        items={metric.recommendedSegments}
      />
      <FieldSection
        label="How to visualize it"
        items={metric.visualization}
      />
      <FieldSection
        label="Decisions it supports"
        text={metric.businessDecisions}
      />
      <FieldSection
        label="What can make it misleading"
        text={metric.commonPitfalls}
      />
    </>
  );
}

function MethodSections({ method }: { method: PaMethod }) {
  return (
    <>
      <FieldSection label="Purpose" text={method.purpose} />
      <FieldSection
        label="Business questions"
        items={method.businessQuestions}
      />
      <FieldSection label="Data required" items={method.dataRequired} />
      <FieldSection label="The method" text={method.method} />
      <FieldSection
        label="Example application"
        text={method.exampleApplication}
      />
      <FieldSection label="How to interpret it" text={method.interpretation} />
      <FieldSection label="Limitations" text={method.limitations} />
    </>
  );
}

function DashboardSections({ dashboard }: { dashboard: PaDashboard }) {
  return (
    <>
      <FieldSection label="Purpose" text={dashboard.purpose} />
      <FieldSection label="Audience" items={dashboard.audience} />
      <FieldSection
        label="Business questions it answers"
        items={dashboard.businessQuestions}
      />
      <FieldSection
        label="Recommended visuals"
        items={dashboard.recommendedVisuals}
      />
      <FieldSection
        label="Recommended filters"
        items={dashboard.recommendedFilters}
      />
      <FieldSection
        label="Design principles"
        text={dashboard.designPrinciples}
      />
    </>
  );
}

function UseCaseSections({ useCase }: { useCase: PaUseCase }) {
  return (
    <>
      <FieldSection
        label="Business question"
        text={useCase.businessQuestion}
      />
      <FieldSection label="Approach" text={useCase.approach} />
      <FieldSection label="Data required" items={useCase.dataRequired} />
    </>
  );
}

export default async function PaDetailPage({
  params,
}: PageProps<"/people-analytics/[slug]">) {
  const { slug } = await params;
  const item = getItem("people-analytics", slug);
  if (!item || item.meta.vertical !== "people-analytics") notFound();
  const paItem = item.meta as PaItem;

  const kicker =
    paItem.contentType === "analytical-method"
      ? "Analytical Method"
      : paItem.contentType === "dashboard-pattern"
        ? "Dashboard Pattern"
        : labelize(paItem.contentType);

  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd(paItem),
            breadcrumbJsonLd(paItem),
          ]),
        }}
      />
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "People Analytics", href: "/people-analytics" },
          { label: paItem.title },
        ]}
      />
      {paItem.demo && <DemoNotice />}
      <PageHeader
        kicker={kicker}
        title={paItem.title}
        description={paItem.description}
        meta={
          <>
            {"domain" in paItem && paItem.domain && (
              <Badge value={paItem.domain} kind="type" />
            )}
            {paItem.analyticalTypes?.map((type) => (
              <Badge key={type} value={type} kind="type" />
            ))}
          </>
        }
      />

      {paItem.contentType === "metric" && <MetricSections metric={paItem} />}
      {paItem.contentType === "analytical-method" && (
        <MethodSections method={paItem} />
      )}
      {paItem.contentType === "dashboard-pattern" && (
        <DashboardSections dashboard={paItem} />
      )}
      {(paItem.contentType === "use-case" ||
        paItem.contentType === "case-study") && (
        <UseCaseSections useCase={paItem} />
      )}

      {item.body && (
        <div className="border-t border-border pt-8">
          <Markdown source={item.body} />
        </div>
      )}

      <p className="mt-0 border-t border-border pt-6 text-xs text-faint">Updated {paItem.updatedAt}</p>

      <RelatedContent
        groups={relatedGroups(paItem)}
        usedBy={referencedBy(paItem)}
      />
    </article>
  );
}
