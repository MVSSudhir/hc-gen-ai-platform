import { genaiLearningStages } from "./learning-path";
import {
  uniqueResources,
  type LearningResource,
  type LearningResourceKind,
} from "./learning-resource";

type StageId = (typeof genaiLearningStages)[number]["id"];

function resource(
  kind: LearningResourceKind,
  title: string,
  url: string,
  publisher: string,
): LearningResource {
  return { kind, title, url, publisher };
}

const karpathyIntro = resource(
  "video",
  "[1hr Talk] Intro to Large Language Models",
  "https://www.youtube.com/watch?v=zjkBMFhNj_g",
  "Andrej Karpathy",
);
const karpathyGpt = resource(
  "video",
  "Let's build GPT: from scratch, in code, spelled out",
  "https://www.youtube.com/watch?v=kCc8FmEb1nY",
  "Andrej Karpathy",
);
const karpathyTokenizer = resource(
  "video",
  "Let's build the GPT Tokenizer",
  "https://www.youtube.com/watch?v=zduSFxRajkE",
  "Andrej Karpathy",
);
const threeb1bTransformers = resource(
  "video",
  "Transformers, the tech behind LLMs",
  "https://www.youtube.com/watch?v=wjZofJX0v4M",
  "3Blue1Brown",
);
const threeb1bAttention = resource(
  "video",
  "Attention in transformers, visually explained",
  "https://www.youtube.com/watch?v=eMlx5fFNoYc",
  "3Blue1Brown",
);
const mcpWorkshop = resource(
  "video",
  "Building Agents with Model Context Protocol",
  "https://www.youtube.com/watch?v=kQmXtrmQ5Zg",
  "Anthropic",
);

const attentionPaper = resource(
  "paper",
  "Attention Is All You Need",
  "https://arxiv.org/abs/1706.03762",
  "Vaswani et al.",
);
const gpt3Paper = resource(
  "paper",
  "Language Models are Few-Shot Learners",
  "https://arxiv.org/abs/2005.14165",
  "Brown et al.",
);
const cotPaper = resource(
  "paper",
  "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
  "https://arxiv.org/abs/2201.11903",
  "Wei et al.",
);
const scalingLawsPaper = resource(
  "paper",
  "Scaling Laws for Neural Language Models",
  "https://arxiv.org/abs/2001.08361",
  "Kaplan et al.",
);
const lostInMiddlePaper = resource(
  "paper",
  "Lost in the Middle: How Language Models Use Long Contexts",
  "https://arxiv.org/abs/2307.03172",
  "Liu et al.",
);
const ragPaper = resource(
  "paper",
  "Retrieval-Augmented Generation for Knowledge-Intensive NLP",
  "https://arxiv.org/abs/2005.11401",
  "Lewis et al.",
);
const hydePaper = resource(
  "paper",
  "Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE)",
  "https://arxiv.org/abs/2212.10496",
  "Gao et al.",
);
const colbertPaper = resource(
  "paper",
  "ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction",
  "https://arxiv.org/abs/2004.12832",
  "Khattab & Zaharia",
);
const gevalPaper = resource(
  "paper",
  "G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment",
  "https://arxiv.org/abs/2303.16634",
  "Liu et al.",
);
const reactPaper = resource(
  "paper",
  "ReAct: Synergizing Reasoning and Acting in Language Models",
  "https://arxiv.org/abs/2210.03629",
  "Yao et al.",
);
const graphragPaper = resource(
  "paper",
  "From Local to Global: A Graph RAG Approach to Query-Focused Summarization",
  "https://arxiv.org/abs/2404.16130",
  "Microsoft Research",
);

const openaiPrompting = resource(
  "docs",
  "Prompt engineering",
  "https://platform.openai.com/docs/guides/prompt-engineering",
  "OpenAI",
);
const openaiTokenizer = resource(
  "docs",
  "Tokenizer",
  "https://platform.openai.com/tokenizer",
  "OpenAI",
);
const openaiEmbeddings = resource(
  "docs",
  "Embeddings guide",
  "https://platform.openai.com/docs/guides/embeddings",
  "OpenAI",
);
const openaiStructured = resource(
  "docs",
  "Structured outputs",
  "https://platform.openai.com/docs/guides/structured-outputs",
  "OpenAI",
);
const openaiFineTune = resource(
  "docs",
  "Fine-tuning",
  "https://platform.openai.com/docs/guides/fine-tuning",
  "OpenAI",
);
const openaiTools = resource(
  "docs",
  "Function calling",
  "https://platform.openai.com/docs/guides/function-calling",
  "OpenAI",
);
const openaiCaching = resource(
  "docs",
  "Prompt caching",
  "https://platform.openai.com/docs/guides/prompt-caching",
  "OpenAI",
);
const openaiVision = resource(
  "docs",
  "Images and vision",
  "https://platform.openai.com/docs/guides/vision",
  "OpenAI",
);
const openaiSpeech = resource(
  "docs",
  "Speech to text",
  "https://platform.openai.com/docs/guides/speech-to-text",
  "OpenAI",
);
const anthropicPrompting = resource(
  "docs",
  "Prompt engineering overview",
  "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
  "Anthropic",
);
const anthropicCaching = resource(
  "docs",
  "Prompt caching",
  "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
  "Anthropic",
);
const anthropicAgents = resource(
  "article",
  "Building effective agents",
  "https://www.anthropic.com/engineering/building-effective-agents",
  "Anthropic",
);
const anthropicMultiAgent = resource(
  "article",
  "How we built our multi-agent research system",
  "https://www.anthropic.com/engineering/multi-agent-research-system",
  "Anthropic",
);
const anthropicContextual = resource(
  "article",
  "Contextual retrieval",
  "https://www.anthropic.com/news/contextual-retrieval",
  "Anthropic",
);
const mcpDocs = resource(
  "docs",
  "Model Context Protocol",
  "https://modelcontextprotocol.io/docs/getting-started/intro",
  "MCP",
);
const dspyDocs = resource(
  "docs",
  "DSPy: programming—not prompting—LMs",
  "https://dspy.ai/",
  "Stanford NLP",
);
const llamaindexRag = resource(
  "docs",
  "Understanding RAG",
  "https://docs.llamaindex.ai/en/stable/understanding/rag/",
  "LlamaIndex",
);
const langchainRag = resource(
  "docs",
  "RAG concepts",
  "https://python.langchain.com/docs/concepts/rag/",
  "LangChain",
);
const langgraphDocs = resource(
  "docs",
  "LangGraph",
  "https://langchain-ai.github.io/langgraph/",
  "LangChain",
);
const crewaiDocs = resource(
  "docs",
  "CrewAI documentation",
  "https://docs.crewai.com/en/introduction",
  "CrewAI",
);
const autogenDocs = resource(
  "docs",
  "AutoGen",
  "https://microsoft.github.io/autogen/stable/",
  "Microsoft",
);
const ragasDocs = resource(
  "docs",
  "RAGAS",
  "https://docs.ragas.io/",
  "Exploding Gradients",
);
const pineconeHybrid = resource(
  "docs",
  "Hybrid search",
  "https://docs.pinecone.io/guides/search/hybrid-search",
  "Pinecone",
);
const pineconeEmbeddings = resource(
  "docs",
  "Understanding embeddings",
  "https://www.pinecone.io/learn/vector-embeddings/",
  "Pinecone",
);
const jinaLateChunking = resource(
  "article",
  "Late chunking in long-context embedding models",
  "https://jina.ai/news/late-chunking-in-long-context-embedding-models/",
  "Jina AI",
);
const graphragDocs = resource(
  "docs",
  "GraphRAG",
  "https://microsoft.github.io/graphrag/",
  "Microsoft",
);
const nemoDocs = resource(
  "docs",
  "NeMo Guardrails",
  "https://docs.nvidia.com/nemo/guardrails/latest/index.html",
  "NVIDIA",
);
const llamaGuard = resource(
  "docs",
  "Llama Guard 3",
  "https://huggingface.co/meta-llama/Llama-Guard-3-8B",
  "Meta",
);
const owaspLlm = resource(
  "docs",
  "OWASP Top 10 for LLM Applications",
  "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
  "OWASP",
);
const nistRmf = resource(
  "docs",
  "AI Risk Management Framework",
  "https://www.nist.gov/itl/ai-risk-management-framework",
  "NIST",
);
const hfTokenizers = resource(
  "docs",
  "Tokenizer summary",
  "https://huggingface.co/docs/transformers/en/tokenizer_summary",
  "Hugging Face",
);
const cohereRerank = resource(
  "docs",
  "Rerank",
  "https://docs.cohere.com/docs/reranking",
  "Cohere",
);
const litellmRouter = resource(
  "docs",
  "Router / load balancing",
  "https://docs.litellm.ai/docs/simple_router",
  "LiteLLM",
);
const langsmith = resource(
  "docs",
  "LangSmith observability",
  "https://docs.smith.langchain.com/",
  "LangChain",
);
const llamaindexChunking = resource(
  "docs",
  "Node parsers / chunking",
  "https://docs.llamaindex.ai/en/stable/module_guides/loading/node_parsers/",
  "LlamaIndex",
);
const llamaindexQuery = resource(
  "docs",
  "Query transformations",
  "https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/",
  "LlamaIndex",
);

const stageResources = {
  foundations: [
    karpathyIntro,
    openaiPrompting,
    anthropicPrompting,
    gpt3Paper,
  ],
  "models-tokens": [karpathyTokenizer, openaiTokenizer, hfTokenizers],
  transformers: [
    threeb1bTransformers,
    threeb1bAttention,
    karpathyGpt,
    attentionPaper,
  ],
  context: [anthropicCaching, openaiCaching, anthropicContextual, lostInMiddlePaper],
  optimization: [dspyDocs, karpathyIntro],
  embeddings: [openaiEmbeddings, pineconeEmbeddings],
  retrieval: [pineconeHybrid, cohereRerank, colbertPaper, hydePaper],
  rag: [ragPaper, llamaindexRag, langchainRag, anthropicContextual],
  agents: [anthropicAgents, reactPaper, langgraphDocs, anthropicMultiAgent],
  "tool-calling": [mcpWorkshop, mcpDocs, openaiTools],
  evaluation: [ragasDocs, gevalPaper, langsmith],
  guardrails: [owaspLlm, nemoDocs, llamaGuard],
  multimodal: [openaiVision, openaiSpeech],
  enterprise: [nistRmf, anthropicAgents, openaiCaching, litellmRouter],
} satisfies Record<StageId, LearningResource[]>;

const topicResources: Record<string, LearningResource[]> = {
  "what-is-genai": [karpathyIntro, openaiPrompting],
  llm: [karpathyIntro, anthropicAgents],
  "parametric-memory-limits": [karpathyIntro, ragPaper],
  prompting: [openaiPrompting, anthropicPrompting],
  "system-prompts": [anthropicPrompting, openaiPrompting],
  "zero-shot-and-few-shot": [gpt3Paper, openaiPrompting],
  "chain-of-thought": [cotPaper, openaiPrompting],
  tokenization: [karpathyTokenizer, hfTokenizers],
  "tokens-and-cost": [openaiTokenizer, karpathyTokenizer],
  "semantic-density": [karpathyTokenizer, openaiTokenizer],
  "model-families": [karpathyIntro, karpathyGpt],
  "open-vs-closed": [karpathyIntro, hfTokenizers],
  temperature: [threeb1bTransformers, openaiPrompting],
  "structured-output": [openaiStructured, openaiTools],
  "fine-tuning": [openaiFineTune, karpathyIntro],
  transformers: [threeb1bTransformers, attentionPaper],
  attention: [threeb1bAttention, attentionPaper],
  "encoder-decoder": [attentionPaper, threeb1bTransformers],
  "pretraining-vs-inference": [karpathyGpt, karpathyIntro],
  "scaling-laws": [scalingLawsPaper, karpathyIntro],
  "lost-in-the-middle": [lostInMiddlePaper, anthropicContextual],
  "context-window": [lostInMiddlePaper, openaiCaching],
  "context-engineering": [anthropicContextual, anthropicCaching],
  "long-context": [lostInMiddlePaper, anthropicContextual],
  "prompt-caching": [anthropicCaching, openaiCaching],
  "cache-miss-patterns": [openaiCaching, anthropicCaching],
  "memory-patterns": [langgraphDocs, anthropicAgents],
  "chat-history-management": [langgraphDocs, openaiCaching],
  dspy: [dspyDocs],
  "dspy-signatures": [dspyDocs],
  teleprompters: [dspyDocs],
  gepa: [dspyDocs],
  miprov2: [dspyDocs],
  "programmatic-prompting": [dspyDocs, openaiPrompting],
  embeddings: [openaiEmbeddings, pineconeEmbeddings],
  "vector-similarity": [pineconeEmbeddings, openaiEmbeddings],
  "vector-databases": [pineconeEmbeddings, pineconeHybrid],
  chunking: [llamaindexChunking, jinaLateChunking],
  "semantic-chunking": [llamaindexChunking, openaiEmbeddings],
  "late-chunking": [jinaLateChunking, llamaindexChunking],
  "structure-aware-chunking": [llamaindexChunking, anthropicContextual],
  "multimodal-embeddings": [openaiEmbeddings, openaiVision],
  "semantic-search": [pineconeEmbeddings, pineconeHybrid],
  "hybrid-search": [pineconeHybrid, cohereRerank],
  reranking: [cohereRerank, pineconeHybrid],
  colbert: [colbertPaper, pineconeHybrid],
  "query-transformation": [llamaindexQuery, hydePaper],
  hyde: [hydePaper, llamaindexQuery],
  "indexing-strategies": [llamaindexRag, llamaindexChunking],
  rag: [ragPaper, llamaindexRag],
  "rag-architecture": [langchainRag, llamaindexRag],
  "citation-and-grounding": [ragPaper, anthropicContextual],
  "rag-evaluation": [ragasDocs, gevalPaper],
  ragas: [ragasDocs, gevalPaper],
  "advanced-rag": [llamaindexRag, langchainRag],
  refrag: [llamaindexRag, ragPaper],
  graphrag: [graphragDocs, graphragPaper],
  "knowledge-bases": [llamaindexRag, anthropicContextual],
  "naive-vs-production-rag": [llamaindexRag, langchainRag],
  agents: [anthropicAgents, reactPaper],
  "planning-and-reasoning": [reactPaper, anthropicAgents],
  "human-in-the-loop": [langgraphDocs, anthropicAgents],
  "multi-agent-systems": [anthropicMultiAgent, langgraphDocs],
  langgraph: [langgraphDocs, anthropicAgents],
  crewai: [crewaiDocs, anthropicMultiAgent],
  autogen: [autogenDocs, anthropicMultiAgent],
  "agent-memory-tiers": [langgraphDocs, anthropicAgents],
  "tool-calling": [openaiTools, mcpDocs],
  "function-calling": [openaiTools, mcpWorkshop],
  "model-context-protocol": [mcpDocs, mcpWorkshop],
  evaluation: [ragasDocs, langsmith],
  hallucination: [ragPaper, ragasDocs],
  "llm-as-judge": [gevalPaper, ragasDocs],
  "g-eval": [gevalPaper, ragasDocs],
  observability: [langsmith, ragasDocs],
  "faithfulness-and-relevance": [ragasDocs, gevalPaper],
  guardrails: [nemoDocs, owaspLlm],
  "prompt-injection": [owaspLlm, karpathyIntro],
  "red-teaming": [owaspLlm, nistRmf],
  "llama-guard": [llamaGuard, nemoDocs],
  "nemo-guardrails": [nemoDocs, owaspLlm],
  "multimodal-models": [openaiVision, openaiSpeech],
  "speech-to-text": [openaiSpeech, openaiVision],
  "summarization-patterns": [openaiPrompting, openaiVision],
  "enterprise-ai-patterns": [anthropicAgents, nistRmf],
  "privacy-and-data": [nistRmf, owaspLlm],
  "model-routing": [litellmRouter, openaiCaching],
  "cost-optimization": [openaiCaching, anthropicCaching],
  "ai-governance": [nistRmf, owaspLlm],
  "responsible-ai": [nistRmf, owaspLlm],
};

export function resourcesForStage(stageId: string): LearningResource[] {
  return stageResources[stageId as StageId] ?? [];
}

/** Topic-specific picks, then the parent stage list — de-duplicated. */
export function resourcesForTopic(
  slug: string,
  stageId?: string,
): LearningResource[] {
  const specific = topicResources[slug] ?? [];
  const inherited = stageId ? resourcesForStage(stageId) : [];
  return uniqueResources([...specific, ...inherited]).slice(0, 5);
}

/** Resources unique to the topic — used as compact links on the learning path. */
export function topicOnlyResources(slug: string): LearningResource[] {
  return topicResources[slug] ?? [];
}

export function missingTopicResourceSlugs(slugs: string[]): string[] {
  return slugs.filter((slug) => !topicResources[slug]?.length);
}
