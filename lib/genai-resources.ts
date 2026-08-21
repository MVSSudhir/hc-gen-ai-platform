import {
  MAX_TOPIC_RESOURCES,
  MIN_TOPIC_RESOURCES,
  type LearningResource,
  type LearningResourceKind,
  type ResourceRef,
} from "./learning-resource";

function resource(
  kind: LearningResourceKind,
  title: string,
  url: string,
  publisher: string,
): ResourceRef {
  return { kind, title, url, publisher };
}

function cite(
  base: ResourceRef,
  why: string,
  covers: string[],
): LearningResource {
  return { ...base, why, covers };
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
const awsAiPractitioner = resource(
  "docs",
  "AWS Certified AI Practitioner",
  "https://aws.amazon.com/certification/certified-ai-practitioner/",
  "AWS",
);
const azureAiEngineer = resource(
  "docs",
  "Azure AI Engineer Associate",
  "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/",
  "Microsoft",
);
const azureAiStudyGuide = resource(
  "docs",
  "Exam study guide",
  "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102",
  "Microsoft",
);
const googleGenaiLeader = resource(
  "docs",
  "Generative AI Leader certification",
  "https://cloud.google.com/learn/certification/generative-ai-leader",
  "Google Cloud",
);
const databricksGenai = resource(
  "docs",
  "Databricks Certified Generative AI Engineer Associate",
  "https://www.databricks.com/learn/certification/genai-engineer-associate",
  "Databricks",
);
const nvidiaNcaGenl = resource(
  "docs",
  "NVIDIA-Certified Associate: Generative AI LLMs",
  "https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-associate/",
  "NVIDIA",
);

const topicResources: Record<string, LearningResource[]> = {
  "what-is-genai": [
    cite(karpathyIntro, "Best single-hour picture of what an LLM is, what it is not, and why fluency is not knowledge.", ["foundation models", "generation vs prediction", "tools", "security"]),
    cite(openaiPrompting, "Vendor primer on instructing models once you accept they generate rather than look up facts.", ["prompting", "task specification"]),
  ],
  llm: [
    cite(karpathyIntro, "Frames the model as a reasoning engine with files of weights—not a company database.", ["inference", "parametric memory", "tools"]),
    cite(anthropicAgents, "Shows how production systems put the model in a loop with retrieval and tools instead of asking it to remember.", ["composability", "external memory"]),
  ],
  "parametric-memory-limits": [
    cite(karpathyIntro, "Explains hallucinations as a consequence of compressed training memory, which this concept names explicitly.", ["training cutoff", "hallucination", "weights"]),
    cite(ragPaper, "Original RAG paper: non-parametric memory as the complement to frozen weights.", ["retrieval", "non-parametric memory"]),
  ],
  prompting: [
    cite(openaiPrompting, "Practical control surface: roles, constraints, and iteration before you reach for agents.", ["task specification", "constraints", "format control"]),
    cite(anthropicPrompting, "Complementary prompting patterns with a stronger emphasis on XML structure and evaluation.", ["iteration", "constraints"]),
  ],
  "system-prompts": [
    cite(anthropicPrompting, "Treats the system turn as durable policy, which is the point of this concept.", ["system role", "constraints", "policy"]),
    cite(openaiPrompting, "Shows how instructions sit above user messages in the request.", ["roles", "format control"]),
  ],
  "zero-shot-and-few-shot": [
    cite(gpt3Paper, "Defines in-context learning: the paper this concept is named after.", ["few-shot", "in-context learning", "GPT-3"]),
    cite(openaiPrompting, "How to place examples in a prompt without turning them into fine-tuning.", ["demonstrations", "task specification"]),
  ],
  "chain-of-thought": [
    cite(cotPaper, "The method paper for eliciting intermediate reasoning in the prompt.", ["chain-of-thought", "reasoning traces"]),
    cite(openaiPrompting, "How to ask for steps without pretending traces are guaranteed truth.", ["prompting", "reasoning"]),
  ],
  tokenization: [
    cite(karpathyTokenizer, "Builds a BPE tokenizer from scratch so token weirdness stops being magical.", ["BPE", "encode/decode", "vocabulary"]),
    cite(hfTokenizers, "Reference for how production tokenizer pipelines actually run.", ["subwords", "special tokens"]),
  ],
  "tokens-and-cost": [
    cite(openaiTokenizer, "See how your text splits into billed tokens before you argue about cost.", ["token counts", "pricing"]),
    cite(karpathyTokenizer, "Why token boundaries, not characters, drive both cost and model behavior.", ["BPE", "semantic density"]),
  ],
  "semantic-density": [
    cite(karpathyTokenizer, "Shows how tokenization wastes or concentrates meaning per token.", ["compression", "BPE", "context budget"]),
    cite(openaiTokenizer, "Compare two phrasings by token count, not word count.", ["token counts"]),
  ],
  "model-families": [
    cite(karpathyIntro, "Open vs closed, size, and what “a Llama file” means in practice.", ["open weights", "model series"]),
    cite(karpathyGpt, "How a GPT-style family is actually trained and sampled.", ["pretraining", "architecture"]),
  ],
  "open-vs-closed": [
    cite(karpathyIntro, "Two-files vs API: the operational difference this concept is about.", ["open weights", "APIs", "control"]),
    cite(hfTokenizers, "Open tooling you actually run when you self-host.", ["open ecosystem"]),
  ],
  temperature: [
    cite(threeb1bTransformers, "Softmax-with-temperature is visualized here—the same knob APIs expose.", ["softmax", "sampling"]),
    cite(openaiPrompting, "When to change temperature versus changing the prompt or constraints.", ["sampling", "determinism"]),
  ],
  "structured-output": [
    cite(openaiStructured, "Canonical API for JSON-schema constrained generation.", ["JSON schema", "constrained decoding"]),
    cite(openaiTools, "Tool schemas are the same idea applied to actions.", ["function schemas"]),
  ],
  "fine-tuning": [
    cite(openaiFineTune, "When fine-tuning changes behavior versus when you still need retrieval.", ["supervised fine-tuning", "behavior vs facts"]),
    cite(karpathyIntro, "Reminder that fine-tuning does not fix parametric memory of new facts.", ["weights", "hallucination"]),
  ],
  transformers: [
    cite(threeb1bTransformers, "Visual map of embeddings, unembedding, and why transformers predict next tokens.", ["embeddings", "softmax", "GPT"]),
    cite(attentionPaper, "The architecture paper this whole stage rests on.", ["self-attention", "encoder-decoder"]),
  ],
  attention: [
    cite(threeb1bAttention, "Step-by-step keys, queries, and values without drowning in notation.", ["QKV", "multi-head attention"]),
    cite(attentionPaper, "Original multi-head attention definition.", ["self-attention", "scaled dot-product"]),
  ],
  "encoder-decoder": [
    cite(attentionPaper, "The encoder–decoder transformer as originally specified.", ["encoder", "decoder", "cross-attention"]),
    cite(threeb1bTransformers, "How decoder-only GPT differs from the original translation setup.", ["decoder-only", "next-token"]),
  ],
  "pretraining-vs-inference": [
    cite(karpathyGpt, "You train once, then sample—this video is that loop in code.", ["pretraining", "inference", "sampling"]),
    cite(karpathyIntro, "What lives in the weights versus what you supply at inference.", ["weights", "context"]),
  ],
  "scaling-laws": [
    cite(scalingLawsPaper, "The empirical laws relating compute, data, and loss.", ["compute", "data", "loss"]),
    cite(karpathyIntro, "Intuition for why bigger models and more data still win—until they do not for your facts.", ["scale", "capabilities"]),
  ],
  "lost-in-the-middle": [
    cite(lostInMiddlePaper, "The measurement paper: models underuse the middle of long context.", ["position bias", "long context"]),
    cite(anthropicContextual, "A production response: how you pack context so retrieval is usable.", ["context packing", "retrieval"]),
  ],
  "context-window": [
    cite(lostInMiddlePaper, "A larger window is not uniform attention—this paper is why.", ["context length", "attention over positions"]),
    cite(openaiCaching, "How providers treat prefixes inside a window for cost.", ["prefix", "tokens"]),
  ],
  "context-engineering": [
    cite(anthropicContextual, "How to assemble evidence so the window contains the right bits.", ["chunk context", "retrieval"]),
    cite(anthropicCaching, "Stable prefixes as an engineering lever, not a prompt trick.", ["static prefix", "cache"]),
  ],
  "long-context": [
    cite(lostInMiddlePaper, "Evidence that long context still needs structure, not dumping.", ["long context", "needle-in-haystack"]),
    cite(anthropicContextual, "Techniques that make long documents usable at query time.", ["contextual retrieval"]),
  ],
  "prompt-caching": [
    cite(anthropicCaching, "How prefix caching works and what must stay byte-stable.", ["cache prefix", "TTL", "cost"]),
    cite(openaiCaching, "The OpenAI-side mechanics of the same idea.", ["automatic caching", "input tokens"]),
  ],
  "cache-miss-patterns": [
    cite(openaiCaching, "What invalidates a cache hit—reorder, timestamp, or a wandering system prompt.", ["cache miss", "prefix stability"]),
    cite(anthropicCaching, "Explicit breakpoints and why a one-token change is expensive.", ["breakpoints", "static vs dynamic"]),
  ],
  "memory-patterns": [
    cite(langgraphDocs, "Stateful graphs are how durable memory is implemented in product systems.", ["state", "checkpoints", "threads"]),
    cite(anthropicAgents, "When memory should be files and retrieval, not a longer prompt.", ["working memory", "external memory"]),
  ],
  "chat-history-management": [
    cite(langgraphDocs, "Thread state and what you persist between turns.", ["thread", "checkpoint", "messages"]),
    cite(openaiCaching, "Keep the stable prefix cached while history grows after it.", ["prefix", "conversation"]),
  ],
  dspy: [
    cite(dspyDocs, "The home page for programming LMs with signatures and optimizers.", ["signatures", "modules", "optimizers"]),
  ],
  "dspy-signatures": [
    cite(dspyDocs, "Signatures are the unit of work in DSPy—start here, not with a prompt string.", ["typed signatures", "inputs/outputs"]),
  ],
  teleprompters: [
    cite(dspyDocs, "Optimizers (teleprompters) compile programs against a metric.", ["optimizers", "metrics", "demonstrations"]),
  ],
  gepa: [
    cite(dspyDocs, "Current DSPy optimizer docs—use this rather than a stale blog for GEPA.", ["GEPA", "optimization"]),
  ],
  miprov2: [
    cite(dspyDocs, "MIPROv2 lives in the same optimizer family; read the current API, not a screenshot.", ["MIPRO", "instruction proposal"]),
  ],
  "programmatic-prompting": [
    cite(dspyDocs, "The alternative to hand-tuned adjectives: programs with metrics.", ["signatures", "compile", "metrics"]),
    cite(openaiPrompting, "What you are replacing when you stop editing prompt text by taste.", ["prompt strings"]),
  ],
  embeddings: [
    cite(openaiEmbeddings, "How to obtain vectors and what similarity is allowed to mean.", ["embedding models", "vector space"]),
    cite(pineconeEmbeddings, "Geometric intuition for why nearest neighbors retrieve meaning.", ["similarity", "dimensions"]),
  ],
  "vector-similarity": [
    cite(pineconeEmbeddings, "Cosine vs dot product in language you can explain to a stakeholder.", ["cosine", "dot product", "nearest neighbor"]),
    cite(openaiEmbeddings, "Which distance the API’s embeddings are designed for.", ["normalization", "similarity"]),
  ],
  "vector-databases": [
    cite(pineconeEmbeddings, "Why you store vectors at all, before product names.", ["ANN", "indexes"]),
    cite(pineconeHybrid, "How a vector store participates in hybrid retrieval.", ["metadata filters", "sparse + dense"]),
  ],
  chunking: [
    cite(llamaindexChunking, "Node parsers: the practical chunking layer this concept describes.", ["chunk size", "overlap", "nodes"]),
    cite(jinaLateChunking, "When you should not chunk first—contrast for this concept.", ["late chunking"]),
  ],
  "semantic-chunking": [
    cite(llamaindexChunking, "Semantic splitters sit in this module family.", ["semantic splits", "breakpoints"]),
    cite(openaiEmbeddings, "Embeddings are what “semantic” means in the splitter.", ["similarity"]),
  ],
  "late-chunking": [
    cite(jinaLateChunking, "The method write-up: embed long context, then pool chunk spans.", ["late chunking", "long-context embeddings"]),
    cite(llamaindexChunking, "Contrast with early node parsing so you know what you are not doing.", ["early chunking"]),
  ],
  "structure-aware-chunking": [
    cite(llamaindexChunking, "Headings, code, and tables as first-class split points.", ["document structure", "node parsers"]),
    cite(anthropicContextual, "Why structure in the chunk beats a raw 512-token window.", ["contextual retrieval"]),
  ],
  "multimodal-embeddings": [
    cite(openaiEmbeddings, "Where text embeddings stop and joint spaces begin.", ["embedding space"]),
    cite(openaiVision, "Images as first-class inputs that must land in a comparable space.", ["vision", "cross-modal"]),
  ],
  "semantic-search": [
    cite(pineconeEmbeddings, "The retrieval primitive under every “search by meaning” feature.", ["dense retrieval", "kNN"]),
    cite(pineconeHybrid, "When meaning-only search fails on SKUs and IDs.", ["lexical gap"]),
  ],
  "hybrid-search": [
    cite(pineconeHybrid, "Dense + sparse in one query path—the pattern this concept names.", ["BM25", "dense vectors", "fusion"]),
    cite(cohereRerank, "What you do after hybrid recall to get precision.", ["reranking"]),
  ],
  "reranking": [
    cite(cohereRerank, "Cross-encoder rerank as a second stage after cheap retrieval.", ["cross-encoder", "top-k"]),
    cite(pineconeHybrid, "What you are reranking: the hybrid candidate set.", ["recall then precision"]),
  ],
  colbert: [
    cite(colbertPaper, "Late interaction: the paper this concept is.", ["late interaction", "token-level similarity"]),
    cite(pineconeHybrid, "How ColBERT-style ranking sits next to hybrid lexical+dense stacks.", ["reranking", "indexes"]),
  ],
  "query-transformation": [
    cite(llamaindexQuery, "Rewrite, expand, and route queries before retrieval.", ["multi-query", "HyDE", "routing"]),
    cite(hydePaper, "One important transform: search with a hypothetical document.", ["hypothetical document"]),
  ],
  hyde: [
    cite(hydePaper, "The HyDE method paper.", ["zero-shot dense retrieval", "hypothetical embeddings"]),
    cite(llamaindexQuery, "Where HyDE sits among other query transforms.", ["query transformation"]),
  ],
  "indexing-strategies": [
    cite(llamaindexRag, "Indexing is half of RAG; this is the production-shaped overview.", ["indexes", "ingestion"]),
    cite(llamaindexChunking, "Chunking choices that make an index usable or noisy.", ["nodes", "chunking"]),
  ],
  rag: [
    cite(ragPaper, "The original retrieve-then-generate formulation.", ["retrieve", "generate", "grounding"]),
    cite(llamaindexRag, "How teams assemble RAG as a product, not a demo.", ["pipeline", "evaluation"]),
  ],
  "rag-architecture": [
    cite(langchainRag, "Modular RAG pieces: ingest, retrieve, generate, observe.", ["chains", "retrievers"]),
    cite(llamaindexRag, "Index and query interfaces that become your architecture.", ["query engine"]),
  ],
  "citation-and-grounding": [
    cite(ragPaper, "Grounding is why RAG exists; citations are the audit trail.", ["evidence", "generation"]),
    cite(anthropicContextual, "How to keep retrieved spans attributable in the prompt.", ["citations", "context"]),
  ],
  "rag-evaluation": [
    cite(ragasDocs, "The metric suite teams actually run on RAG.", ["faithfulness", "context precision"]),
    cite(gevalPaper, "LLM-as-judge protocol you will meet in eval design.", ["G-Eval", "rubrics"]),
  ],
  ragas: [
    cite(ragasDocs, "Primary documentation for RAGAS metrics and datasets.", ["faithfulness", "answer relevancy", "context recall"]),
    cite(gevalPaper, "Related judge-based scoring when you leave the RAGAS defaults.", ["LLM-as-judge"]),
  ],
  "advanced-rag": [
    cite(llamaindexRag, "Production RAG beyond naive retrieve-once.", ["rerank", "transforms", "agents"]),
    cite(langchainRag, "Query routing, compression, and iterative retrieval patterns.", ["modular RAG"]),
  ],
  refrag: [
    cite(llamaindexRag, "Treat REFRAG-class ideas as production RAG composition, not a magic model.", ["compression", "retrieval loops"]),
    cite(ragPaper, "Baseline you are departing from.", ["naive RAG"]),
  ],
  graphrag: [
    cite(graphragDocs, "Microsoft’s GraphRAG pipeline and query modes.", ["community summaries", "global vs local search"]),
    cite(graphragPaper, "The research write-up behind the library.", ["knowledge graph", "query-focused summarization"]),
  ],
  "knowledge-bases": [
    cite(llamaindexRag, "A knowledge base is an operated index with freshness and permissions.", ["ingestion", "ACL"]),
    cite(anthropicContextual, "How chunks should carry enough context to be reusable knowledge.", ["contextual retrieval"]),
  ],
  "naive-vs-production-rag": [
    cite(llamaindexRag, "Checklists that separate a demo from a system with evals and fallbacks.", ["hybrid search", "eval gates"]),
    cite(langchainRag, "Failure modes of retrieve-once-and-stuff.", ["naive RAG"]),
  ],
  agents: [
    cite(anthropicAgents, "The practical essay: workflows first, agents when the loop is justified.", ["tool use", "orchestration"]),
    cite(reactPaper, "Reason-then-act: the loop most agent frameworks still implement.", ["ReAct", "observations"]),
  ],
  "planning-and-reasoning": [
    cite(reactPaper, "Interleaving thoughts and actions instead of a single plan dump.", ["ReAct", "planning"]),
    cite(anthropicAgents, "When a workflow with explicit steps beats an open-ended planner.", ["workflows vs agents"]),
  ],
  "human-in-the-loop": [
    cite(langgraphDocs, "Interrupt, review, and resume as first-class graph nodes.", ["interrupts", "approval"]),
    cite(anthropicAgents, "Where humans should sit in an otherwise autonomous loop.", ["oversight"]),
  ],
  "multi-agent-systems": [
    cite(anthropicMultiAgent, "A real multi-agent research system and its coordination costs.", ["subagents", "orchestration"]),
    cite(langgraphDocs, "How to encode multiple actors as a graph rather than a chat pile.", ["state graph"]),
  ],
  langgraph: [
    cite(langgraphDocs, "Primary docs for stateful agent graphs.", ["StateGraph", "nodes", "checkpoints"]),
    cite(anthropicAgents, "Design principles to keep a LangGraph from becoming a maze.", ["simplicity", "tool use"]),
  ],
  crewai: [
    cite(crewaiDocs, "Official CrewAI model of roles, tasks, and crews.", ["agents", "tasks", "crews"]),
    cite(anthropicMultiAgent, "Skeptical companion: multi-agent cost and failure modes.", ["coordination"]),
  ],
  autogen: [
    cite(autogenDocs, "Microsoft AutoGen’s conversational multi-agent patterns.", ["AgentChat", "group chat"]),
    cite(anthropicMultiAgent, "When many talkers need a supervisor and a budget.", ["orchestration"]),
  ],
  "agent-memory-tiers": [
    cite(langgraphDocs, "Working state vs persisted checkpoints vs retrieved long-term memory.", ["checkpoint", "store"]),
    cite(anthropicAgents, "Which memories should be files and search, not more tokens in the prompt.", ["memory tiers"]),
  ],
  "tool-calling": [
    cite(openaiTools, "The function-calling contract most providers now share.", ["tools", "JSON arguments"]),
    cite(mcpDocs, "When tools should be a protocol instead of one SDK.", ["MCP", "servers"]),
  ],
  "function-calling": [
    cite(openaiTools, "Schemas, parallel calls, and the model-as-router pattern.", ["functions", "tool choice"]),
    cite(mcpWorkshop, "Workshop view of tools as an ecosystem, not a single API.", ["MCP", "tool discovery"]),
  ],
  "model-context-protocol": [
    cite(mcpDocs, "Canonical MCP intro: hosts, clients, servers, tools vs resources.", ["host", "client", "server"]),
    cite(mcpWorkshop, "Long-form walkthrough of building with MCP.", ["servers", "registry", "auth"]),
  ],
  evaluation: [
    cite(ragasDocs, "A concrete eval stack you can run, not a vibe check.", ["metrics", "test sets"]),
    cite(langsmith, "Observability that makes eval failures inspectable.", ["traces", "datasets"]),
  ],
  hallucination: [
    cite(ragPaper, "Grounding as the architectural answer to fluent invention.", ["grounding", "retrieval"]),
    cite(ragasDocs, "Faithfulness metrics that quantify hallucination on your corpus.", ["faithfulness"]),
  ],
  "llm-as-judge": [
    cite(gevalPaper, "The G-Eval protocol for rubric-based LLM judges.", ["form-filling", "chain-of-thought judge"]),
    cite(ragasDocs, "Where judge metrics show up in a RAG eval harness.", ["answer quality"]),
  ],
  "g-eval": [
    cite(gevalPaper, "Read the method, then copy the rubric structure—not a random prompt.", ["G-Eval", "NL evaluation"]),
    cite(ragasDocs, "Implementations and related metrics in an eval library.", ["LLM-as-judge"]),
  ],
  observability: [
    cite(langsmith, "Traces, datasets, and production debugging for LLM apps.", ["traces", "feedback"]),
    cite(ragasDocs, "Offline metrics you should log next to traces.", ["evaluation"]),
  ],
  "faithfulness-and-relevance": [
    cite(ragasDocs, "Definitions of faithfulness vs relevancy on retrieved context.", ["faithfulness", "answer relevancy", "context precision"]),
    cite(gevalPaper, "Rubric scoring when a single metric is not enough.", ["criteria"]),
  ],
  guardrails: [
    cite(nemoDocs, "Programmable rails as runtime policy, not a prompt please.", ["Colang", "rails"]),
    cite(owaspLlm, "The attack catalog your rails must actually cover.", ["LLM01", "prompt injection"]),
  ],
  "prompt-injection": [
    cite(owaspLlm, "The canonical risk listing; start with LLM01.", ["prompt injection", "jailbreaks"]),
    cite(karpathyIntro, "Security section: models executing tools are a new OS attack surface.", ["tools", "security"]),
  ],
  "red-teaming": [
    cite(owaspLlm, "What to probe: injections, data leaks, unsafe actions.", ["threats", "LLM top 10"]),
    cite(nistRmf, "How red team findings enter a governance loop.", ["risk", "measure"]),
  ],
  "llama-guard": [
    cite(llamaGuard, "Model card and intended use for Llama Guard as a safety classifier.", ["content safety", "categories"]),
    cite(nemoDocs, "How a guard model is wired as a rail, not a chatbot.", ["moderation"]),
  ],
  "nemo-guardrails": [
    cite(nemoDocs, "Primary NeMo Guardrails documentation.", ["Colang", "dialog rails", "recovery"]),
    cite(owaspLlm, "The failures the rails are supposed to catch.", ["injection", "insecure output"]),
  ],
  "multimodal-models": [
    cite(openaiVision, "Images as first-class model inputs in a production API.", ["vision", "image understanding"]),
    cite(openaiSpeech, "Audio as another modality in the same product family.", ["speech"]),
  ],
  "speech-to-text": [
    cite(openaiSpeech, "ASR as a pipeline stage with latency and privacy constraints.", ["transcription", "streaming"]),
    cite(openaiVision, "How speech sits next to other non-text inputs in multimodal systems.", ["multimodal"]),
  ],
  "summarization-patterns": [
    cite(openaiPrompting, "Map-reduce and structured summaries start as prompt/program design.", ["map-reduce", "structured output"]),
    cite(openaiVision, "When the source is a document image or slide, not a clean text file.", ["documents"]),
  ],
  "enterprise-ai-patterns": [
    cite(anthropicAgents, "Paved-road agent/workflow design that a platform team can support.", ["workflows", "tooling"]),
    cite(nistRmf, "How those patterns map to risk management, not only architecture diagrams.", ["govern", "map", "measure"]),
  ],
  "privacy-and-data": [
    cite(nistRmf, "Privacy and data as AI risk functions, not an afterthought policy PDF.", ["data governance", "trustworthiness"]),
    cite(owaspLlm, "Concrete leak and poisoning paths in LLM apps.", ["sensitive info disclosure", "supply chain"]),
  ],
  "model-routing": [
    cite(litellmRouter, "A working router: fallbacks, load balance, and spend controls.", ["routing", "fallbacks"]),
    cite(openaiCaching, "Cache-friendly prefixes interact with which model you route to.", ["cost", "prefix"]),
  ],
  "cost-optimization": [
    cite(openaiCaching, "The highest-leverage cost control for stable system prompts.", ["cache hits", "input tokens"]),
    cite(anthropicCaching, "Explicit cache control when the prefix is large and stable.", ["prompt caching"]),
  ],
  "ai-governance": [
    cite(nistRmf, "The framework most enterprise AI policies now cite.", ["govern", "map", "measure", "manage"]),
    cite(owaspLlm, "Technical risks the board pack should name in engineer language.", ["LLM threats"]),
  ],
  "responsible-ai": [
    cite(nistRmf, "Turns fairness, transparency, and accountability into a process, not a poster.", ["trustworthy AI", "characteristics"]),
    cite(owaspLlm, "Harms that responsible-AI programs must actually test for.", ["safety", "security"]),
  ],
  "choosing-genai-certifications": [
    cite(awsAiPractitioner, "Foundational AWS AI/GenAI literacy—typical first badge if your shop is on AWS.", ["practitioner", "cloud AI", "role fit"]),
    cite(azureAiEngineer, "Builder-level Azure credential to contrast with practitioner/leader exams.", ["associate", "Azure AI"]),
    cite(googleGenaiLeader, "Leader/literacy track when the job is sponsorship, not pipelines.", ["leader", "Google Cloud"]),
  ],
  "aws-certified-ai-practitioner": [
    cite(awsAiPractitioner, "Official exam page: domains, audience, and recertification.", ["AIF-C01", "AWS AI services", "responsible AI"]),
  ],
  "microsoft-azure-ai-engineer": [
    cite(azureAiEngineer, "Official certification page—skills change; start here each cycle.", ["Azure AI", "generative AI", "agents"]),
    cite(azureAiStudyGuide, "Skills outline used to plan study against this learning path.", ["exam domains"]),
  ],
  "google-cloud-genai-leader": [
    cite(googleGenaiLeader, "Official Generative AI Leader credential page.", ["Vertex AI", "business value", "responsible adoption"]),
  ],
  "databricks-genai-engineer": [
    cite(databricksGenai, "Official associate exam for RAG and serving on Databricks.", ["Vector Search", "MLflow", "Unity Catalog"]),
  ],
  "nvidia-nca-genl": [
    cite(nvidiaNcaGenl, "Official NCA-GENL page: format, validity, and intended roles.", ["NCA-GENL", "LLMs", "NVIDIA"]),
  ],
};

export function resourcesForTopic(slug: string): LearningResource[] {
  return (topicResources[slug] ?? []).slice(0, MAX_TOPIC_RESOURCES);
}

export function missingTopicResourceSlugs(slugs: string[]): string[] {
  return slugs.filter((slug) => {
    const items = topicResources[slug];
    return !items?.length;
  });
}

export function invalidTopicResourceSlugs(slugs: string[]): string[] {
  const bad: string[] = [];
  for (const slug of slugs) {
    const items = topicResources[slug] ?? [];
    if (items.length < MIN_TOPIC_RESOURCES || items.length > MAX_TOPIC_RESOURCES) {
      bad.push(`${slug} (count ${items.length})`);
      continue;
    }
    for (const item of items) {
      if (!item.why.trim() || item.covers.length < 1) {
        bad.push(`${slug} (${item.title})`);
      }
    }
  }
  return bad;
}
