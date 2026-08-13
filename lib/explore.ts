/** Homepage "explore by problem" links — kept here so validation can check them. */
export const exploreByProblem = [
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
] as const;
