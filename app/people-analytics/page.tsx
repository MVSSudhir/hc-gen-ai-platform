import type { Metadata } from "next";
import { PageHeader } from "@/components/content/page-header";
import { PaExplorer, type PaSummary } from "@/components/filters/pa-explorer";
import { itemPath, paItems } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { verticalMeta } from "@/lib/site";

const meta = verticalMeta["people-analytics"];

export const metadata: Metadata = pageMetadata({
  title: "People Analytics — Analytics Reference",
  description: meta.description,
  path: meta.path,
});

export default function PaIndexPage() {
  const items: PaSummary[] = paItems()
    .sort((a, b) => a.meta.title.localeCompare(b.meta.title))
    .map(({ meta: item }) => ({
      slug: item.slug,
      url: itemPath(item),
      title: item.title,
      description: item.description,
      contentType: item.contentType,
      domain: "domain" in item ? item.domain : undefined,
      analyticalTypes: item.analyticalTypes ?? [],
      businessQuestion:
        item.contentType === "metric" ? item.businessQuestion : undefined,
      demo: item.demo,
    }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <PageHeader
        kicker={meta.kicker}
        title="People Analytics"
        description={`${meta.description} ${items.length} reference items spanning metrics, analytical methods, dashboard patterns and practical use cases.`}
      />
      <PaExplorer items={items} />
    </div>
  );
}
