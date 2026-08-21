/**
 * Central site configuration.
 *
 * Brand is Human Capital Sense. M V S Sudhir is listed as a contributor.
 * Social links (LinkedIn, GitHub) should be filled in before launch.
 * Canonical URL is https://hcsense.org.
 */
function canonicalUrl(raw: string | undefined): string {
  const fallback = "https://hcsense.org";
  const value = (raw ?? fallback).trim().replace(/\/+$/, "");
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export const site = {
  name: "Human Capital Sense",
  tagline: "Human Capital Knowledge",
  description:
    "A knowledge site for learning and ideas across Generative AI, Human Capital AI, and People Analytics — concepts, use cases, metrics and methods you can apply.",
  contributor: "M V S Sudhir",
  url: canonicalUrl(process.env.SITE_URL),
  email: process.env.CONTACT_EMAIL ?? "sudsakblack@gmail.com",
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-handle"
  github: "", // e.g. "https://github.com/your-handle"
} as const;

export const verticalMeta = {
  genai: {
    label: "Generative AI",
    kicker: "Learning Path",
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
