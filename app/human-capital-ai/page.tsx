import type { Metadata } from "next";
import { PageHeader } from "@/components/content/page-header";
import {
  HcaiExplorer,
  type HcaiSummary,
} from "@/components/filters/hcai-explorer";
import { hcaiUseCases, itemPath } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { verticalMeta } from "@/lib/site";

const meta = verticalMeta["human-capital-ai"];

export const metadata: Metadata = pageMetadata({
  title: "Human Capital AI — AI Initiative Reference",
  description: meta.description,
  path: meta.path,
});

export default function HcaiIndexPage() {
  const items: HcaiSummary[] = hcaiUseCases()
    .sort((a, b) => a.meta.title.localeCompare(b.meta.title))
    .map(({ meta: useCase }) => ({
      slug: useCase.slug,
      url: itemPath(useCase),
      title: useCase.title,
      description: useCase.description,
      category: useCase.category,
      technologyPatterns: useCase.technologyPatterns,
      implementationStage: useCase.implementationStage,
      evidenceStrength: useCase.evidenceStrength,
      impactType: useCase.impactType,
      organizations: useCase.organizations,
      demo: useCase.demo,
    }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <PageHeader
        kicker={meta.kicker}
        title="Human Capital AI"
        description={`${meta.description} Browse ${items.length} practical initiative patterns across talent, learning, performance, employee experience and workforce planning. Filter by function, AI pattern, stage and evidence.`}
      />
      <HcaiExplorer items={items} />
    </div>
  );
}
