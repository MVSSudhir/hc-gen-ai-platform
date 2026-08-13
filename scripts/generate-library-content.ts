/**
 * Regenerates content/{genai,human-capital-ai,people-analytics} from seed data.
 * Run: npx tsx scripts/generate-library-content.ts
 */
import fs from "node:fs";
import path from "node:path";
import { genaiCurriculum } from "./data/genai-curriculum";
import { hcaiUseCaseSeeds } from "./data/hcai-usecases";
import { paItemSeeds } from "./data/pa-items";

const ROOT = process.cwd();
const DATE = "2026-08-09";

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

function yamlList(items: string[], indent = 0): string {
  const pad = "  ".repeat(indent);
  if (!items.length) return `${pad}[]`;
  return items.map((i) => `${pad}- ${yamlEscape(i)}`).join("\n");
}

function yamlBlock(key: string, text: string): string {
  const cleaned = text.trim().replace(/\n+/g, " ");
  return `${key}: >\n  ${cleaned}`;
}

function writeFile(rel: string, contents: string) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
}

function clearVertical(vertical: string) {
  const dir = path.join(ROOT, "content", vertical);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (/\.(md|mdx)$/.test(file)) fs.unlinkSync(path.join(dir, file));
  }
}

function generateGenai() {
  clearVertical("genai");
  genaiCurriculum.forEach((concept, index) => {
    const order = index + 1;
    const next = genaiCurriculum[index + 1];
    const prev = genaiCurriculum[index - 1];
    const related = new Set(concept.relatedConcepts);
    if (prev) related.add(prev.slug);
    if (next) related.add(next.slug);

    const fm = `---
id: ${concept.slug}
slug: ${concept.slug}
vertical: genai
contentType: concept
title: ${yamlEscape(concept.title)}
description: ${yamlEscape(concept.shortDefinition)}
tags:
  - ${concept.tag}
learningOrder: ${order}
shortDefinition: >
  ${concept.shortDefinition.trim()}
whyItMatters:
${yamlList(concept.whyItMatters, 1)}
keyIdeas:
${yamlList(concept.keyIdeas, 1)}
relatedConcepts:
${yamlList([...related], 1)}
relatedImplementations: []
relatedMetrics: []
status: published
demo: false
createdAt: ${DATE}
updatedAt: ${DATE}
---

${concept.body.trim()}
`;
    writeFile(`content/genai/${concept.slug}.mdx`, fm);
  });
  console.log(`GenAI: ${genaiCurriculum.length} concepts`);
}

function generateHcai() {
  clearVertical("human-capital-ai");
  const usersByCategory: Record<string, string[]> = {
    "talent-acquisition": ["Recruiters", "Sourcing teams", "TA leaders"],
    "candidate-experience": ["Candidates", "Recruiters", "TA operations"],
    interviewing: ["Interviewers", "Hiring managers", "Recruiters"],
    "talent-management": ["Talent managers", "HRBPs", "Employees"],
    skills: ["Employees", "Talent teams", "Learning teams"],
    "internal-mobility": ["Employees", "Career coaches", "Talent marketplace owners"],
    succession: ["Succession planners", "CHROs", "Business leaders"],
    learning: ["L&D teams", "Employees", "Managers"],
    performance: ["Managers", "Employees", "HRBPs"],
    "employee-experience": ["Employees", "HR shared services", "HRBPs"],
    "hr-operations": ["HR operations", "Shared services", "HRIS teams"],
    "workforce-planning": ["Workforce planners", "Finance partners", "CHROs"],
  };

  const paByCategory: Record<string, string[]> = {
    "talent-acquisition": ["time-to-fill", "quality-of-hire", "offer-acceptance-rate"],
    "candidate-experience": ["candidate-nps", "offer-acceptance-rate"],
    interviewing: ["quality-of-hire", "interview-to-offer-ratio"],
    "talent-management": ["internal-mobility-rate", "promotion-rate"],
    skills: ["skills-coverage-index", "skills-gap-severity"],
    "internal-mobility": ["internal-mobility-rate", "internal-fill-rate"],
    succession: ["succession-coverage-ratio", "bench-strength"],
    learning: ["learning-completion-rate", "training-hours-per-employee"],
    performance: ["performance-rating-distribution", "high-performer-retention"],
    "employee-experience": ["employee-engagement-score", "attrition-rate"],
    "hr-operations": ["span-of-control", "labor-cost-ratio"],
    "workforce-planning": ["headcount", "workforce-planning-accuracy"],
  };
  const paSlugs = new Set(paItemSeeds.map((p) => p.slug));

  for (const useCase of hcaiUseCaseSeeds) {
    const relatedGenAI = (useCase.relatedGenAI || []).filter(Boolean);
    const relatedPA = (paByCategory[useCase.category] ?? []).filter((s) =>
      paSlugs.has(s),
    );
    const fm = `---
id: ${useCase.slug}
slug: ${useCase.slug}
vertical: human-capital-ai
contentType: use-case
title: ${yamlEscape(useCase.title)}
description: ${yamlEscape(useCase.solution)}
category: ${useCase.category}
tags:
  - ${useCase.category}
${yamlBlock("problem", useCase.problem)}
${yamlBlock("opportunity", "AI can reduce repetitive effort and surface options humans still decide — when grounded in the right data and oversight.")}
${yamlBlock("solution", useCase.solution)}
${yamlBlock("howItWorks", useCase.howItWorks)}
users:
${yamlList(usersByCategory[useCase.category] ?? ["HR practitioners"], 1)}
dataRequired:
${yamlList(["Relevant HRIS / ATS records", "Role or policy context", "Access and consent rules"], 1)}
technologyPatterns:
${yamlList(useCase.technologyPatterns, 1)}
organizations: []
implementationStage: ${useCase.implementationStage}
reportedImpact: null
impactType:
${yamlList(useCase.impactType, 1)}
evidenceStrength: weak
${yamlBlock("risks", "Bias inheritance, stale data, privacy obligations and over-automation of people decisions. Keep humans accountable for outcomes that affect careers.")}
${yamlBlock("implementationConsiderations", "Start narrow, define evaluation criteria, involve legal/HR governance early, and measure adoption plus quality — not only model accuracy.")}
relatedGenAIConcepts:
${yamlList(relatedGenAI, 1)}
relatedPeopleAnalytics:
${yamlList(relatedPA, 1)}
relatedUseCases: []
sources: []
status: published
demo: true
createdAt: ${DATE}
updatedAt: ${DATE}
---
`;
    writeFile(`content/human-capital-ai/${useCase.slug}.mdx`, fm);
  }
  console.log(`Human Capital AI: ${hcaiUseCaseSeeds.length} use cases`);
}

function generatePa() {
  clearVertical("people-analytics");
  for (const item of paItemSeeds) {
    if (item.kind === "metric") {
      const fm = `---
id: ${item.slug}
slug: ${item.slug}
vertical: people-analytics
contentType: metric
title: ${yamlEscape(item.title)}
description: ${yamlEscape(item.businessQuestion)}
domain: ${item.domain}
tags:
  - ${item.domain}
analyticalTypes:
${yamlList(item.analyticalTypes, 1)}
${yamlBlock("definition", item.definition)}
${yamlBlock("formula", item.formula)}
${yamlBlock("businessQuestion", item.businessQuestion)}
${yamlBlock("interpretation", item.interpretation)}
recommendedSegments:
${yamlList(["Business unit", "Geography", "Function", "Grade or level"], 1)}
relatedMetrics:
${yamlList(item.relatedMetrics, 1)}
${yamlBlock("commonPitfalls", item.commonPitfalls)}
visualization:
${yamlList(["Trend over time", "Segment comparison", "Distribution"], 1)}
${yamlBlock("businessDecisions", item.businessDecisions)}
relatedUseCases: []
relatedDashboards: []
status: published
demo: true
createdAt: ${DATE}
updatedAt: ${DATE}
---
`;
      writeFile(`content/people-analytics/${item.slug}.mdx`, fm);
    } else if (item.kind === "analytical-method") {
      const fm = `---
id: ${item.slug}
slug: ${item.slug}
vertical: people-analytics
contentType: analytical-method
title: ${yamlEscape(item.title)}
description: ${yamlEscape(item.purpose)}
${item.domain ? `domain: ${item.domain}\n` : ""}tags:
${item.domain ? `  - ${item.domain}` : "  - workforce"}
analyticalTypes:
${yamlList(item.analyticalTypes, 1)}
${yamlBlock("purpose", item.purpose)}
businessQuestions:
${yamlList(item.businessQuestions, 1)}
dataRequired:
${yamlList(["Clean employee event history", "Consistent definitions", "Adequate sample size"], 1)}
${yamlBlock("method", item.method)}
${yamlBlock("exampleApplication", item.exampleApplication)}
${yamlBlock("interpretation", item.interpretation)}
${yamlBlock("limitations", item.limitations)}
relatedMetrics:
${yamlList(item.relatedMetrics, 1)}
relatedUseCases: []
status: published
demo: true
createdAt: ${DATE}
updatedAt: ${DATE}
---
`;
      writeFile(`content/people-analytics/${item.slug}.mdx`, fm);
    } else if (item.kind === "dashboard-pattern") {
      const fm = `---
id: ${item.slug}
slug: ${item.slug}
vertical: people-analytics
contentType: dashboard-pattern
title: ${yamlEscape(item.title)}
description: ${yamlEscape(item.purpose)}
${item.domain ? `domain: ${item.domain}\n` : ""}tags:
${item.domain ? `  - ${item.domain}` : "  - workforce"}
analyticalTypes:
${yamlList(item.analyticalTypes, 1)}
${yamlBlock("purpose", item.purpose)}
audience:
${yamlList(item.audience, 1)}
businessQuestions:
${yamlList(item.businessQuestions, 1)}
recommendedMetrics:
${yamlList(item.recommendedMetricSlugs, 1)}
recommendedVisuals:
${yamlList(["KPI cards with trend", "Segment comparison", "Exception table"], 1)}
recommendedFilters:
${yamlList(["Business unit", "Geography", "Function", "Time period"], 1)}
${yamlBlock("designPrinciples", item.designPrinciples)}
relatedMetrics:
${yamlList(item.recommendedMetricSlugs, 1)}
status: published
demo: true
createdAt: ${DATE}
updatedAt: ${DATE}
---
`;
      writeFile(`content/people-analytics/${item.slug}.mdx`, fm);
    } else {
      const fm = `---
id: ${item.slug}
slug: ${item.slug}
vertical: people-analytics
contentType: use-case
title: ${yamlEscape(item.title)}
description: ${yamlEscape(item.businessQuestion)}
domain: ${item.domain}
tags:
  - ${item.domain}
analyticalTypes:
${yamlList(item.analyticalTypes, 1)}
${yamlBlock("businessQuestion", item.businessQuestion)}
${yamlBlock("approach", item.approach)}
dataRequired:
${yamlList(["Relevant workforce data extracts", "Agreed metric definitions", "Segment attributes"], 1)}
relatedMetrics:
${yamlList(item.relatedMetrics, 1)}
relatedMethods: []
relatedDashboards: []
relatedImplementations: []
sources: []
status: published
demo: true
createdAt: ${DATE}
updatedAt: ${DATE}
---
`;
      writeFile(`content/people-analytics/${item.slug}.mdx`, fm);
    }
  }
  console.log(`People Analytics: ${paItemSeeds.length} items`);
}

generateGenai();
generateHcai();
generatePa();
console.log("Done.");
