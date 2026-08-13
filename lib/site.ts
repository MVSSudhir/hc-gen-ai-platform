/**
 * Central site configuration.
 *
 * Placeholder values (name, email, social links) should be replaced with
 * real values before launch. Everything else on the site reads from here.
 */
export const site = {
  name: "M V S Sudhir",
  tagline: "Human Capital × Analytics × Generative AI",
  description:
    "A personal knowledge platform covering Generative AI concepts, AI use cases in Human Capital, and People Analytics — metrics, methods, dashboards and practical applications.",
  url: process.env.SITE_URL ?? "https://example.com",
  email: process.env.CONTACT_EMAIL ?? "sudsakblack@gmail.com",
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-handle"
  github: "", // e.g. "https://github.com/your-handle"
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
