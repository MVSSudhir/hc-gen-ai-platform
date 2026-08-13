/**
 * Controlled taxonomy for the entire platform.
 *
 * Tags, categories and filter values must come from these lists.
 * Content validation fails on values that are not defined here.
 */

/** A — GenAI topic tags */
export const genaiTopics = [
  "foundations",
  "models",
  "tokens",
  "transformers",
  "context",
  "optimization",
  "embeddings",
  "retrieval",
  "rag",
  "agents",
  "tool-calling",
  "evaluation",
  "guardrails",
  "multimodal",
  "enterprise-ai",
  "governance",
] as const;

/** B — Human Capital AI functional categories */
export const hcaiCategories = [
  "talent-acquisition",
  "candidate-experience",
  "interviewing",
  "talent-management",
  "skills",
  "internal-mobility",
  "succession",
  "learning",
  "performance",
  "employee-experience",
  "hr-operations",
  "workforce-planning",
] as const;

/** B — AI/technology patterns used for filtering */
export const aiPatterns = [
  "llm",
  "rag",
  "embeddings",
  "semantic-search",
  "agents",
  "automation",
  "recommendation",
  "classification",
  "summarization",
] as const;

/** B — implementation maturity */
export const implementationStages = [
  "concept",
  "pilot",
  "production",
  "scaled",
] as const;

/** B/C — evidence rating for externally researched content */
export const evidenceStrengths = ["strong", "medium", "weak"] as const;

/** B — reported impact categories */
export const impactTypes = [
  "efficiency",
  "cost",
  "quality",
  "experience",
  "productivity",
  "decision-support",
  "business-impact",
] as const;

/** C — People Analytics domains */
export const paDomains = [
  "workforce",
  "recruiting",
  "attrition",
  "talent",
  "performance",
  "compensation",
  "learning",
  "organization",
  "productivity",
  "skills",
  "mobility",
  "workforce-planning",
] as const;

/** C — analytical types */
export const analyticalTypes = [
  "descriptive",
  "diagnostic",
  "predictive",
  "prescriptive",
] as const;

/** Content lifecycle status. Only `published` is publicly visible. */
export const contentStatuses = [
  "draft",
  "review",
  "approved",
  "published",
  "archived",
] as const;

export const verticals = [
  "genai",
  "human-capital-ai",
  "people-analytics",
  "work",
] as const;

export const contentTypesByVertical = {
  genai: ["concept"],
  "human-capital-ai": ["use-case", "case-study"],
  "people-analytics": [
    "metric",
    "analytical-method",
    "dashboard-pattern",
    "use-case",
    "case-study",
  ],
  work: ["project"],
} as const;

/** Human-readable labels for taxonomy values used in the UI. */
export function labelize(value: string): string {
  const overrides: Record<string, string> = {
    llm: "LLM",
    rag: "RAG",
    "hr-operations": "HR Operations",
    "decision-support": "Decision support",
    "business-impact": "Business impact",
  };
  if (overrides[value]) return overrides[value];
  return value
    .split("-")
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}
