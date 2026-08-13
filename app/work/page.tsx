import type { Metadata } from "next";
import { ItemCard } from "@/components/cards/item-card";
import { PageHeader } from "@/components/content/page-header";
import { itemPath, workProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected projects and implementations across analytics, Generative AI and Human Capital.",
  path: "/work",
});

const areas = [
  "Generative AI",
  "Human Capital Analytics",
  "People Analytics",
  "Data Visualization",
  "AI-enabled workflows",
  "Workforce insights",
];

export default function WorkIndexPage() {
  const projects = workProjects().sort((a, b) =>
    b.meta.updatedAt.localeCompare(a.meta.updatedAt),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <PageHeader
        kicker="Selected Work"
        title="Work"
        description="What I work on, and selected projects that show the thinking behind this platform."
      />

      <section className="panel mb-8 p-7 sm:p-8">
        <h2 className="eyebrow text-muted">What I work on</h2>
        <ul className="mt-5 flex max-w-3xl flex-wrap gap-2.5">
          {areas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] font-medium text-muted"
            >
              {area}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 eyebrow text-muted">Selected projects</h2>
        <div className="panel overflow-hidden px-2 sm:px-3">
          {projects.map(({ meta }) => (
            <ItemCard
              key={meta.slug}
              href={itemPath(meta)}
              title={meta.title}
              description={meta.description}
              footer={
                meta.technology.length > 0 ? (
                  <span>{meta.technology.join(" · ")}</span>
                ) : undefined
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
