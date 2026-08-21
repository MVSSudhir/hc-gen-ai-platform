import type { Metadata } from "next";
import Link from "next/link";
import {
  genaiConcepts,
  hcaiUseCases,
  itemPath,
  latestItems,
  paItems,
  workProjects,
} from "@/lib/content";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { site, verticalMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: site.url },
};

const exploreByProblem = [
  {
    problem: "I want to improve recruiting",
    links: [
      {
        label: "Candidate Rediscovery",
        href: "/human-capital-ai/candidate-rediscovery",
      },
      {
        label: "Candidate Matching",
        href: "/human-capital-ai/candidate-matching",
      },
      { label: "Time to Fill", href: "/people-analytics/time-to-fill" },
      { label: "Quality of Hire", href: "/people-analytics/quality-of-hire" },
    ],
  },
  {
    problem: "I want to understand attrition",
    links: [
      { label: "Attrition Rate", href: "/people-analytics/attrition-rate" },
      { label: "Cohort Analysis", href: "/people-analytics/cohort-analysis" },
      {
        label: "Executive Workforce Dashboard",
        href: "/people-analytics/executive-workforce-dashboard",
      },
    ],
  },
  {
    problem: "I want AI to help employees get answers",
    links: [
      {
        label: "HR Knowledge Assistant",
        href: "/human-capital-ai/hr-knowledge-assistant",
      },
      { label: "RAG", href: "/genai/rag" },
      { label: "Semantic Search", href: "/genai/semantic-search" },
    ],
  },
];

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-4 sm:px-8">{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="eyebrow text-muted">{children}</h2>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}

export default function HomePage() {
  const featured = workProjects()
    .filter(({ meta }) => meta.featured)
    .slice(0, 5);
  const latest = latestItems(6);

  const verticalPanels = [
    {
      letter: "A",
      ...verticalMeta.genai,
      count: genaiConcepts().length,
      unit: "concepts",
    },
    {
      letter: "B",
      ...verticalMeta["human-capital-ai"],
      count: hcaiUseCases().length,
      unit: "use cases",
    },
    {
      letter: "C",
      ...verticalMeta["people-analytics"],
      count: paItems().length,
      unit: "references",
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd(), websiteJsonLd()]),
        }}
      />

      {/* Hero — full-bleed ink plane; brand is the dominant signal */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 85% 20%, rgba(31,63,158,0.28), transparent 55%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(244,241,234,0.06), transparent 50%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink-border to-transparent"
        />
        <Container>
          <div className="relative pb-28 pt-16 sm:pb-32 sm:pt-20">
            <p className="eyebrow animate-fade-up text-ink-muted">
              {site.tagline}
            </p>
            <h1 className="animate-fade-up delay-1 mt-5 font-serif text-[2.35rem] font-medium leading-[1.05] tracking-tight break-words sm:text-5xl md:text-6xl">
              {site.name}
            </h1>
            <p className="animate-fade-up delay-2 mt-5 flex flex-wrap items-center gap-x-3 text-base text-ink-muted sm:text-lg">
              <span>Human Capital</span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>Analytics</span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>Generative AI</span>
            </p>
            <p className="animate-fade-up delay-3 mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-foreground/80">
              A place to check learning and ideas: a Generative AI path,
              Human Capital AI initiatives, and People Analytics references
              for people with real business problems.
            </p>
            <div className="animate-fade-up delay-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/genai"
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-ink-foreground px-6 text-sm font-medium text-ink transition-colors hover:bg-white sm:h-11 sm:w-auto"
              >
                Start learning
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 w-full items-center justify-center rounded-md border border-ink-border px-6 text-sm font-medium text-ink-foreground transition-colors hover:border-ink-muted hover:bg-ink-soft sm:h-11 sm:w-auto"
              >
                About this site
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Three verticals — elevated panels overlapping the ink hero */}
      <section aria-label="Knowledge verticals" className="relative -mt-16 pb-6 sm:-mt-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {verticalPanels.map((panel, index) => (
              <Link
                key={panel.path}
                href={panel.path}
                className={`panel group relative flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8 animate-fade-up ${
                  index === 0 ? "delay-1" : index === 1 ? "delay-2" : "delay-3"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-sm italic text-faint">
                    {panel.letter}
                  </span>
                  <span className="text-xs text-faint">
                    {panel.count} {panel.unit}
                  </span>
                </div>
                <span className="eyebrow mt-6 text-accent">{panel.label}</span>
                <span className="mt-2 font-serif text-2xl font-medium tracking-tight">
                  {panel.kicker}
                </span>
                <span className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                  {panel.description}
                </span>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Explore
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Explore by problem */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionLabel>Explore by problem</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {exploreByProblem.map((entry) => (
              <div key={entry.problem} className="panel p-7">
                <h3 className="font-serif text-lg font-medium leading-snug">
                  “{entry.problem}”
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {entry.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-baseline gap-2 text-sm text-muted transition-colors hover:text-accent"
                      >
                        <span
                          aria-hidden="true"
                          className="h-px w-3 shrink-0 self-center bg-border-strong transition-colors group-hover:bg-accent"
                        />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Selected work */}
      {featured.length > 0 && (
        <section className="border-y border-border bg-surface/70 py-16 sm:py-20">
          <Container>
            <SectionLabel>Selected work</SectionLabel>
            <div className="panel overflow-hidden">
              {featured.map(({ meta }, index) => (
                <article
                  key={meta.slug}
                  className="group relative grid gap-1 border-b border-border px-5 py-7 transition-colors last:border-b-0 hover:bg-surface sm:grid-cols-[3rem_1fr_auto] sm:gap-6 sm:px-7"
                >
                  <span className="hidden pt-0.5 font-serif text-sm italic text-faint sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">
                      <Link
                        href={itemPath(meta)}
                        className="transition-colors group-hover:text-accent"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {meta.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">
                      {meta.description}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden self-center text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:block"
                  >
                    →
                  </span>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/work"
                className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                View all work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Latest */}
      {latest.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionLabel>Latest</SectionLabel>
            <div className="panel overflow-hidden px-5 sm:px-7">
              <ul className="grid gap-x-12 sm:grid-cols-2">
                {latest.map(({ meta }) => (
                  <li
                    key={`${meta.vertical}/${meta.slug}`}
                    className="border-b border-border last:border-b-0 sm:odd:pr-4 sm:even:pl-4 sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <Link
                      href={itemPath(meta)}
                      className="group flex items-baseline justify-between gap-4 py-4"
                    >
                      <span className="text-[15px] transition-colors group-hover:text-accent">
                        {meta.title}
                      </span>
                      <span className="eyebrow shrink-0 text-faint">
                        {verticalMeta[meta.vertical].label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* About + contact */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="panel-ink relative overflow-hidden px-7 py-12 sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="relative grid gap-10 sm:grid-cols-[2fr_1fr] sm:items-end">
              <div>
                <p className="eyebrow text-ink-muted">About</p>
                <p className="mt-5 max-w-xl font-serif text-2xl leading-relaxed sm:text-[1.75rem]">
                  Human Capital Sense is a knowledge site at the intersection
                  of Human Capital, analytics and Generative AI — for anyone
                  checking how to learn, measure workforces, and apply AI in
                  practice.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm sm:items-end">
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
                <Link
                  href="/about"
                  className="text-ink-muted transition-colors hover:text-ink-foreground"
                >
                  About this site →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
