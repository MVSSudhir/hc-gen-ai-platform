import type { Metadata } from "next";
import { PageHeader } from "@/components/content/page-header";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.name} — ${site.tagline}. A knowledge site for learning and ideas, with ${site.contributor} as a contributor.`,
  path: "/about",
});

const focus = [
  "Practical Generative AI in Human Capital",
  "Evidence-based AI adoption — what actually works",
  "Workforce metrics that support real decisions",
  "Knowledge architecture and structured content",
];

const library = [
  "People Analytics and workforce measurement",
  "Analytical problem solving and data visualization",
  "Generative AI patterns: RAG, embeddings, agents",
  "AI use-case identification in Human Capital",
  "Building AI-enabled analytical workflows",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <PageHeader
        kicker="About"
        title={site.name}
        description={site.tagline}
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="panel p-7 sm:p-9">
          <p className="definition max-w-none border-l-0 pl-0 text-[1.2rem] sm:text-[1.3rem]">
            This site is for others to check learning and ideas — not a
            personal portfolio. Use it to follow a Generative AI path, browse
            Human Capital AI initiatives, and look up People Analytics metrics,
            methods and dashboards when you have a real problem to solve.
          </p>
        </section>

        <section className="panel-ink relative overflow-hidden p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl"
          />
          <h2 className="eyebrow relative text-ink-muted">Contributor</h2>
          <p className="relative mt-5 font-serif text-xl font-medium tracking-tight text-ink-foreground">
            {site.contributor}
          </p>
          <p className="relative mt-3 text-[15px] leading-relaxed text-ink-muted">
            Writes and curates the library at the intersection of Human
            Capital, analytics and Generative AI.
          </p>
          <div className="relative mt-5 flex flex-col gap-3 text-[15px]">
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-ink-foreground transition-colors hover:text-white"
            >
              {site.email}
            </a>
            {site.linkedin && (
              <a
                href={site.linkedin}
                rel="noopener noreferrer"
                className="text-ink-muted transition-colors hover:text-ink-foreground"
              >
                LinkedIn
              </a>
            )}
            {site.github && (
              <a
                href={site.github}
                rel="noopener noreferrer"
                className="text-ink-muted transition-colors hover:text-ink-foreground"
              >
                GitHub
              </a>
            )}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section className="panel p-7 sm:p-8">
          <h2 className="eyebrow text-muted">What you will find</h2>
          <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-relaxed">
            {focus.map((item) => (
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
          <h2 className="eyebrow text-muted">The library covers</h2>
          <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-relaxed">
            {library.map((item) => (
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
