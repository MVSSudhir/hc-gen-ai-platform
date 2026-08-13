import type { Metadata } from "next";
import { PageHeader } from "@/components/content/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { ExternalLink } from "@/components/ui/external-link";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `About ${site.name} — ${site.tagline}.`,
  path: "/about",
});

const capabilities = [
  "People Analytics and workforce measurement",
  "Analytical problem solving and data visualization",
  "Generative AI patterns: RAG, embeddings, agents",
  "AI use-case identification in Human Capital",
  "Building AI-enabled analytical workflows",
];

const interests = [
  "Practical Generative AI in Human Capital",
  "Evidence-based AI adoption — what actually works",
  "Workforce metrics that support real decisions",
  "Knowledge architecture and structured content",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <JsonLd data={personJsonLd()} />
      <PageHeader
        kicker="About"
        title={site.name}
        description={site.tagline}
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="panel p-7 sm:p-9">
          <p className="definition max-w-none border-l-0 pl-0 text-[1.2rem] sm:text-[1.3rem]">
            I work at the intersection of Human Capital, analytics and
            Generative AI. This site is my working knowledge base: the GenAI
            concepts I learn, the AI initiatives organizations can explore in
            Human Capital, and the metrics and analytical approaches that make
            workforce decisions measurable.
          </p>
        </section>

        <section className="panel-ink relative overflow-hidden p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl"
          />
          <h2 className="eyebrow relative text-ink-muted">Contact</h2>
          <div className="relative mt-5 flex flex-col gap-3 text-[15px]">
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-ink-foreground transition-colors hover:text-white"
            >
              {site.email}
            </a>
            {site.linkedin && (
              <ExternalLink
                href={site.linkedin}
                className="text-ink-muted transition-colors hover:text-ink-foreground"
              >
                LinkedIn
              </ExternalLink>
            )}
            {site.github && (
              <ExternalLink
                href={site.github}
                className="text-ink-muted transition-colors hover:text-ink-foreground"
              >
                GitHub
              </ExternalLink>
            )}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section className="panel p-7 sm:p-8">
          <h2 className="eyebrow text-muted">Current areas of interest</h2>
          <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-relaxed">
            {interests.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[12px] h-px w-3.5 shrink-0 bg-accent/55"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel p-7 sm:p-8">
          <h2 className="eyebrow text-muted">Selected capabilities</h2>
          <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-relaxed">
            {capabilities.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[12px] h-px w-3.5 shrink-0 bg-accent/55"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
