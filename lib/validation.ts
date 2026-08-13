import { z } from "zod";
import {
  aiPatterns,
  analyticalTypes,
  contentStatuses,
  evidenceStrengths,
  genaiTopics,
  hcaiCategories,
  impactTypes,
  implementationStages,
  paDomains,
} from "./taxonomy";

// YAML parses unquoted dates as Date objects; normalize to YYYY-MM-DD strings.
const isoDate = z.preprocess(
  (value) =>
    value instanceof Date ? value.toISOString().slice(0, 10) : value,
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD date"),
);

const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Expected kebab-case slug");

/** Fields shared by every content item across all verticals. */
const baseFields = {
  id: slug,
  slug,
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(contentStatuses),
  createdAt: isoDate,
  updatedAt: isoDate,
  /** Marks placeholder content created before real research/curation. */
  demo: z.boolean().default(false),
};

const relatedSlugs = z.array(slug).default([]);

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  publisher: z.string().min(1),
  url: z.string().url(),
  publishedDate: isoDate.optional(),
  sourceType: z.string().optional(),
});

/** A — GenAI concept */
export const genaiConceptSchema = z.object({
  ...baseFields,
  vertical: z.literal("genai"),
  contentType: z.literal("concept"),
  tags: z.array(z.enum(genaiTopics)).default([]),
  /** Position in the curated learning path (1-based). */
  learningOrder: z.number().int().positive().optional(),
  shortDefinition: z.string().min(1),
  whyItMatters: z.array(z.string().min(1)).min(1),
  keyIdeas: z.array(z.string().min(1)).default([]),
  relatedConcepts: relatedSlugs,
  relatedImplementations: relatedSlugs,
  relatedMetrics: relatedSlugs,
});

/** B — Human Capital AI use case */
export const hcaiUseCaseSchema = z.object({
  ...baseFields,
  vertical: z.literal("human-capital-ai"),
  contentType: z.enum(["use-case", "case-study"]),
  category: z.enum(hcaiCategories),
  tags: z.array(z.enum(hcaiCategories)).default([]),
  problem: z.string().min(1),
  opportunity: z.string().optional(),
  solution: z.string().min(1),
  howItWorks: z.string().min(1),
  users: z.array(z.string().min(1)).default([]),
  dataRequired: z.array(z.string().min(1)).default([]),
  technologyPatterns: z.array(z.enum(aiPatterns)).min(1),
  organizations: z.array(z.string().min(1)).default([]),
  implementationStage: z.enum(implementationStages),
  /** Null when no impact has been credibly reported. Never invented. */
  reportedImpact: z.string().nullable().default(null),
  impactType: z.array(z.enum(impactTypes)).default([]),
  evidenceStrength: z.enum(evidenceStrengths),
  risks: z.string().min(1),
  implementationConsiderations: z.string().min(1),
  relatedGenAIConcepts: relatedSlugs,
  relatedPeopleAnalytics: relatedSlugs,
  relatedUseCases: relatedSlugs,
  sources: z.array(sourceSchema).default([]),
  lastVerified: isoDate.optional(),
});

/** C — People Analytics metric */
export const paMetricSchema = z.object({
  ...baseFields,
  vertical: z.literal("people-analytics"),
  contentType: z.literal("metric"),
  domain: z.enum(paDomains),
  tags: z.array(z.enum(paDomains)).default([]),
  analyticalTypes: z.array(z.enum(analyticalTypes)).default([]),
  definition: z.string().min(1),
  formula: z.string().min(1),
  businessQuestion: z.string().min(1),
  interpretation: z.string().min(1),
  recommendedSegments: z.array(z.string().min(1)).default([]),
  relatedMetrics: relatedSlugs,
  commonPitfalls: z.string().min(1),
  visualization: z.array(z.string().min(1)).default([]),
  businessDecisions: z.string().min(1),
  relatedUseCases: relatedSlugs,
  relatedDashboards: relatedSlugs,
});

/** C — People Analytics analytical method */
export const paMethodSchema = z.object({
  ...baseFields,
  vertical: z.literal("people-analytics"),
  contentType: z.literal("analytical-method"),
  domain: z.enum(paDomains).optional(),
  tags: z.array(z.enum(paDomains)).default([]),
  analyticalTypes: z.array(z.enum(analyticalTypes)).min(1),
  purpose: z.string().min(1),
  businessQuestions: z.array(z.string().min(1)).min(1),
  dataRequired: z.array(z.string().min(1)).default([]),
  method: z.string().min(1),
  exampleApplication: z.string().min(1),
  interpretation: z.string().min(1),
  limitations: z.string().min(1),
  relatedMetrics: relatedSlugs,
  relatedUseCases: relatedSlugs,
});

/** C — People Analytics dashboard pattern */
export const paDashboardSchema = z.object({
  ...baseFields,
  vertical: z.literal("people-analytics"),
  contentType: z.literal("dashboard-pattern"),
  domain: z.enum(paDomains).optional(),
  tags: z.array(z.enum(paDomains)).default([]),
  analyticalTypes: z.array(z.enum(analyticalTypes)).default([]),
  purpose: z.string().min(1),
  audience: z.array(z.string().min(1)).min(1),
  businessQuestions: z.array(z.string().min(1)).min(1),
  recommendedMetrics: relatedSlugs,
  recommendedVisuals: z.array(z.string().min(1)).default([]),
  recommendedFilters: z.array(z.string().min(1)).default([]),
  designPrinciples: z.string().min(1),
  relatedMetrics: relatedSlugs,
});

/** C — People Analytics practical use case / case study */
export const paUseCaseSchema = z.object({
  ...baseFields,
  vertical: z.literal("people-analytics"),
  contentType: z.enum(["use-case", "case-study"]),
  domain: z.enum(paDomains),
  tags: z.array(z.enum(paDomains)).default([]),
  analyticalTypes: z.array(z.enum(analyticalTypes)).default([]),
  businessQuestion: z.string().min(1),
  approach: z.string().min(1),
  dataRequired: z.array(z.string().min(1)).default([]),
  relatedMetrics: relatedSlugs,
  relatedMethods: relatedSlugs,
  relatedDashboards: relatedSlugs,
  relatedImplementations: relatedSlugs,
  sources: z.array(sourceSchema).default([]),
  lastVerified: isoDate.optional(),
});

/** Work project */
export const workProjectSchema = z.object({
  ...baseFields,
  vertical: z.literal("work"),
  contentType: z.literal("project"),
  tags: z.array(z.string().min(1)).default([]),
  problem: z.string().min(1),
  approach: z.string().min(1),
  whatIBuilt: z.string().min(1),
  technology: z.array(z.string().min(1)).default([]),
  outcome: z.string().min(1),
  whatILearned: z.string().min(1),
  relatedConcepts: relatedSlugs,
  relatedUseCases: relatedSlugs,
  relatedMetrics: relatedSlugs,
  featured: z.boolean().default(false),
});

export type GenaiConcept = z.infer<typeof genaiConceptSchema>;
export type HcaiUseCase = z.infer<typeof hcaiUseCaseSchema>;
export type PaMetric = z.infer<typeof paMetricSchema>;
export type PaMethod = z.infer<typeof paMethodSchema>;
export type PaDashboard = z.infer<typeof paDashboardSchema>;
export type PaUseCase = z.infer<typeof paUseCaseSchema>;
export type WorkProject = z.infer<typeof workProjectSchema>;

export type PaItem = PaMetric | PaMethod | PaDashboard | PaUseCase;
export type ContentItem = GenaiConcept | HcaiUseCase | PaItem | WorkProject;

/**
 * Picks the correct schema for a frontmatter object based on its declared
 * vertical and content type. Throws for unknown combinations.
 */
export function schemaFor(frontmatter: {
  vertical?: unknown;
  contentType?: unknown;
}) {
  const vertical = String(frontmatter.vertical ?? "");
  const contentType = String(frontmatter.contentType ?? "");

  if (vertical === "genai" && contentType === "concept") {
    return genaiConceptSchema;
  }
  if (
    vertical === "human-capital-ai" &&
    (contentType === "use-case" || contentType === "case-study")
  ) {
    return hcaiUseCaseSchema;
  }
  if (vertical === "people-analytics") {
    switch (contentType) {
      case "metric":
        return paMetricSchema;
      case "analytical-method":
        return paMethodSchema;
      case "dashboard-pattern":
        return paDashboardSchema;
      case "use-case":
      case "case-study":
        return paUseCaseSchema;
    }
  }
  if (vertical === "work" && contentType === "project") {
    return workProjectSchema;
  }
  throw new Error(
    `No schema for vertical="${vertical}" contentType="${contentType}"`,
  );
}
