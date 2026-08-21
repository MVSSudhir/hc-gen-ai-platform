/**
 * Curated GenAI learning path — aligned to applied GenAI engineering:
 * parametric limits → context & cost → programmatic prompting →
 * production RAG → agents → tools/MCP → evaluation & governance →
 * industry certifications.
 *
 * Concept-level top resources (docs, papers, YouTube) live in lib/genai-resources.ts.
 */
export const genaiLearningStages = [
  {
    id: "foundations",
    title: "Foundations",
    description:
      "Treat the LLM as a reasoning engine with frozen parametric memory — not a database of facts.",
    topics: ["foundations"] as const,
  },
  {
    id: "models-tokens",
    title: "Models & Tokens",
    description:
      "Tokens, cost and model choice — optimize for semantic density, not maximum context size.",
    topics: ["models", "tokens"] as const,
  },
  {
    id: "transformers",
    title: "Transformers & Attention",
    description:
      "Enough architecture to understand limits: attention, context cost and why recall degrades.",
    topics: ["transformers"] as const,
  },
  {
    id: "context",
    title: "Context Engineering & Caching",
    description:
      "Assemble what the model sees at inference — caching, static prefixes and avoiding silent cache misses.",
    topics: ["context"] as const,
  },
  {
    id: "optimization",
    title: "Programmatic Prompting",
    description:
      "Stop hand-tuning adjectives — declare signatures, compile programs and optimize with metrics (DSPy and beyond).",
    topics: ["optimization"] as const,
  },
  {
    id: "embeddings",
    title: "Embeddings & Representation",
    description:
      "Turn meaning into vectors so systems can compare, search and cluster by similarity.",
    topics: ["embeddings"] as const,
  },
  {
    id: "retrieval",
    title: "Retrieval & Ranking",
    description:
      "Hybrid search, reranking and query transformation — broad recall first, then precision.",
    topics: ["retrieval"] as const,
  },
  {
    id: "rag",
    title: "Production RAG",
    description:
      "From naive retrieve-and-stuff to modular pipelines: chunking, GraphRAG and grounded generation.",
    topics: ["rag"] as const,
  },
  {
    id: "agents",
    title: "Agents & Orchestration",
    description:
      "Stateful multi-agent systems — graphs, crews and conversational loops with explicit memory tiers.",
    topics: ["agents"] as const,
  },
  {
    id: "tool-calling",
    title: "Tools & MCP",
    description:
      "Connect agents to the world safely — tool calling and the Model Context Protocol as a universal interface.",
    topics: ["tool-calling"] as const,
  },
  {
    id: "evaluation",
    title: "Evaluation & Quality",
    description:
      "Probabilistic evaluation: faithfulness, retrieval metrics and LLM-as-a-judge methods like G-Eval.",
    topics: ["evaluation"] as const,
  },
  {
    id: "guardrails",
    title: "Guardrails & Safety",
    description:
      "Runtime controls — prompt injection defense, content safety models and programmable rails.",
    topics: ["guardrails"] as const,
  },
  {
    id: "multimodal",
    title: "Multimodal",
    description:
      "Beyond text — images, audio and documents as first-class inputs and outputs.",
    topics: ["multimodal"] as const,
  },
  {
    id: "enterprise",
    title: "Enterprise Patterns & Governance",
    description:
      "Ship reliably: architecture patterns, privacy, cost control and accountable AI use.",
    topics: ["enterprise-ai", "governance"] as const,
  },
  {
    id: "certifications",
    title: "Industry Certifications",
    description:
      "Vendor credentials that signal GenAI fluency — choose by role, cloud, and whether you need to use, build, or lead.",
    topics: ["certifications"] as const,
  },
] as const;
