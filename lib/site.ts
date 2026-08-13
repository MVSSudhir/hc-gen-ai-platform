/**
 * Central site configuration.
 *
 * Placeholder values (name, email, social links) should be replaced with
 * real values before launch. Everything else on the site reads from here.
 */

function envUrl(): string {
  const raw = (process.env.SITE_URL || "https://example.com").trim();
  return raw.replace(/\/+$/, "");
}

function envEmail(): string {
  return (process.env.CONTACT_EMAIL || "sudsakblack@gmail.com").trim();
}

export const site = {
  name: "M V S Sudhir",
  tagline: "Human Capital × Analytics × Generative AI",
  description:
    "A personal knowledge platform covering Generative AI concepts, AI use cases in Human Capital, and People Analytics — metrics, methods, dashboards and practical applications.",
  url: envUrl(),
  email: envEmail(),
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-handle"
  github: "https://github.com/MVSSudhir",
} as const;

export const verticalMeta = {
  genai: {
    label: "Generative AI",
    kicker: "My Learning Journey",
    path: "/genai",
    description:
      "A structured learning path through Generative AI — foundations to enterprise patterns — in short, practical concept pages.",
  },
  "human-capital-ai": {
    label: "Human Capital AI",
    kicker: "AI Initiative Reference",
    path: "/human-capital-ai",
    description:
      "A practical library of AI initiatives across Human Capital — what organizations can explore, how it works, and what to watch for.",
  },
  "people-analytics": {
    label: "People Analytics",
    kicker: "Analytics Reference",
    path: "/people-analytics",
    description:
      "Metrics, methods, dashboards and use cases for measuring the workforce and supporting business decisions.",
  },
  work: {
    label: "Work",
    kicker: "Selected Work",
    path: "/work",
    description:
      "Selected projects and implementations across analytics, Generative AI and Human Capital.",
  },
} as const;

export type Vertical = keyof typeof verticalMeta;

export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
} as const;
