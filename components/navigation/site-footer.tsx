import Link from "next/link";
import { site } from "@/lib/site";

const columns = [
  {
    heading: "Knowledge",
    links: [
      { label: "GenAI", href: "/genai" },
      { label: "Human Capital AI", href: "/human-capital-ai" },
      { label: "People Analytics", href: "/people-analytics" },
    ],
  },
  {
    heading: "Site",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Search", href: "/search" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <p className="font-serif text-xl font-medium tracking-tight">
              {site.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {site.tagline}
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm sm:flex sm:gap-14"
          >
            {columns.map((column) => (
              <div key={column.heading}>
                <p className="eyebrow mb-4 text-ink-muted">{column.heading}</p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center text-ink-muted transition-colors hover:text-ink-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-4 text-ink-muted">Contact</p>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-10 items-center break-all text-ink-muted transition-colors hover:text-ink-foreground"
                  >
                    Email
                  </a>
                </li>
                {site.linkedin && (
                  <li>
                    <a
                      href={site.linkedin}
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center text-ink-muted transition-colors hover:text-ink-foreground"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}
                {site.github && (
                  <li>
                    <a
                      href={site.github}
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center text-ink-muted transition-colors hover:text-ink-foreground"
                    >
                      GitHub
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-14 border-t border-ink-border pt-6">
          <p className="text-xs text-ink-muted">
            © 2026 {site.name}. {site.tagline} for Generative AI, Human
            Capital AI and People Analytics. Contributor: {site.contributor}.
          </p>
        </div>
      </div>
    </footer>
  );
}
