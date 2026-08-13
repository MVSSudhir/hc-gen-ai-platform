/**
 * Candidate-record schema for the research pipeline (Phases 7-9).
 *
 * Every research run writes candidates to research/candidates/ for human
 * review. Nothing becomes public content without explicit human approval.
 */
import { z } from "zod";
import {
  aiPatterns,
  evidenceStrengths,
  hcaiCategories,
  impactTypes,
  implementationStages,
  paDomains,
} from "../taxonomy";

export const candidateStatuses = [
  "discovered",
  "ai-reviewed",
  "human-approved",
  "ready",
  "published",
  "rejected",
] as const;

export const candidateSourceSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  publisher: z.string().optional(),
  publishedDate: z.string().optional(),
  sourceType: z.string(),
  discoveredAt: z.string(),
  lastVerified: z.string().optional(),
});

const hcaiExtractionSchema = z.object({
  vertical: z.literal("human-capital-ai"),
  contentType: z.enum(["use-case", "case-study"]),
  category: z.enum(hcaiCategories),
  organization: z.string().nullable(),
  businessProblem: z.string(),
  solution: z.string(),
  howItWorks: z.string().nullable(),
  technologyPatterns: z.array(z.enum(aiPatterns)),
  implementationStage: z.enum(implementationStages),
  /** Null when the source states no outcome. Never invented. */
  reportedImpact: z.string().nullable(),
  impactType: z.array(z.enum(impactTypes)).default([]),
});

const paExtractionSchema = z.object({
  vertical: z.literal("people-analytics"),
  contentType: z.enum([
    "metric",
    "analytical-method",
    "dashboard-pattern",
    "use-case",
    "case-study",
  ]),
  domain: z.enum(paDomains),
  metric: z.string().nullable(),
  businessQuestion: z.string().nullable(),
  dataRequired: z.array(z.string()).default([]),
  analyticalMethod: z.string().nullable(),
  reportingApproach: z.string().nullable(),
  dashboardPattern: z.string().nullable(),
  interpretation: z.string().nullable(),
  caseStudy: z.string().nullable(),
  organization: z.string().nullable(),
});

export const candidateSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(candidateStatuses),
  discoveredAt: z.string(),
  source: candidateSourceSchema,
  /** Structured extraction; shape depends on the pipeline that produced it. */
  extraction: z.discriminatedUnion("vertical", [
    hcaiExtractionSchema,
    paExtractionSchema,
  ]),
  aiSummary: z.string(),
  evidenceStrength: z.enum(evidenceStrengths),
  evidenceRationale: z.string(),
  marketingClaim: z.boolean(),
  duplicateProbability: z.number().min(0).max(1),
  closestExistingId: z.string().nullable(),
  suggestedRelationships: z.array(z.string()).default([]),
  missingInformation: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1),
});

export type Candidate = z.infer<typeof candidateSchema>;
