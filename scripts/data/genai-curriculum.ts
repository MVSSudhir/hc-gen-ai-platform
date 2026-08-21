/**
 * Complete GenAI learning-path curriculum.
 * Order of stages and concepts defines the journey shown on /genai.
 */
export type GenaiSeed = {
  slug: string;
  title: string;
  tag: string; // must be one of the allowed tags below
  shortDefinition: string;
  whyItMatters: string[]; // 2-4 items
  keyIdeas: string[]; // 3-5 items
  relatedConcepts: string[]; // only slugs that exist in THIS same array
  body: string; // 80-220 words, practical, editorial tone
};

export const genaiCurriculum: GenaiSeed[] = [
  // —— Foundations ——
  {
    slug: "what-is-genai",
    title: "What Is Generative AI",
    tag: "foundations",
    shortDefinition:
      "AI systems that create new text, code, images, or audio by learning statistical patterns from large datasets instead of executing only hand-written rules.",
    whyItMatters: [
      "Separates generative systems from classical predictive ML and rules engines.",
      "Sets expectations: fluency is easy; reliability and grounding take architecture.",
      "Frames every later topic as a way to make generation useful, auditable, and safe.",
    ],
    keyIdeas: ["Generation vs prediction", "Foundation models", "Capability and risk travel together"],
    relatedConcepts: ["llm", "prompting", "hallucination"],
    body: "Generative AI produces artifacts that resemble its training distribution—drafts, summaries, code, designs. That power is not the same as knowing your business facts. Treat the model as a reasoning engine with parametric memory, then surround it with retrieval, tools, evaluation, and guardrails. The rest of this path is applied architecture: how to ground outputs, control cost, orchestrate agents, and ship systems that survive production traffic rather than demo well once. Start every project by listing what must be grounded externally versus inferred, then design observability before scaling traffic.",
  },
  {
    slug: "llm",
    title: "LLM as Reasoning Engine",
    tag: "foundations",
    shortDefinition:
      "Treat the model as a general-purpose inference layer that transforms inputs into structured decisions and language—not as a database of organizational truth.",
    whyItMatters: [
      "Prevents the common mistake of expecting parametric weights to store fresh facts.",
      "Clarifies where to add retrieval, tools, and memory outside the model.",
      "Aligns product design with how teams at Shopify and Dropbox route work in reported industry case studies.",
    ],
    keyIdeas: ["Inference not storage", "Composable stack", "External memory"],
    relatedConcepts: ["what-is-genai", "parametric-memory-limits", "rag", "tool-calling"],
    body: "An LLM excels at interpreting intent, following instructions, synthesizing evidence, and proposing plans. It does not reliably remember yesterday's ticket queue or your private policy PDF unless you provide that context at inference time. Production systems therefore split responsibilities: the model reasons over supplied evidence; vector stores, APIs, and workflow state hold facts. When you design features, ask what must be retrieved versus inferred, what must be deterministic versus probabilistic, and where a human should confirm before action. Document these boundaries in architecture diagrams so new engineers do not reintroduce \"just ask the model\" shortcuts under deadline pressure.",
  },
  {
    slug: "parametric-memory-limits",
    title: "Parametric Memory Limits",
    tag: "foundations",
    shortDefinition:
      "Knowledge compressed into model weights is static, approximate, and cannot be updated per request—unlike retrieval or tool-backed non-parametric memory.",
    whyItMatters: [
      "Explains hallucinations on niche or time-sensitive facts.",
      "Justifies RAG, knowledge bases, and agent tool layers.",
      "Sets realistic fine-tuning goals: behaviour tuning, not live fact storage.",
    ],
    keyIdeas: ["Static weights", "Training cutoff", "Non-parametric complement"],
    relatedConcepts: ["llm", "rag", "knowledge-bases", "fine-tuning"],
    body: "Everything the model 'knows' without external input was absorbed during training into billions of parameters. That memory is broad but fuzzy: it confuses similar entities, invents plausible citations, and drifts from your ground truth. Updating weights is slow and expensive; injecting documents at query time is fast and auditable. Mature teams assume parametric memory is a prior, not a source of record, and wire explicit retrieval and citation paths for anything compliance-sensitive. Run periodic audits where experts compare model answers against authoritative systems of record to quantify parametric drift on your domain vocabulary.",
  },
  {
    slug: "prompting",
    title: "Prompting",
    tag: "foundations",
    shortDefinition:
      "Structuring instructions, context, and examples so the model produces useful, controllable outputs for a specific task.",
    whyItMatters: [
      "Prompt quality often moves outcomes more than swapping model families.",
      "Clear roles, constraints, and formats reduce ambiguity and rework.",
      "Prompting is the first control surface before orchestration gets complex.",
    ],
    keyIdeas: ["Task specification", "Constraints", "Format control", "Iteration"],
    relatedConcepts: ["system-prompts", "zero-shot-and-few-shot", "chain-of-thought", "structured-output"],
    body: "A prompt is a specification, not incantation. State the role, audience, task, constraints, and desired output shape. When results fail, change one variable at a time—examples, tone, delimiters, or evidence ordering. Strong prompting is editorial judgment applied to model inputs. In production, prompts belong in version control with evaluation sets so changes are measurable, not tribal knowledge buried in a dashboard text box. Pair prompt changes with regression evals on representative failures from support logs, not only on cherry-picked success stories from the lab.",
  },
  {
    slug: "system-prompts",
    title: "System Prompts",
    tag: "foundations",
    shortDefinition:
      "Persistent instructions that define role, rules, and tone across turns, separate from the user's immediate request.",
    whyItMatters: [
      "Encodes product behaviour once instead of repeating it every message.",
      "Primary place for safety, brand, and domain constraints.",
      "Mutable system prompts are a common prompt-cache miss pattern in production.",
    ],
    keyIdeas: ["Standing rules", "Role definition", "Versioning"],
    relatedConcepts: ["prompting", "guardrails", "prompt-caching", "cache-miss-patterns"],
    body: "System prompts set the constitution of an assistant: what it may do, how it cites sources, when it escalates. Keep them specific and testable—\"refuse medical diagnosis\" beats \"be safe.\" Version system prompts like code. If you mutate the system string per tenant or per request, you may forfeit prefix-cache savings on providers that cache stable prompt prefixes. Separate stable global rules from dynamic per-user inserts when optimizing latency and cost. Review system prompts in the same release process as API schema changes, because they are behaviour contracts customers experience directly.",
  },
  {
    slug: "zero-shot-and-few-shot",
    title: "Zero-Shot and Few-Shot Learning",
    tag: "foundations",
    shortDefinition:
      "Zero-shot asks the model to perform a task with instructions alone; few-shot adds inline examples that demonstrate the desired input-output pattern.",
    whyItMatters: [
      "Examples often beat longer prose for format adherence.",
      "Few-shot is a cheap alternative to fine-tuning for narrow formats.",
      "Example selection affects bias and failure modes.",
    ],
    keyIdeas: ["Instruction-only", "In-context examples", "Pattern transfer"],
    relatedConcepts: ["prompting", "chain-of-thought", "fine-tuning", "dspy-signatures"],
    body: "Start zero-shot when the task is familiar to the model and the output schema is simple. Add few-shot examples when you need a particular JSON shape, classification boundary, or tone. Curate examples for edge cases you care about—not only happy paths. In RAG pipelines, few-shot can teach citation format or refusal behaviour without retraining weights. Watch token budget: five good examples may outperform twenty mediocre ones. Rotate examples when eval slices show bias toward particular vendors, geographies, or customer tiers represented disproportionately in demonstrations.",
  },
  {
    slug: "chain-of-thought",
    title: "Chain of Thought",
    tag: "foundations",
    shortDefinition:
      "Prompting the model to expose intermediate reasoning steps before the final answer, improving accuracy on multi-step problems.",
    whyItMatters: [
      "Improves math, logic, and planning tasks on capable models.",
      "Makes failures debuggable when reasoning is visible.",
      "Must be balanced against latency, cost, and leakage of internal reasoning.",
    ],
    keyIdeas: ["Step-by-step reasoning", "Decomposition", "Visible intermediates"],
    relatedConcepts: ["prompting", "planning-and-reasoning", "agents", "evaluation"],
    body: "Chain-of-thought asks the model to think stepwise—often triggered by phrases like \"think step by step\" or by providing exemplars that show reasoning traces. Use it when tasks require arithmetic, constraint satisfaction, or multi-hop inference. In user-facing products, you may keep reasoning in a hidden scratchpad and show only the conclusion. Pair CoT with evaluation: wrong intermediate steps reveal prompt gaps faster than wrong final answers alone. Log hidden reasoning in secure traces for internal debugging, but expose only conclusions and citations in customer-facing surfaces unless policy allows more.",
  },

  // —— Models & Tokens ——
  {
    slug: "tokenization",
    title: "Tokenization",
    tag: "tokens",
    shortDefinition:
      "The process of splitting text into subword units (tokens) that the model reads, generates, and bills against.",
    whyItMatters: [
      "Explains why similar-looking strings have different costs and context usage.",
      "Affects multilingual quality, code handling, and prompt trimming.",
      "Token boundaries shape what the model can easily memorize or copy.",
    ],
    keyIdeas: ["Subword units", "BPE and SentencePiece", "Language-dependent density"],
    relatedConcepts: ["tokens-and-cost", "semantic-density", "context-window"],
    body: "Models never see raw characters—they see token IDs. English averages roughly four characters per token, but code, URLs, and non-Latin scripts can consume far more tokens per perceived word. Tokenization explains odd behaviours: the model may struggle to spell backwards or count letters because those operations are unnatural at the token level. When engineering prompts, measure tokens, not characters, and trim aggressively near context limits. Build internal token estimators into authoring tools so support and legal teams see budget impact before pasting megabyte PDFs into chat widgets.",
  },
  {
    slug: "tokens-and-cost",
    title: "Tokens and Cost",
    tag: "tokens",
    shortDefinition:
      "Provider pricing and latency scale with tokens processed—input, output, and often cached-input discounts.",
    whyItMatters: [
      "Unit economics determine which features ship at scale.",
      "Long contexts and verbose tool JSON silently inflate bills.",
      "Cache-aware design is a cost optimization lever reported in industry case studies.",
    ],
    keyIdeas: ["Input vs output pricing", "Cached tokens", "Budget caps"],
    relatedConcepts: ["tokenization", "prompt-caching", "cost-optimization", "semantic-density"],
    body: "Every API call has a token ledger: system prompt, retrieved chunks, chat history, tool definitions, model completion. Output tokens are usually pricier than input. Cached prefix tokens—where providers support them—can dramatically cut spend on stable instructions and static knowledge snippets. Instrument token usage per feature, per tenant, and per model route. Teams that treat tokens as a first-class metric catch runaway agent loops before finance does. Set per-tenant budgets and anomaly alerts before launching agent features, because unbounded loops have caused surprise invoices in reported industry case studies.",
  },
  {
    slug: "semantic-density",
    title: "Semantic Density",
    tag: "tokens",
    shortDefinition:
      "How much meaning you pack per token—dense prompts convey constraints and evidence compactly without wasting context window.",
    whyItMatters: [
      "Higher density leaves room for retrieval and tool results.",
      "Verbose prompts push out facts the model needs to answer well.",
      "Pairs with chunking and context-engineering tradeoffs.",
    ],
    keyIdeas: ["Information per token", "Compression vs clarity", "Context budget"],
    relatedConcepts: ["tokens-and-cost", "context-engineering", "chunking"],
    body: "Semantic density is editorial discipline: bullet constraints instead of repeating them in prose, use delimiters for sections, prefer tables or JSON for structured facts the model must respect. Low-density prompts feel friendly but evict retrieved evidence from the window. When evaluating prompts, ask not only \"is it clear?\" but \"what else could fit if this were 30% shorter?\" DSPy and programmatic prompting often win by searching for denser instruction variants automatically. Review dense prompts with product and legal stakeholders to ensure compression did not delete mandatory disclosures or safety language.",
  },
  {
    slug: "model-families",
    title: "Model Families",
    tag: "models",
    shortDefinition:
      "Lineages of models sharing architecture, tokenizer, and training recipe—GPT, Claude, Gemini, Llama, Mistral, and domain-specific variants.",
    whyItMatters: [
      "Capabilities, context limits, tool formats, and pricing differ by family.",
      "Migration is rarely drop-in: prompts and evals must be revalidated.",
      "Routing across families is a common enterprise pattern.",
    ],
    keyIdeas: ["Capability tiers", "Context and tool support", "Vendor roadmaps"],
    relatedConcepts: ["open-vs-closed", "model-routing", "fine-tuning"],
    body: "Model families differ in reasoning strength, instruction following, multimodal support, structured output fidelity, and safety behaviour. A prompt tuned for one family may underperform on another. Build abstraction layers for prompts, tool schemas, and eval suites so you can swap models without rewriting orchestration. Keep a small golden task set per family to detect regressions when providers ship silent updates. Publish an internal compatibility matrix listing supported tool formats, max context, and deprecation dates so squads plan migrations early. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "open-vs-closed",
    title: "Open vs Closed Models",
    tag: "models",
    shortDefinition:
      "Closed models are proprietary APIs; open-weight models can be self-hosted, fine-tuned, and inspected—each with different ops and compliance tradeoffs.",
    whyItMatters: [
      "Data residency and air-gapped deployment often require open weights.",
      "Closed models may lead on frontier reasoning with less MLOps burden.",
      "Hybrid stacks route sensitive workloads locally and frontier tasks to APIs.",
    ],
    keyIdeas: ["Self-hosting", "API convenience", "License constraints"],
    relatedConcepts: ["model-families", "privacy-and-data", "enterprise-ai-patterns"],
    body: "Closed models offer fast iteration, strong defaults, and provider-managed safety—but you accept vendor terms, network egress, and opaque version changes. Open models give control over weights, fine-tuning, and deployment geography at the cost of GPU ops, quantization tuning, and safety tooling you must assemble. Many enterprises use both: open models inside the VPC for PII-heavy extraction, closed models for complex reasoning with redacted inputs. Negotiate contracts covering training opt-out, retention windows, and incident notification before routing regulated payloads to any closed API.",
  },
  {
    slug: "temperature",
    title: "Temperature and Sampling",
    tag: "models",
    shortDefinition:
      "Sampling controls how randomly the model picks next tokens—low temperature for deterministic tasks, higher for creative variation.",
    whyItMatters: [
      "Wrong temperature causes flaky JSON, inconsistent classifications, and test drift.",
      "Tool-calling pipelines usually need low temperature for parseable outputs.",
      "Creative features may benefit from moderate randomness with guardrails.",
    ],
    keyIdeas: ["Top-p and top-k", "Determinism vs diversity", "Task-specific defaults"],
    relatedConcepts: ["structured-output", "evaluation", "function-calling"],
    body: "Temperature scales logits before sampling: near zero, the model almost always picks the highest-probability token; higher values spread probability mass. For extraction, routing, and function calls, use low temperature and fixed seeds where supported. For brainstorming copy, moderate temperature adds variety. Document defaults per use case and lock them in eval harnesses—changing temperature without re-running benchmarks is a common source of silent quality drift. Record sampling parameters in trace metadata so on-call engineers can distinguish quality regressions from intentional configuration drift after deploys.",
  },
  {
    slug: "structured-output",
    title: "Structured Output",
    tag: "models",
    shortDefinition:
      "Constraining model responses to machine-parseable schemas—JSON, enums, or tool-call payloads—so downstream code can act reliably.",
    whyItMatters: [
      "Agents and workflows break when free-form text replaces typed interfaces.",
      "Schema validation catches model mistakes before side effects.",
      "Pairs with function-calling and programmatic orchestration.",
    ],
    keyIdeas: ["JSON schema", "Constrained decoding", "Repair loops"],
    relatedConcepts: ["function-calling", "temperature", "guardrails", "evaluation"],
    body: "Structured output turns LLM responses into API contracts. Use provider-native JSON modes or tool schemas when available; otherwise specify schemas in prompts with examples and validate with a strict parser. On failure, retry with the validation error as feedback—a small repair loop beats hoping the model self-corrects. Non-deterministic tool JSON serialization order can bust prefix caches; stable key ordering matters in optimized pipelines. Prefer schema validation at the boundary over regex scraping of markdown fences, which breaks silently when models add polite preamble.",
  },
  {
    slug: "fine-tuning",
    title: "Fine-Tuning",
    tag: "models",
    shortDefinition:
      "Continued training on curated data to adapt model behaviour—tone, format, domain language—without replacing base reasoning capabilities.",
    whyItMatters: [
      "Useful when prompt engineering plateaus on consistent style or classification.",
      "Not a substitute for RAG when facts change frequently.",
      "Requires data governance, eval splits, and regression monitoring.",
    ],
    keyIdeas: ["Behaviour adaptation", "SFT and preference tuning", "Data quality"],
    relatedConcepts: ["parametric-memory-limits", "open-vs-closed", "evaluation", "rag"],
    body: "Fine-tuning updates weights to absorb repetitive patterns: support macros, internal taxonomy, formatting habits. It is the wrong first lever for dynamic knowledge—retrieve instead. Successful fine-tunes start with a narrow objective, hundreds to thousands of high-quality examples, and held-out evals that mirror production failures. Treat fine-tuned models like any dependency: version datasets, track eval metrics, and plan rollback when base models improve. Maintain a canonical eval set of production failures before each fine-tune; if the new checkpoint wins on style but loses on facts, reject it.",
  },

  // —— Transformers ——
  {
    slug: "transformers",
    title: "Transformers",
    tag: "transformers",
    shortDefinition:
      "Neural architecture using self-attention to relate all tokens in a sequence—foundation of modern LLMs and many multimodal models.",
    whyItMatters: [
      "Explains why context length and attention cost dominate design discussions.",
      "Clarifies encoder-only vs decoder-only roles in retrieval stacks.",
      "Informs when separate embedding models beat generative models.",
    ],
    keyIdeas: ["Self-attention", "Parallel sequence processing", "Layer stacks"],
    relatedConcepts: ["attention", "encoder-decoder", "embeddings"],
    body: "Transformers replaced recurrent networks by letting every token attend to every other token in a layer—capturing long-range dependencies with trainable parallelism. Decoder-only stacks power autoregressive LLMs; encoder stacks produce dense vectors for search. Understanding transformers at a systems level helps you reason about latency (quadratic attention in full attention), memory, and why approximate attention and sliding windows appear in long-context models. You do not need to implement attention by hand, but you should know why doubling context length increases serving cost and memory pressure.",
  },
  {
    slug: "attention",
    title: "Attention Mechanism",
    tag: "transformers",
    shortDefinition:
      "Weighted lookup that lets each token focus on the most relevant other tokens when building its representation.",
    whyItMatters: [
      "Core to context usage—models prioritize some tokens over others.",
      "Explains phenomena like lost-in-the-middle and prompt ordering effects.",
      "Informs placement of instructions and evidence in prompts.",
    ],
    keyIdeas: ["Query-key-value", "Softmax weights", "Head specialization"],
    relatedConcepts: ["transformers", "lost-in-the-middle", "context-engineering"],
    body: "Attention computes, for each token, a distribution over other positions—deciding what to read. Multiple heads can specialize in syntax, coreference, or local patterns. In practice, prompt engineers exploit attention biases: models often weight beginnings and endings of context more heavily than middles. Put critical rules in the system prompt, place the freshest evidence near the question, and never bury mandatory constraints inside a long retrieved dump. When debugging RAG misses, reorder evidence before re-embedding entire corpora—attention bias often beats brute-force index expansion.",
  },
  {
    slug: "encoder-decoder",
    title: "Encoder-Decoder Architecture",
    tag: "transformers",
    shortDefinition:
      "Two-stack design: encoder builds bidirectional representations; decoder generates output autoregressively—common in translation and some RAG rerankers.",
    whyItMatters: [
      "Separates understanding input from generating output.",
      "Explains model choices for summarization vs embedding.",
      "Helps pick cross-encoders for reranking.",
    ],
    keyIdeas: ["Bidirectional encoding", "Autoregressive decoding", "Cross-attention"],
    relatedConcepts: ["transformers", "reranking", "summarization-patterns"],
    body: "Encoder-decoder models read the full input with bidirectional context, then decode an answer token by token. They remain strong for seq2seq tasks like summarization and structured transformation. Pure decoders dominate chat LLMs because a single stack simplifies scaling. In retrieval pipelines, encoders (or encoder stacks inside cross-encoders) score query-document pairs with richer interaction than bi-encoders alone. Pick encoder-heavy models when pairwise scoring dominates latency; pick decoder-only chat models when generation flexibility matters more. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "pretraining-vs-inference",
    title: "Pretraining vs Inference",
    tag: "transformers",
    shortDefinition:
      "Pretraining learns general language patterns offline at massive scale; inference applies those weights to new prompts at serving time.",
    whyItMatters: [
      "Clarifies what you can change quickly (prompts, retrieval) vs slowly (weights).",
      "Inference economics drive batching, caching, and model routing.",
      "Explains emergent abilities that appear only at certain scales.",
    ],
    keyIdeas: ["Offline training", "Online serving", "Emergence at scale"],
    relatedConcepts: ["scaling-laws", "fine-tuning", "prompt-caching"],
    body: "Pretraining optimizes next-token prediction on corpora once; inference is repeated forward passes per user request. Product teams live entirely in inference unless they fine-tune or distil. Serving introduces constraints pretraining ignores: p95 latency, KV-cache memory, concurrent tenants, and safety filters. Design features assuming inference is the billable moment—every retrieved token and tool round-trip adds to it. Capacity planning belongs on the inference path: batch sizes, KV cache, concurrent sessions, and autoscaling policies drive real bills. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "scaling-laws",
    title: "Scaling Laws",
    tag: "transformers",
    shortDefinition:
      "Empirical relationships showing predictable quality gains as models, data, and compute grow—guiding frontier vs efficient model choices.",
    whyItMatters: [
      "Explains why smaller models plus RAG often beat naive huge-model calls.",
      "Sets expectations for diminishing returns on prompt tweaks alone.",
      "Informs build-vs-buy when capabilities jump each generation.",
    ],
    keyIdeas: ["Compute-optimal training", "Chinchilla insights", "Capability jumps"],
    relatedConcepts: ["pretraining-vs-inference", "model-families", "cost-optimization"],
    body: "Scaling laws describe smooth improvements in loss—and often downstream capability—as parameters and training tokens increase. They explain vendor roadmaps and why mid-size models suddenly match last year's flagship. For practitioners, scaling laws argue for matching model size to task difficulty: don't pay frontier prices for extraction you can route to a small model with good retrieval. Re-evaluate that boundary each release cycle. Re-benchmark small-model-plus-RAG baselines whenever frontier models launch; the cost-performance frontier moves faster than procurement cycles. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "lost-in-the-middle",
    title: "Lost in the Middle",
    tag: "transformers",
    shortDefinition:
      "Models often under-use information placed in the middle of long contexts, overweighting beginnings and endings.",
    whyItMatters: [
      "Bad chunk ordering in RAG silently drops the best evidence.",
      "Long-context windows do not guarantee equal recall across positions.",
      "Drives reranking, re-ordering, and context-engineering tactics.",
    ],
    keyIdeas: ["U-shaped attention bias", "Evidence placement", "Re-ranking mitigations"],
    relatedConcepts: ["attention", "long-context", "reranking", "context-engineering"],
    body: "Research and production logs show models miss facts buried mid-prompt even when within the nominal context limit. Mitigate by reranking retrieved chunks, placing the highest-value passages last before the question, summarizing mid-context noise, or using map-reduce patterns over segments. Treat \"fits in context window\" as necessary, not sufficient—ordering and compression matter as much as retrieval score. Add automated tests that place gold facts in middle positions of synthetic contexts to catch ordering regressions before release. Ship only after eval gates pass on representative production failures.",
  },

  // —— Context ——
  {
    slug: "context-window",
    title: "Context Window",
    tag: "context",
    shortDefinition:
      "Maximum tokens the model can attend to in one forward pass—system, history, retrieval, tools, and completion combined.",
    whyItMatters: [
      "Hard cap on evidence, tools, and conversation you can include.",
      "Larger windows increase cost and latency even when unused.",
      "Window size does not equal reliable recall—see lost-in-the-middle.",
    ],
    keyIdeas: ["Token budget", "Input ceiling", "Effective vs nominal context"],
    relatedConcepts: ["long-context", "context-engineering", "tokens-and-cost"],
    body: "The context window is a finite workspace shared by every byte of instruction and evidence. Exceed it and providers truncate or reject the request. Product design should budget explicitly: reserve space for output, tool definitions, and safety buffers. Long windows help, but disciplined context engineering—what you omit—is often cheaper than stuffing everything because you can. Expose remaining budget in internal debugging tools so engineers see truncation decisions instead of guessing why evidence vanished. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "context-engineering",
    title: "Context Engineering",
    tag: "context",
    shortDefinition:
      "Deliberate curation of what enters the prompt—ordering, compression, retrieval, and tool results—to maximize answer quality per token.",
    whyItMatters: [
      "Often beats raw model upgrades for RAG and agent reliability.",
      "Connects prompting, retrieval, memory, and caching decisions.",
      "Core skill for production orchestration in 2026 stacks.",
    ],
    keyIdeas: ["Selective inclusion", "Ordering heuristics", "Compression tiers"],
    relatedConcepts: ["semantic-density", "memory-patterns", "rag-architecture", "lost-in-the-middle"],
    body: "Context engineering is the craft of assembling the smallest sufficient prompt. Rank retrieved chunks, deduplicate overlapping passages, summarize stale history, and inject tool outputs only when relevant. Co-design with evals: measure faithfulness and answer relevance as you change assembly rules. The best teams treat context assembly as code—typed, tested, and observable—not an ad hoc string concat in a route handler. Treat assembly code as a first-class service with unit tests on ranking, deduplication, and ACL filtering—not a 200-line script in a notebook.",
  },
  {
    slug: "long-context",
    title: "Long Context",
    tag: "context",
    shortDefinition:
      "Models and techniques supporting hundred-thousand to million-token inputs—whole codebases, corpora, or transcripts in one shot.",
    whyItMatters: [
      "Enables naive \"dump everything\" prototypes that need production refinement.",
      "Changes chunking tradeoffs—not every pipeline needs small chunks.",
      "Still requires attention to recall bias and cost.",
    ],
    keyIdeas: ["Extended windows", "Map-reduce fallback", "Cost at scale"],
    relatedConcepts: ["context-window", "lost-in-the-middle", "chunking", "summarization-patterns"],
    body: "Long-context models tempt teams to skip retrieval entirely. That works for bounded corpora and exploratory analysis; it fails on updating knowledge bases and strict citation needs. Hybrid patterns prevail: retrieve candidates cheaply, then let a long-context model read a curated superset. Monitor spend—linear input growth hurts—and validate that answers use distant passages, not only headers. Benchmark end-to-end faithfulness on whole-corpus prompts versus retrieve-then-read; long context is not a free substitute for search. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "prompt-caching",
    title: "Prompt Caching",
    tag: "context",
    shortDefinition:
      "Reusing computed prefix states across requests with identical early prompt segments to cut latency and input-token cost.",
    whyItMatters: [
      "Major lever for RAG and agent systems with stable instructions.",
      "Provider behaviour differs: explicit cache breakpoints vs automatic prefix matching.",
      "Requires stable prompt prefixes to realize savings.",
    ],
    keyIdeas: ["Prefix reuse", "Cache breakpoints", "TTL and invalidation"],
    relatedConcepts: ["cache-miss-patterns", "tokens-and-cost", "system-prompts"],
    body: "Prompt caching avoids recomputing attention over repeated prefixes. Anthropic exposes explicit cache breakpoints—you mark stable segments (system policy, tool schemas, static manuals) so later requests reuse KV state. OpenAI applies automatic prefix caching when consecutive requests share identical leading tokens; you do not set breakpoints manually, but benefit when prefixes match byte-for-byte. Design prompts with stable-first, dynamic-last ordering. Measure cache hit rate alongside p95 latency; reported industry case studies cite substantial savings when prefixes stay fixed across high-volume traffic. Instrument cache hit ratio per route and correlate with finance dashboards; savings disappear quickly when dynamic content precedes static prefixes.",
  },
  {
    slug: "cache-miss-patterns",
    title: "Cache Miss Patterns",
    tag: "context",
    shortDefinition:
      "Common production habits that break prefix reuse—mutable system prompts, non-deterministic tool JSON, and sliding-window history.",
    whyItMatters: [
      "Explains why caching gains disappear after innocuous refactors.",
      "Guides prompt layout and serialization discipline.",
      "Prevents false negatives in cost projections.",
    ],
    keyIdeas: ["Mutable system prompt", "Unstable tool schemas", "Sliding history window"],
    relatedConcepts: ["prompt-caching", "system-prompts", "structured-output", "chat-history-management"],
    body: "Three patterns routinely bust caches: injecting tenant-specific lines into the system prompt on every request instead of appending dynamic facts later; serializing tool definitions or function results with random key order or whitespace; and prepending a timestamp or sliding full-history block that changes the prefix each turn. Fix by separating stable constitution from volatile user context, canonicalizing JSON, and caching summaries instead of raw ever-growing transcripts when provider rules allow. Add CI checks that fail builds when tool schema serialization order changes without explicit approval from the platform team.",
  },
  {
    slug: "memory-patterns",
    title: "Memory Patterns",
    tag: "context",
    shortDefinition:
      "Architectures for what the system remembers across sessions—working context, summaries, vector recall, and external stores.",
    whyItMatters: [
      "LLMs are stateless without deliberate memory design.",
      "Wrong pattern leaks PII or stale preferences into prompts.",
      "Agent systems need tiered memory with clear eviction rules.",
    ],
    keyIdeas: ["Short-term vs long-term", "Summarization", "Retrieval-backed recall"],
    relatedConcepts: ["chat-history-management", "agent-memory-tiers", "rag", "embeddings"],
    body: "Memory patterns decide how past interactions influence new answers. Inline history is simplest but hits window limits. Rolling summaries compress older turns. Vector memory retrieves relevant past facts by embedding similarity. Enterprise systems combine tiers: session buffer, user profile store, and authoritative knowledge base—with explicit consent and retention policies. Never assume the model remembers; wire memory through typed stores you can audit and delete. Document retention and deletion behaviour in user-facing privacy notices; memory you cannot erase becomes compliance debt quickly.",
  },
  {
    slug: "chat-history-management",
    title: "Chat History Management",
    tag: "context",
    shortDefinition:
      "Strategies to trim, summarize, and structure multi-turn conversations so quality stays high without blowing token budgets.",
    whyItMatters: [
      "Unbounded history is a top source of cost overruns and cache misses.",
      "Poor truncation loses constraints the user set ten turns ago.",
      "Sliding windows need compensating summary or memory retrieval.",
    ],
    keyIdeas: ["Truncation policies", "Summary checkpoints", "Constraint re-injection"],
    relatedConcepts: ["memory-patterns", "cache-miss-patterns", "context-engineering"],
    body: "Chat products accumulate tokens fast. Define policies: keep last N turns verbatim, summarize older segments, re-inject standing constraints from structured state—not from hope the model recalls them. Sliding-window history that shifts the prefix every message prevents prefix caching on many providers. Persist business-critical slots (ticket ID, locale, auth scope) outside the transcript and inject them deterministically each turn. Store immutable business facts in structured session state rather than hoping the model extracts them reliably from free-form chat alone. Ship only after eval gates pass on representative production failures.",
  },

  // —— Optimization ——
  {
    slug: "dspy",
    title: "DSPy",
    tag: "optimization",
    shortDefinition:
      "Framework treating LLM pipelines as optimizable programs—signatures, modules, and teleprompters search for better prompts and weights.",
    whyItMatters: [
      "Moves prompt tuning from artisanal guessing toward measurable compilation.",
      "Pairs naturally with RAG and agent module graphs.",
      "Reported industry case studies show strong gains on structured tasks.",
    ],
    keyIdeas: ["Programs not strings", "Automatic prompt search", "Composable modules"],
    relatedConcepts: ["dspy-signatures", "teleprompters", "programmatic-prompting", "evaluation"],
    body: "DSPy reframes prompts as parameters in a program you can optimize. Define signatures for inputs and outputs, compose retrieval or tool modules, then let teleprompters propose improved instructions or demonstrations against a metric. It shines when you have labeled or LLM-judge evals and repetitive pipeline structure. Start small—one signature, one metric—before compiling entire agent graphs. Invest in metric design before optimizer runs—a teleprompter will happily overfit a vague score that rewards verbosity over correctness. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "dspy-signatures",
    title: "DSPy Signatures",
    tag: "optimization",
    shortDefinition:
      "Typed input-output contracts in DSPy that specify fields, docstrings, and constraints for each module step.",
    whyItMatters: [
      "Makes pipeline interfaces explicit and optimizable.",
      "Reduces ad hoc string formatting across teams.",
      "Enables teleprompters to target specific fields.",
    ],
    keyIdeas: ["Input fields", "Output fields", "Docstring hints"],
    relatedConcepts: ["dspy", "structured-output", "programmatic-prompting"],
    body: "A signature declares what a module consumes and produces—question, context, answer; or claim, evidence, verdict. Docstrings guide both the base LM and the optimizer. Signatures mirror good API design: narrow types, clear semantics, minimal leakage between steps. When migrating from handwritten prompts, extract the implicit schema first; optimization works best on stable interfaces. Keep signatures stable across releases so optimized prompts remain comparable; breaking field names resets optimization gains. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "teleprompters",
    title: "Teleprompters",
    tag: "optimization",
    shortDefinition:
      "DSPy optimizers that search over prompts, few-shot sets, or module parameters to maximize a training metric.",
    whyItMatters: [
      "Automates prompt iteration with reproducible experiments.",
      "MiPROv2 and GEPA represent different search strategies.",
      "Requires trustworthy eval signals to avoid overfitting.",
    ],
    keyIdeas: ["Search space", "Metric-driven selection", "Bootstrap demonstrations"],
    relatedConcepts: ["dspy", "miprov2", "gepa", "evaluation"],
    body: "Teleprompters treat prompt design as search. They mutate instructions, select demonstrations, or adjust combinational rules, keeping changes that improve dev-set scores. Guard against overfitting tiny sets—hold out production-like failures. Combine with human review of winning prompts; optimizers exploit judge blind spots. Version optimized artifacts like any model checkpoint. Hold out a production-like failure set untouched during search; promote winners only when they generalize beyond training quirks. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "gepa",
    title: "GEPA",
    tag: "optimization",
    shortDefinition:
      "Genetic-Pareto prompt optimizer in DSPy that evolves prompt candidates under multi-objective metrics.",
    whyItMatters: [
      "Useful when balancing quality, length, and latency simultaneously.",
      "Reported industry case studies mention cost-quality Pareto gains.",
      "Complements single-metric teleprompters.",
    ],
    keyIdeas: ["Evolutionary search", "Pareto fronts", "Multi-objective metrics"],
    relatedConcepts: ["teleprompters", "miprov2", "cost-optimization"],
    body: "GEPA explores populations of prompt variants, selecting those on the Pareto frontier—for example, high faithfulness without excessive token length. It helps when compressing prompts for cache-friendly prefixes while preserving accuracy. Feed it metrics you truly trade off; bogus composite scores produce brittle winners. Treat outputs as candidates for staging evals, not automatic production deploys. Report Pareto fronts to stakeholders in plain language—quality versus cost tradeoffs should be product decisions, not hidden ML artifacts. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "miprov2",
    title: "MiPROv2",
    tag: "optimization",
    shortDefinition:
      "DSPy teleprompter using model-informed proposal and search to refine instructions and few-shot sets efficiently.",
    whyItMatters: [
      "Often faster than brute-force prompt grids on structured pipelines.",
      "Leverages LM feedback to propose edits.",
      "Popular starting point for DSPy optimization workflows.",
    ],
    keyIdeas: ["Guided proposal", "Instruction refinement", "Demonstration selection"],
    relatedConcepts: ["teleprompters", "dspy", "zero-shot-and-few-shot"],
    body: "MiPROv2 iteratively proposes instruction and demo changes informed by model behaviour on errors. It works well on classification, extraction, and multi-hop RAG modules with crisp metrics. Provide diverse failure examples in the train set so proposals target real edges. Compare against a strong manual baseline—optimization should beat human defaults, not merely beat garbage. Seed MiPROv2 with human-written baselines that already pass minimum bars; optimizers should refine strong starting points, not salvage broken pipelines. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "programmatic-prompting",
    title: "Programmatic Prompting",
    tag: "optimization",
    shortDefinition:
      "Building prompts through code—templates, optimizers, and typed modules—instead of one-off strings in notebooks.",
    whyItMatters: [
      "Enables testing, diff review, and CI eval hooks.",
      "Connects product logic with prompt assembly.",
      "Foundation for DSPy, agents, and dynamic RAG.",
    ],
    keyIdeas: ["Templates with typed slots", "Version control", "Eval-driven change"],
    relatedConcepts: ["dspy", "context-engineering", "system-prompts"],
    body: "Programmatic prompting treats prompts like SQL queries assembled from parameters: tenant policy fragments, retrieved chunks, tool outputs. Centralize assembly functions, forbid copy-paste prompt forks, and run golden tests on every change. Optimizers and teleprompters assume this structure—free-text prompts in scattered services resist automation and observability. Expose prompt assembly functions to observability with hashes of each segment so incidents map to exact template versions quickly. Ship only after eval gates pass on representative production failures.",
  },

  // —— Embeddings ——
  {
    slug: "embeddings",
    title: "Embeddings",
    tag: "embeddings",
    shortDefinition:
      "Dense vector representations of text (or other modalities) where semantic similarity approximates geometric closeness.",
    whyItMatters: [
      "Foundation of semantic search, RAG retrieval, and clustering.",
      "Choice of embedding model affects recall on domain jargon.",
      "Separate from generative LLM—you often use both.",
    ],
    keyIdeas: ["Vector representations", "Similarity search", "Domain adaptation"],
    relatedConcepts: ["vector-similarity", "vector-databases", "semantic-search"],
    body: "Embeddings map sentences or documents into fixed-length vectors optimized so related meanings sit nearby. They power \"find passages like this question\" without keyword overlap. Pick models trained on text similar to your corpus; legal, medical, and code domains often need specialized embedders. Re-embed when you change models—vectors are not portable across unrelated embedding spaces. Version embedding models in index metadata and block silent cross-version queries that return nonsense similarity scores. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "vector-similarity",
    title: "Vector Similarity",
    tag: "embeddings",
    shortDefinition:
      "Scoring how close two embeddings are—usually cosine similarity or dot product—to rank candidates for retrieval.",
    whyItMatters: [
      "Similarity threshold choices control precision-recall tradeoffs.",
      "Normalization affects comparability across indexes.",
      "Hybrid search combines similarity with lexical scores.",
    ],
    keyIdeas: ["Cosine similarity", "Dot product", "Distance metrics"],
    relatedConcepts: ["embeddings", "semantic-search", "hybrid-search"],
    body: "Vector similarity turns geometry into ranking. Cosine similarity ignores magnitude—good when embeddings are normalized. Dot product favors longer vectors—common in some ANN libraries. Calibrate thresholds on labeled query sets; a single global cutoff rarely works across product areas. Log similarity scores in observability pipelines to debug \"why didn't we retrieve the obvious doc?\". Visualize score distributions per collection during index health checks; sudden shifts often precede user complaints about \"search feels broken.\". Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "vector-databases",
    title: "Vector Databases",
    tag: "embeddings",
    shortDefinition:
      "Storage engines optimized for approximate nearest-neighbor search over millions of embeddings with metadata filters.",
    whyItMatters: [
      "Operational home for RAG indexes and agent memory.",
      "Filter support (tenant, ACL, date) is as important as raw speed.",
      "Index parameters affect recall and rebuild cost.",
    ],
    keyIdeas: ["ANN indexes", "Metadata filtering", "Sharding and replication"],
    relatedConcepts: ["embeddings", "indexing-strategies", "knowledge-bases"],
    body: "Vector databases—Pinecone, Weaviate, pgvector, and others—host embedding indexes with hybrid query APIs. Choose based on filter complexity, ops model, and consistency needs. Plan for reindex jobs when embedding models change. Treat collections as part of your data plane: backups, ACL sync, and deletion workflows must match source systems. Practice disaster recovery drills including full reindex from source systems; vector snapshots alone are useless without ingestion pipelines. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "chunking",
    title: "Chunking",
    tag: "embeddings",
    shortDefinition:
      "Splitting documents into retrieval-sized pieces before embedding—balance context completeness against search precision.",
    whyItMatters: [
      "Bad chunking is the silent killer of RAG quality.",
      "Chunk size interacts with embedding model max length.",
      "Strategy depends on document structure and query type.",
    ],
    keyIdeas: ["Fixed-size splits", "Overlap windows", "Structure boundaries"],
    relatedConcepts: ["semantic-chunking", "late-chunking", "structure-aware-chunking", "rag"],
    body: "Chunking decides what the retriever can return as atomic evidence. Fixed token windows are simple but split concepts mid-thought. Overlap reduces boundary cuts but increases storage. Compare semantic, late, and structure-aware strategies on your eval set—no universal best size. Always store metadata: source URL, heading path, page, and permissions for citation and filtering. Re-chunk when source formats change—PDF-to-Markdown migrations have invalidated more RAG systems than model upgrades ever did. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "semantic-chunking",
    title: "Semantic Chunking",
    tag: "embeddings",
    shortDefinition:
      "Splitting text at natural topic boundaries detected by embedding similarity shifts between sentences or paragraphs.",
    whyItMatters: [
      "Keeps related ideas together better than blind fixed windows.",
      "Reduces fragments that confuse both retriever and reader model.",
      "Costs extra embedding passes during indexing.",
    ],
    keyIdeas: ["Breakpoint detection", "Coherence scoring", "Variable chunk sizes"],
    relatedConcepts: ["chunking", "late-chunking", "structure-aware-chunking"],
    body: "Semantic chunking scans sentences, measuring embedding drift between neighbours; when similarity drops sharply, start a new chunk. Compared to fixed windows, it preserves topical units—helpful for policies and essays. Compared to structure-aware chunking, it ignores headings and tables unless text order reflects them. Use when documents lack reliable markup but read linearly; validate on Precision@K because overtly long semantic segments can dilute matches. Profile indexing cost on your largest tenants before rolling semantic chunking fleet-wide; variable segment sizes affect storage nonlinearly.",
  },
  {
    slug: "late-chunking",
    title: "Late Chunking",
    tag: "embeddings",
    shortDefinition:
      "Embed the full document (or large span) first, then derive chunk vectors from internal model states—preserving global context in each piece.",
    whyItMatters: [
      "Mitigates context loss when naive chunking embeds isolated snippets.",
      "Emerging pattern for long documents with cross-references.",
      "Heavier compute at index time than naive chunk-and-embed.",
    ],
    keyIdeas: ["Contextualized chunk vectors", "Long-document encoding", "Index-time cost"],
    relatedConcepts: ["chunking", "semantic-chunking", "long-context"],
    body: "Late chunking encodes a large passage once, then pools token-level representations per segment so each chunk vector knows surrounding context. Versus semantic chunking—which splits text first, then embeds each piece independently—late chunking helps when pronouns and definitions span sections. Versus structure-aware chunking, it does not require headings but needs compatible embedding models. Weigh index cost against gains on Recall@K for cross-paragraph questions. Validate late chunking on pronoun-heavy and cross-reference-heavy doc sets where naive splits fail even when semantic chunking looks acceptable.",
  },
  {
    slug: "structure-aware-chunking",
    title: "Structure-Aware Chunking",
    tag: "embeddings",
    shortDefinition:
      "Splitting along document structure—headings, tables, slides, code blocks—so chunks respect logical units and metadata.",
    whyItMatters: [
      "Essential for wikis, APIs docs, and regulated manuals.",
      "Enables citations that point to sections users recognize.",
      "Pairs with GraphRAG for hierarchical knowledge.",
    ],
    keyIdeas: ["Heading paths", "Table row units", "Code function blocks"],
    relatedConcepts: ["chunking", "semantic-chunking", "knowledge-bases", "graphrag"],
    body: "Structure-aware chunking uses HTML, Markdown, PDF outlines, or OCR layout to never split mid-table or mid-procedure step. Compared to semantic chunking, it trusts author structure over statistical breakpoints—superior for SOPs and reference docs. Compared to late chunking, it is cheaper and easier to explain in audits. Attach breadcrumb metadata (H1 > H2 > H3) to each chunk for filtering and user-facing citations. Sync heading metadata when wikis rename sections; stale breadcrumbs confuse both users and ACL filters tied to path prefixes.",
  },
  {
    slug: "multimodal-embeddings",
    title: "Multimodal Embeddings",
    tag: "embeddings",
    shortDefinition:
      "Joint vector spaces for text, images, audio, or video—enabling cross-modal search and retrieval.",
    whyItMatters: [
      "Powers image+caption knowledge bases and visual support tools.",
      "Requires different eval metrics than text-only RAG.",
      "Storage and pipeline complexity increase.",
    ],
    keyIdeas: ["Cross-modal similarity", "Unified index", "Modality-specific encoders"],
    relatedConcepts: ["multimodal-models", "vector-databases", "semantic-search"],
    body: "Multimodal embeddings align photos, slides, and descriptive text in one searchable space—\"find diagrams like this failure mode.\" Index pipelines must extract alt text, OCR, and transcripts consistently. Retrieval evals need human judgment on visual relevance. Often combine generative multimodal models for answer synthesis with specialized embedders for search. Align legal review for visual assets with text corpora—screenshots may contain sensitive UI data text-only pipelines never saw. Ship only after eval gates pass on representative production failures.",
  },

  // —— Retrieval ——
  {
    slug: "semantic-search",
    title: "Semantic Search",
    tag: "retrieval",
    shortDefinition:
      "Finding documents by meaning similarity between query and corpus embeddings rather than exact keyword match.",
    whyItMatters: [
      "Captures paraphrases and conceptual questions keywords miss.",
      "Core retrieval stage before RAG generation.",
      "Fails on rare proper nouns without hybrid lexical backup.",
    ],
    keyIdeas: ["Query embedding", "Top-K retrieval", "Similarity thresholds"],
    relatedConcepts: ["embeddings", "hybrid-search", "reranking", "rag"],
    body: "Semantic search embeds the user question, pulls nearest neighbours from the vector index, and passes hits to downstream rerankers or the LLM. Tune top-K: too low misses evidence; too high adds noise and tokens. Log queries with zero hits—they signal glossary gaps or stale indexes. Always pair with ACL filters so embeddings never leak cross-tenant data. Publish zero-hit queries to content owners monthly; they reveal glossary gaps faster than tuning embedding models alone. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "hybrid-search",
    title: "Hybrid Search",
    tag: "retrieval",
    shortDefinition:
      "Combining dense vector retrieval with sparse lexical methods (BM25) for robust recall across paraphrase and keyword queries.",
    whyItMatters: [
      "Fixes semantic search blind spots on SKUs, error codes, and names.",
      "Industry default for production RAG indexes.",
      "Fusion weight tuning belongs in eval harnesses.",
    ],
    keyIdeas: ["BM25 plus vectors", "Reciprocal rank fusion", "Weighted blending"],
    relatedConcepts: ["semantic-search", "reranking", "indexing-strategies"],
    body: "Hybrid search runs lexical and semantic retrievers in parallel, then fuses rankings—RRF or learned weights. Lexical wins on exact tokens; semantic wins on conceptual questions. Calibrate on real query logs, not only synthetic paraphrases. Expose fusion parameters to observability so on-call engineers can diagnose sudden recall drops after index rebuilds. A/B test fusion weights on live traffic with guardrail metrics; offline Recall@K alone misses user preference for exact matches. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "reranking",
    title: "Reranking",
    tag: "retrieval",
    shortDefinition:
      "Second-stage model that scores query-passage pairs with richer interaction than bi-encoder retrieval alone.",
    whyItMatters: [
      "Lifts Precision@K before chunks enter the LLM context.",
      "Mitigates lost-in-the-middle by ordering best evidence last.",
      "Adds latency—usually worth it for high-stakes answers.",
    ],
    keyIdeas: ["Cross-encoder", "Top-K refinement", "Latency tradeoff"],
    relatedConcepts: ["colbert", "semantic-search", "context-engineering"],
    body: "Bi-encoder retrieval is fast but shallow; cross-encoder rerankers read query and passage together for accurate relevance scores. Retrieve generously (50–200), rerank to 5–10, then assemble context. ColBERT-style late interaction offers a middle ground for large candidate sets. Monitor reranker timeouts—they are often the p95 bottleneck in RAG paths. Set aggressive timeouts and fallback to bi-encoder ordering rather than blocking user requests when rerankers saturate GPU pools. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "colbert",
    title: "ColBERT",
    tag: "retrieval",
    shortDefinition:
      "Late-interaction retrieval model keeping token-level embeddings for efficient fine-grained matching between query and document.",
    whyItMatters: [
      "Strong recall-latency balance for large corpora.",
      "Alternative to full cross-encoder reranking at scale.",
      "Useful when keyword and bi-encoder retrieval underperform.",
    ],
    keyIdeas: ["Token-level interaction", "MaxSim operator", "Index-friendly representations"],
    relatedConcepts: ["reranking", "hybrid-search", "indexing-strategies"],
    body: "ColBERT encodes queries and documents into token vectors, scoring via MaxSim—how well each query token matches its best document token. It captures lexical nuance bi-encoders miss while remaining more scalable than monolithic cross-encoders. Operationally, plan for specialized indexes and versioning. Evaluate on entity-heavy and paraphrase-heavy query buckets separately. Budget engineering time for ColBERT-specific index maintenance; operational complexity is the hidden cost in otherwise attractive benchmarks. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "query-transformation",
    title: "Query Transformation",
    tag: "retrieval",
    shortDefinition:
      "Rewriting user queries—expansion, decomposition, or step-back—for better retrieval against the index.",
    whyItMatters: [
      "Raw user messages are often vague or conversational.",
      "Multi-hop questions need sub-queries.",
      "Transforms add latency and must be eval-covered.",
    ],
    keyIdeas: ["Query expansion", "Sub-query decomposition", "Hypothetical documents"],
    relatedConcepts: ["hyde", "semantic-search", "advanced-rag"],
    body: "Query transformation uses an LLM to turn \"why is my bill wrong?\" into structured sub-queries against billing docs, or expands acronyms using a controlled glossary. Guard with templates and refusal when transformation invents constraints. Cache transformations for repeat users. Measure Recall@K with and without transforms to justify the extra model call. Log original and transformed queries with retrieval outcomes to detect transforms that systematically bias results toward stale content. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "hyde",
    title: "HyDE",
    tag: "retrieval",
    shortDefinition:
      "Hypothetical Document Embeddings—generate a fake answer passage, embed it, and retrieve real documents similar to that hypothesis.",
    whyItMatters: [
      "Bridges lexical gap between short questions and long answers.",
      "Cheap query transform for semantic retrieval.",
      "Can hallucinate off-domain if not constrained.",
    ],
    keyIdeas: ["Hypothetical answer", "Embedding proxy", "Domain prompting"],
    relatedConcepts: ["query-transformation", "semantic-search", "embeddings"],
    body: "HyDE asks the model to draft a plausible answer without retrieval, embeds that draft, and searches for real chunks near the hypothetical vector. It helps when questions are short but answers are long. Constrain the generator with domain instructions and low temperature; discard hypotheses that cite nonexistent products. Compare against vanilla embedding of the raw query on your eval set—HyDE is not free lunch on factual precision. Disable HyDE for high-stakes factual lookups unless human reviewers validate gains on your precision-critical query slice.",
  },
  {
    slug: "indexing-strategies",
    title: "Indexing Strategies",
    tag: "retrieval",
    shortDefinition:
      "How and when you chunk, embed, and refresh corpora—batch, incremental, multi-version, and metadata-rich pipelines.",
    whyItMatters: [
      "Stale indexes cause confident wrong answers.",
      "Incremental updates must respect deletes and permission changes.",
      "Reindex plans interact with embedding model upgrades.",
    ],
    keyIdeas: ["Incremental sync", "Versioned embeddings", "ACL propagation"],
    relatedConcepts: ["vector-databases", "knowledge-bases", "chunking"],
    body: "Indexing strategy spans ingestion schedulers, change-data-capture from wikis, tombstoning deleted pages, and blue-green index cuts when embedding models change. Tag chunks with source timestamps so the generator can prefer fresh policy. For regulated domains, log who indexed what and when. Pair indexing SLAs with RAG eval dashboards—recall drops often trace to broken crawlers, not model regressions. Define SLOs for index freshness per corpus tier—marketing pages and pricing tables need tighter bounds than archived research PDFs. Ship only after eval gates pass on representative production failures.",
  },

  // —— RAG ——
  {
    slug: "rag",
    title: "Retrieval-Augmented Generation",
    tag: "rag",
    shortDefinition:
      "Retrieve relevant external documents at query time, inject them into the prompt, then generate an answer grounded in that evidence.",
    whyItMatters: [
      "Primary pattern for organizational knowledge without retraining.",
      "Separates reasoning (LLM) from facts (retrieval index).",
      "Requires eval on faithfulness, not fluency alone.",
    ],
    keyIdeas: ["Retrieve then generate", "Grounding", "Citations"],
    relatedConcepts: ["rag-architecture", "naive-vs-production-rag", "citation-and-grounding"],
    body: "RAG connects non-parametric memory to the reasoning engine: embed the question, fetch chunks, assemble context, generate with cite-or-refuse instructions. Naive RAG stops there; production RAG adds hybrid search, reranking, query transforms, observability, and guardrails. Success is measured by faithful answers backed by retrieved passages—not eloquent guesses when retrieval fails. Ship refusal paths when retrieval confidence is low; users prefer honest limits over fluent wrong answers backed by irrelevant citations. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "rag-architecture",
    title: "RAG Architecture",
    tag: "rag",
    shortDefinition:
      "End-to-end components—ingestion, indexing, retrieval, reranking, generation, citation, and feedback loops—for grounded QA.",
    whyItMatters: [
      "Clarifies ownership across data, ML, and app teams.",
      "Surfaces failure points: crawl, chunk, retrieve, generate.",
      "Enables SLOs per stage instead of blaming \"the model.\"",
    ],
    keyIdeas: ["Ingestion pipeline", "Retrieval stack", "Generation policy"],
    relatedConcepts: ["rag", "advanced-rag", "knowledge-bases", "observability"],
    body: "A production RAG architecture diagrams data sources, chunkers, embedders, vector store, query router, reranker, prompt assembler, LLM, citation formatter, and logging bus. Each stage gets metrics: ingestion lag, Recall@K, rerank latency, faithfulness score, user thumbs-down rate. Design explicit refusal when retrieval confidence is low—better than synthesizing from parametric memory alone. Run game days that kill individual stages—embedder, vector store, reranker—to verify graceful degradation messages reach users clearly. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "citation-and-grounding",
    title: "Citation and Grounding",
    tag: "rag",
    shortDefinition:
      "Requiring answers to quote or link retrieved evidence—and refusing when support is insufficient.",
    whyItMatters: [
      "Trust and compliance depend on traceable sources.",
      "Reduces undetected hallucination in enterprise QA.",
      "UX must show citations users can verify.",
    ],
    keyIdeas: ["Inline citations", "Abstention", "Evidence spans"],
    relatedConcepts: ["rag", "faithfulness-and-relevance", "guardrails"],
    body: "Grounding policies instruct the model to tie claims to chunk IDs or URLs, use direct quotes for numbers, and say \"I don't know\" when retrieval misses. Validate automatically: NLI models or LLM judges compare answers to passages. User interfaces should surface citations prominently—not footnotes users never expand. Grounding is a product requirement, not a prompt afterthought. Train support staff to click citations during QA shifts; broken anchors erode trust faster than occasional wrong answers. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "rag-evaluation",
    title: "RAG Evaluation",
    tag: "rag",
    shortDefinition:
      "Metrics and datasets for retrieval quality and generation faithfulness—Precision@K, Recall@K, faithfulness, answer relevance.",
    whyItMatters: [
      "Prevents shipping RAG that reads well but cites wrong docs.",
      "Separates retriever regressions from generator issues.",
      "Feeds continuous improvement and DSPy optimization.",
    ],
    keyIdeas: ["Precision@K", "Recall@K", "Faithfulness", "Answer relevance"],
    relatedConcepts: ["faithfulness-and-relevance", "g-eval", "ragas", "evaluation"],
    body: "Evaluate retrieval with Precision@K (how many top hits are relevant) and Recall@K (whether gold passages appear). Evaluate generation with faithfulness (claims supported by context) and answer relevance (addresses the question). Build sets from real support tickets and doc updates. Run evals on every index rebuild, prompt change, and model route swap—aggregate scores hide catastrophic slices. Slice eval dashboards by language, product SKU, and doc vintage; aggregate faithfulness hides failures on your riskiest segments. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "ragas",
    title: "RAGAS",
    tag: "evaluation",
    shortDefinition:
      "Reference-free RAG evaluation suite measuring faithfulness, answer relevance, context precision, and context recall with LLM-assisted scoring.",
    whyItMatters: [
      "Turns RAG quality into CI-friendly metrics without expensive gold labels for every claim.",
      "Separates retrieval failures from generation hallucinations.",
      "Pairs well with Phoenix-style tracing for production samples.",
    ],
    keyIdeas: ["Faithfulness", "Answer relevance", "Context precision/recall"],
    relatedConcepts: ["rag-evaluation", "faithfulness-and-relevance", "g-eval", "observability"],
    body: "RAGAS scores RAG traces end-to-end: did retrieved context contain the answer, did the reply stick to that context, and did it address the question. Use it on golden sets and sampled production logs—not as a single vanity number, but sliced by corpus and language. Treat dips after index rebuilds or prompt edits as release blockers. Combine RAGAS with human spot-checks on high-risk domains; automated scores miss subtle policy misreads. Wire failures into prompt and retrieval tickets with the offending chunks attached so engineers fix causes, not symptoms.",
  },
  {
    slug: "advanced-rag",
    title: "Advanced RAG",
    tag: "rag",
    shortDefinition:
      "Patterns beyond naive retrieve-once—multi-query, rerank, compress, route, and agentic retrieval loops.",
    whyItMatters: [
      "Closes gap between demo RAG and production accuracy.",
      "Targets multi-hop and comparative questions.",
      "Adds orchestration complexity requiring observability.",
    ],
    keyIdeas: ["Iterative retrieval", "Context compression", "Routing"],
    relatedConcepts: ["query-transformation", "graphrag", "refrag", "agents", "rag-architecture"],
    body: "Advanced RAG iterates: decompose questions, retrieve in waves, compress chunks to summaries, route subtopics to specialized indexes, or let an agent decide when to search again. Use when naive top-K fails on comparisons (\"diff plan A vs B\") or temporal questions. Cap iterations to control cost; log each retrieval hop for debugging. Cap agentic retrieval loops with step budgets and explicit stop reasons logged for finance and debugging review. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "refrag",
    title: "REFRAG",
    tag: "rag",
    shortDefinition:
      "Retrieval compression pattern that keeps many candidate chunks as compact embeddings and expands only the ones the decoder needs back into tokens.",
    whyItMatters: [
      "Cuts wasted tokens from stuffing oversized retrieval sets into the prompt.",
      "Preserves broad recall while controlling latency and cost at decode time.",
      "Fits production stacks already paying for large context windows.",
    ],
    keyIdeas: ["Compressed retrieval", "Selective expansion", "Compute efficiency"],
    relatedConcepts: ["advanced-rag", "context-engineering", "colbert", "cost-optimization"],
    body: "REFRAG-style pipelines separate \"what might be relevant\" from \"what must be readable tokens.\" Candidates stay cheap as embeddings until a selector expands a smaller subset into the generator prompt. That reduces the Lost-in-the-Middle tax and the bill for stuffing twenty near-duplicates into every call. Implement with explicit budgets: max expanded chunks, max tokens, and a fallback when the selector is uncertain. Measure faithfulness before celebrating cost wins—compression that drops the supporting span is a silent regression. Log which chunks expanded versus stayed compressed so ops can debug wrong answers.",
  },
  {
    slug: "graphrag",
    title: "GraphRAG",
    tag: "rag",
    shortDefinition:
      "Combining knowledge graphs or community summaries with vector retrieval for global and relational questions over corpora.",
    whyItMatters: [
      "Helps \"themes across the whole library\" queries flat RAG misses.",
      "Surfaces entity relationships and community structure.",
      "Higher offline indexing cost than flat chunk indexes.",
    ],
    keyIdeas: ["Entity graphs", "Community summaries", "Global search"],
    relatedConcepts: ["advanced-rag", "structure-aware-chunking", "knowledge-bases"],
    body: "GraphRAG extracts entities and relations, builds community summaries, and answers both local detail questions and global thematic ones. It shines on investigative workflows—connecting people, projects, and events across documents. Operate it as a batch indexing investment with clear query routing: use graph paths for synthesis questions, vector search for pinpoint fact lookup. Route queries explicitly—graph summaries for thematic questions, vector search for pinpoint facts—to avoid paying graph costs on every request. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "knowledge-bases",
    title: "Knowledge Bases",
    tag: "rag",
    shortDefinition:
      "Curated corpora—wikis, tickets, PDFs, APIs—governed for ingestion, access control, and freshness as RAG source of truth.",
    whyItMatters: [
      "Garbage in remains garbage out regardless of model size.",
      "ACL sync is a security requirement, not optional.",
      "Ownership and SLAs differ from generic vector dumps.",
    ],
    keyIdeas: ["Source governance", "Freshness SLAs", "Permission mirroring"],
    relatedConcepts: ["indexing-strategies", "privacy-and-data", "rag-architecture"],
    body: "A knowledge base is more than an index—it defines authoritative sources, update cadence, redaction rules, and who may read which chunk. Connectors should respect deletes and permission changes intraday. Document owners approve inclusion tiers (customer-facing vs internal). When answers fail, check corpus gaps before blaming prompts. Assign corpus owners with OKRs on freshness and coverage; orphan wikis become silent RAG enemies within quarters. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "naive-vs-production-rag",
    title: "Naive vs Production RAG",
    tag: "rag",
    shortDefinition:
      "Naive RAG embeds docs and calls the LLM once; production RAG adds hybrid search, reranking, evals, guardrails, and ops.",
    whyItMatters: [
      "Sets realistic roadmap from POC to enterprise reliability.",
      "Explains why demos fail under real query diversity.",
      "Aligns expectations with reported industry case studies.",
    ],
    keyIdeas: ["POC pitfalls", "Operational maturity", "Metric gates"],
    relatedConcepts: ["rag", "rag-architecture", "rag-evaluation", "observability"],
    body: "Naive RAG—chunk, embed, top-3, ask—works on toy PDFs. Production RAG handles ACLs, hybrid retrieval, rerankers, query transforms, citation enforcement, hallucination monitoring, cache-aware prompts, and regression evals. Teams at Shopify and Dropbox-scale deployments emphasize observability and cost controls in reported industry case studies. Plan explicit maturity stages so stakeholders know what \"done\" means at each gate. Publish a maturity rubric internally so executives know stage-two requires eval gates, not merely more documents ingested. Ship only after eval gates pass on representative production failures.",
  },

  // —— Agents ——
  {
    slug: "agents",
    title: "AI Agents",
    tag: "agents",
    shortDefinition:
      "LLM-driven systems that plan, use tools, and iterate toward goals—not just single-shot text completion.",
    whyItMatters: [
      "Unlocks workflows: research, ticket triage, data entry with supervision.",
      "Introduces loops where cost and failure modes multiply.",
      "Requires explicit stop conditions and human gates.",
    ],
    keyIdeas: ["Plan-act-observe loops", "Tool use", "State management"],
    relatedConcepts: ["planning-and-reasoning", "tool-calling", "langgraph", "human-in-the-loop"],
    body: "Agents wrap the LLM in a control loop: observe state, decide next action, call tools, update memory, repeat until done or blocked. Reliability comes from typed tool interfaces, max step budgets, and eval scenarios mirroring production messiness. Start with narrow domains—one API, one database—before open-ended \"do anything\" assistants. Require idempotent tools and explicit max-step limits in every agent PR; production incidents often start as unbounded retry loops. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "planning-and-reasoning",
    title: "Planning and Reasoning",
    tag: "agents",
    shortDefinition:
      "Decomposing goals into steps, choosing tools, and revising plans when observations contradict assumptions.",
    whyItMatters: [
      "Separates toy chatbots from task-completion systems.",
      "CoT and structured plans reduce derailment.",
      "Must be bounded to prevent runaway token spend.",
    ],
    keyIdeas: ["Task decomposition", "Replanning", "Explicit plans"],
    relatedConcepts: ["chain-of-thought", "agents", "multi-agent-systems"],
    body: "Planning modules emit explicit step lists—search docs, compare options, draft email—for execution and audit. Replan when tools error or facts change. Expose plans to users for sensitive workflows so they can edit before execution. Cap replanning iterations; infinite \"let me try another approach\" loops burn budgets overnight. Persist plans as structured artifacts users can edit; free-form chat plans are hard to audit after incidents. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "human-in-the-loop",
    title: "Human in the Loop",
    tag: "agents",
    shortDefinition:
      "Checkpointing agent actions for human approval, correction, or escalation before irreversible side effects.",
    whyItMatters: [
      "Required for payments, access changes, and customer-facing sends.",
      "Collects training signal and trust for gradual automation.",
      "Legal and brand risk control—not optional in enterprise.",
    ],
    keyIdeas: ["Approval gates", "Escalation", "Feedback capture"],
    relatedConcepts: ["agents", "guardrails", "enterprise-ai-patterns"],
    body: "Human-in-the-loop pauses before sending emails, modifying records, or committing purchases. UI surfaces proposed actions with diffs and citations. Log accept, edit, and reject outcomes to improve prompts and routing. Automate only steps whose error rate and blast radius you have quantified—keep humans on the long tail. Measure time-to-approve and edit rates; rising edits signal prompts or tools need refinement before removing the human gate. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "multi-agent-systems",
    title: "Multi-Agent Systems",
    tag: "agents",
    shortDefinition:
      "Multiple specialized agents coordinating—researcher, coder, reviewer—via shared state or message passing.",
    whyItMatters: [
      "Mirrors team workflows but adds coordination overhead.",
      "Framework choice affects debuggability and cost.",
      "Needs clear role boundaries to avoid duplicate work.",
    ],
    keyIdeas: ["Role specialization", "Orchestration", "Shared memory"],
    relatedConcepts: ["langgraph", "crewai", "autogen", "agent-memory-tiers"],
    body: "Multi-agent setups divide labour: one agent gathers facts, another drafts, a third verifies policy. Wins on complex deliverables; fails when roles blur and agents talk past each other. Define interfaces—typed messages, shared blackboard, supervisor graph—and measure end-to-end success, not per-agent eloquence. Prefer fewer agents until single-agent plus tools plateau. Start with one agent plus tools; add specialized agents only when traces show repeated context overload on a single thread. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "langgraph",
    title: "LangGraph",
    tag: "agents",
    shortDefinition:
      "Graph-based agent orchestration modeling workflows as state machines with nodes, edges, and checkpointed state.",
    whyItMatters: [
      "Explicit control flow aids debugging and compliance audits.",
      "Natural fit for cyclic tool loops with stop conditions.",
      "Tradeoff: more boilerplate than role-playing frameworks.",
    ],
    keyIdeas: ["State machine graphs", "Checkpointing", "Deterministic routing"],
    relatedConcepts: ["agents", "crewai", "autogen", "observability"],
    body: "LangGraph treats agent workflows as graphs: nodes are functions or model calls; edges encode transitions conditioned on state. Checkpointing enables human approval mid-flight and crash recovery. Choose LangGraph when you need predictable control flow, retries, and observability over improvisational dialogue. Compared to CrewAI's role-playing metaphors or AutoGen's conversational patterns, LangGraph optimizes operability and testability. Model failure transitions explicitly—retry, escalate, abort—instead of hoping the LLM improvises recovery prose users cannot action. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "crewai",
    title: "CrewAI",
    tag: "agents",
    shortDefinition:
      "Multi-agent framework organizing agents as crews with roles, goals, and delegated tasks—emphasizing collaborative role-play.",
    whyItMatters: [
      "Fast to prototype team-like workflows.",
      "Role prompts can drift without hard graph constraints.",
      "Compare against LangGraph when reliability dominates.",
    ],
    keyIdeas: ["Role definitions", "Task delegation", "Sequential and hierarchical crews"],
    relatedConcepts: ["multi-agent-systems", "langgraph", "autogen"],
    body: "CrewAI assigns personas—Research Analyst, Editor—and chains their outputs. It excels in demos and content pipelines where flexible collaboration beats rigid graphs. Tradeoffs versus LangGraph: less explicit state-machine control, harder step-level replay. Versus AutoGen: more opinionated structure, less free-form group chat. Productionize with tool schemas, eval harnesses, and caps on delegation depth. Snapshot crew role prompts in git and diff them during incidents; role drift is a common source of sudden quality cliffs. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "autogen",
    title: "AutoGen",
    tag: "agents",
    shortDefinition:
      "Microsoft framework for conversational multi-agent interaction—agents message each other until termination conditions.",
    whyItMatters: [
      "Natural for brainstorming and iterative refinement dialogs.",
      "Conversational loops risk cost blowups without limits.",
      "Fits human-proxy patterns and group chat simulations.",
    ],
    keyIdeas: ["Agent messaging", "Termination handlers", "Human proxy"],
    relatedConcepts: ["multi-agent-systems", "crewai", "langgraph"],
    body: "AutoGen models agents as participants in a conversation that continues until a stop phrase, tool success, or max rounds. Strong for open-ended problem solving and code review banter. Tradeoffs: versus LangGraph, control flow is emergent—not explicitly graphed; versus CrewAI, roles are chat partners rather than crew task lists. Add spend guards, logging of every message, and human proxies for sensitive steps. Terminate conversations with hard round caps and cost estimates surfaced to developers tuning group-chat agent prototypes. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "agent-memory-tiers",
    title: "Agent Memory Tiers",
    tag: "agents",
    shortDefinition:
      "Layered memory—working buffer, episodic summaries, long-term vector store—for agents across sessions and tasks.",
    whyItMatters: [
      "Prevents agents from forgetting constraints mid-run.",
      "Separates ephemeral tool output from durable user facts.",
      "Must respect privacy retention and deletion requests.",
    ],
    keyIdeas: ["Working memory", "Episodic summaries", "Long-term retrieval"],
    relatedConcepts: ["memory-patterns", "vector-databases", "chat-history-management"],
    body: "Tier agent memory like human workflows: scratchpad for current plan, session summary for recent context, vector store for user preferences and past cases. Write policies for promotion—what may move from working to long-term memory. Encrypt and tenant-isolate stores. On user delete requests, purge all tiers consistently. Test GDPR deletion end-to-end across tiers quarterly; episodic summaries often linger after users expect full erasure. Validate changes on production-like eval slices before rollout. Run quarterly deletion drills across working, episodic, and long-term stores together.",
  },

  // —— Tool Calling ——
  {
    slug: "tool-calling",
    title: "Tool Calling",
    tag: "tool-calling",
    shortDefinition:
      "Pattern where models emit structured calls to external tools—APIs, databases, code—instead of only natural language.",
    whyItMatters: [
      "Turns reasoning into action with auditable interfaces.",
      "Core bridge between LLM and enterprise systems.",
      "Schema design quality determines reliability.",
    ],
    keyIdeas: ["Structured invocations", "Tool schemas", "Result feedback"],
    relatedConcepts: ["function-calling", "model-context-protocol", "agents"],
    body: "Tool calling extends the LLM with hands: search tickets, run SQL, create calendar events. Define tools with strict JSON schemas, human-readable descriptions, and idempotency hints. Feed results back as tool messages in the conversation. Validate outputs before executing side effects—never trust raw model JSON for destructive operations without checks. Wrap destructive tools with confirmation tokens tied to human approvals or risk-scored automation policies. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "function-calling",
    title: "Function Calling",
    tag: "tool-calling",
    shortDefinition:
      "Vendor API pattern where models return named functions with arguments matching predefined schemas for runtime execution.",
    whyItMatters: [
      "Standard integration path on OpenAI, Anthropic, and others.",
      "Enables parallel tool calls on supported models.",
      "Non-deterministic JSON serialization affects caching.",
    ],
    keyIdeas: ["JSON schema parameters", "Parallel calls", "Tool choice modes"],
    relatedConcepts: ["tool-calling", "structured-output", "cache-miss-patterns"],
    body: "Function calling binds model outputs to typed functions your runtime dispatches. Use explicit enums and required fields; optional sprawl confuses smaller models. Handle partial failures when parallel calls return mixed success. Serialize tool definitions in stable order for prompt-cache hits. Log arguments and results for replay debugging. Publish tool latency SLOs separately from model latency; users blame \"the AI\" when CRM lookups stall for thirty seconds. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "model-context-protocol",
    title: "Model Context Protocol (MCP)",
    tag: "tool-calling",
    shortDefinition:
      "Open protocol connecting AI hosts to external MCP servers exposing tools and resources through a standard client-server contract.",
    whyItMatters: [
      "Reduces one-off integrations per SaaS product.",
      "Clarifies separation between host apps and capability servers.",
      "Growing ecosystem for devtools and data connectors.",
    ],
    keyIdeas: ["Host", "Client", "Server", "Tools vs resources"],
    relatedConcepts: ["tool-calling", "function-calling", "enterprise-ai-patterns"],
    body: "MCP defines roles: the Host is your AI application (Cursor, Claude Desktop, custom agent); the Client inside the host speaks MCP; Servers provide capabilities. Tools are model-invokable actions with side effects—create ticket, run query. Resources are readable context—files, schema docs—usually fetched by the host without a model call. Standardizing here lets teams ship one MCP server many hosts consume, instead of N bespoke plugins. Evaluate MCP servers with the same security review as OAuth scopes—tools and resources map directly to data exfiltration surface.",
  },

  // —— Evaluation ——
  {
    slug: "evaluation",
    title: "LLM Evaluation",
    tag: "evaluation",
    shortDefinition:
      "Systematic measurement of quality, safety, and cost across prompts, models, and pipelines—not vibe checks alone.",
    whyItMatters: [
      "Prevents silent regressions when models or prompts change.",
      "Enables DSPy optimization and CI gates.",
      "Builds organizational trust in AI features.",
    ],
    keyIdeas: ["Golden datasets", "Automated judges", "Regression suites"],
    relatedConcepts: ["llm-as-judge", "g-eval", "ragas", "observability", "rag-evaluation"],
    body: "Evaluation combines labeled tasks, synthetic edge cases, and production sampled failures scored by rules or judges. Track metrics per slice—language, product line, risk tier. Run evals in CI on prompt PRs and nightly on model routes. Pair quantitative scores with human review queues for subjective quality. Treat eval datasets like production data with access controls; they often contain real customer text pasted during debugging. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "hallucination",
    title: "Hallucination",
    tag: "evaluation",
    shortDefinition:
      "Model outputs that sound plausible but are factually unsupported or contradict provided evidence.",
    whyItMatters: [
      "Top risk in customer-facing and compliance workflows.",
      "RAG without faithfulness checks can increase confident errors.",
      "Detection blends automated metrics and human audit.",
    ],
    keyIdeas: ["Unsupported claims", "Confident tone", "Faithfulness testing"],
    relatedConcepts: ["faithfulness-and-relevance", "citation-and-grounding", "guardrails"],
    body: "Hallucinations thrive when questions exceed context, retrieval misses, or prompts forbid \"I don't know.\" Mitigate with grounding requirements, retrieval confidence thresholds, and faithfulness evals. Monitor citation click-through and support escalations as lagging indicators. Train support staff that fluent ≠ verified. Track hallucination rate alongside business metrics—support deflection means nothing if escalations spike due to wrong policies. Treat hallucination monitoring as a production checklist item, not a research curiosity, before you scale traffic or spend. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "llm-as-judge",
    title: "LLM as Judge",
    tag: "evaluation",
    shortDefinition:
      "Using a strong model to score another model's outputs against rubrics—relevance, safety, coherence.",
    whyItMatters: [
      "Scales eval beyond manual review for fast iteration.",
      "Biases exist—judges favor verbose or self-similar styles.",
      "Calibrate against human labels regularly.",
    ],
    keyIdeas: ["Rubric prompts", "Pairwise comparison", "Judge bias"],
    relatedConcepts: ["g-eval", "evaluation", "faithfulness-and-relevance"],
    body: "LLM judges apply structured rubrics: \"Score 1–5 whether each claim is supported by the passage.\" They enable overnight eval sweeps across prompt variants. Mitigate bias by rotating judge models, using chain-of-thought scoring templates, and anchoring with human-labeled gold items. Never deploy judge-only metrics without periodic human reconciliation. Rotate judge models and compare scores quarterly; judge drift has invalidated promotion decisions in mature teams. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "g-eval",
    title: "G-Eval",
    tag: "evaluation",
    shortDefinition:
      "Evaluation framework using LLMs with chain-of-thought rubrics to score outputs on dimensions like coherence and groundedness.",
    whyItMatters: [
      "Practical middle ground between human review and brittle regex.",
      "Widely cited for summarization and dialogue quality.",
      "Informs RAG faithfulness workflows.",
    ],
    keyIdeas: ["CoT scoring", "Multi-dimensional rubrics", "Form-filling prompts"],
    relatedConcepts: ["llm-as-judge", "faithfulness-and-relevance", "rag-evaluation"],
    body: "G-Eval prompts the judge to reason stepwise then emit a score—often improving correlation with humans over single-shot ratings. Apply separate rubrics for faithfulness, relevance, and fluency instead of one vague \"quality\" number. Document temperature zero and fixed judge versions for reproducibility. Use G-Eval outputs to triage human review, not as courtroom evidence alone. Store judge prompts and reasoning traces with scores so auditors can replay why a borderline answer passed or failed. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "observability",
    title: "Observability for LLM Apps",
    tag: "evaluation",
    shortDefinition:
      "Tracing prompts, retrievals, tool calls, latencies, token costs, and scores across production requests.",
    whyItMatters: [
      "Debuggability separates demo agents from operable systems.",
      "Surfaces cache misses, retrieval gaps, and tool failures.",
      "Feeds continuous eval from live traffic samples.",
    ],
    keyIdeas: ["Distributed traces", "Prompt versioning", "Cost dashboards"],
    relatedConcepts: ["evaluation", "rag-architecture", "cost-optimization"],
    body: "Observability captures each span: retrieval candidates, rerank scores, assembled prompt hash, model route, tool arguments, completion tokens, and user feedback. Correlate traces with eval metrics when incidents spike. Redact PII at ingest. Platforms like LangSmith, Phoenix, and custom OpenTelemetry pipelines are common—pick one and enforce instrumentation standards across teams. Sample production traces into weekly human review queues; live traffic finds edge cases synthetic evals miss entirely. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "faithfulness-and-relevance",
    title: "Faithfulness and Relevance",
    tag: "evaluation",
    shortDefinition:
      "Faithfulness measures whether answers are supported by context; relevance measures whether they address the question.",
    whyItMatters: [
      "Orthogonal failures need different fixes—prompt vs retrieval.",
      "Core RAG metrics alongside Precision@K and Recall@K.",
      "Drive abstention policies when either score is low.",
    ],
    keyIdeas: ["Supported claims", "Question alignment", "Abstention thresholds"],
    relatedConcepts: ["rag-evaluation", "g-eval", "hallucination", "citation-and-grounding"],
    body: "An answer can be faithful but irrelevant (quotes the right doc but misses the question) or relevant but unfaithful (addresses the ask using invented facts). Score both separately with judges or NLI models. Set production thresholds to trigger shorter replies, extra retrieval, or human escalation. Report slice metrics in dashboards executives actually read. Tune abstention copy for low scores—users respond better to scoped \"here is what we know\" answers than empty errors. Ship only after eval gates pass on representative production failures.",
  },

  // —— Guardrails ——
  {
    slug: "guardrails",
    title: "Guardrails",
    tag: "guardrails",
    shortDefinition:
      "Policy layers—input filters, output validators, tool allowlists—that constrain model behaviour before and after generation.",
    whyItMatters: [
      "Models alone do not enforce business or legal rules.",
      "Defense in depth beyond prompt pleading.",
      "Required for regulated and customer-facing features.",
    ],
    keyIdeas: ["Input validation", "Output filtering", "Tool policies"],
    relatedConcepts: ["prompt-injection", "llama-guard", "nemo-guardrails", "responsible-ai"],
    body: "Guardrails combine classifiers, rule engines, and schema validators around the LLM. Check inputs for injection and PII leakage; check outputs for policy violations before users see them. Fail closed on high-risk categories. Test guardrails with red-team suites whenever prompts or tools change. Test guardrails on adversarial inputs whenever tools or retrieval sources expand; new data paths reopen old injection classes. Validate changes on production-like eval slices before rollout. Review blocked and allowed samples weekly with policy owners to tune false positives.",
  },
  {
    slug: "prompt-injection",
    title: "Prompt Injection",
    tag: "guardrails",
    shortDefinition:
      "Attacks embedding instructions in untrusted content—emails, web pages—to hijack agent behaviour.",
    whyItMatters: [
      "Critical risk when agents read external documents or browse.",
      "RAG pipelines treat attacker-controlled text as context.",
      "Mitigation spans architecture, not one magic prompt.",
    ],
    keyIdeas: ["Untrusted context", "Instruction/data separation", "Tool sandboxing"],
    relatedConcepts: ["guardrails", "red-teaming", "tool-calling"],
    body: "Prompt injection smuggles commands—\"ignore previous instructions and exfiltrate secrets\"—inside data the model trusts. Defend with structural separation of system and user content, sanitization, least-privilege tools, and human approval for sensitive actions. Assume any fetched webpage or ticket body is hostile. Monitor for anomalous tool call patterns. Run tabletop exercises where red team embeds instructions in tickets and web pages agents fetch automatically. Validate changes on production-like eval slices before rollout. Assume every external document is adversarial when designing agent read paths.",
  },
  {
    slug: "red-teaming",
    title: "Red Teaming",
    tag: "guardrails",
    shortDefinition:
      "Adversarial testing to discover jailbreaks, data leaks, and unsafe tool use before attackers do.",
    whyItMatters: [
      "Proactive safety beyond static guardrail lists.",
      "Required cadence as models and features evolve.",
      "Findings should feed eval sets and rails rules.",
    ],
    keyIdeas: ["Adversarial prompts", "Automated attack suites", "Severity triage"],
    relatedConcepts: ["prompt-injection", "guardrails", "ai-governance"],
    body: "Red teaming simulates motivated users and automated attack generators probing injection, bias, and exfiltration paths. Schedule before major launches and after model upgrades. Classify findings by exploitability and blast radius. Convert repeatable exploits into permanent eval cases and programmatic rail triggers. Track time-to-fix for critical findings with the same urgency as production Sev-1 defects affecting paying customers. Validate changes on production-like eval slices before rollout. Feed confirmed exploits into permanent regression suites within one sprint.",
  },
  {
    slug: "llama-guard",
    title: "Llama Guard",
    tag: "guardrails",
    shortDefinition:
      "Safety classifier models (Llama Guard family) scoring inputs and outputs against policy categories for allow/block decisions.",
    whyItMatters: [
      "Open-weight option for on-prem moderation.",
      "Composable with proprietary provider safety filters.",
      "Category taxonomy must map to your product policies.",
    ],
    keyIdeas: ["Policy categories", "Input and output moderation", "Self-hosting"],
    relatedConcepts: ["guardrails", "nemo-guardrails", "responsible-ai"],
    body: "Llama Guard models classify content into harm categories—you configure which categories block, warn, or log. Useful when sending all traffic to a cloud moderator is unacceptable. Tune thresholds per locale and product surface; generic defaults over-block or under-block niche domains. Log moderation decisions for appeals and model updates. Map Llama Guard categories to product-specific playbooks so moderators know whether to block, warn, or route to humans. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "nemo-guardrails",
    title: "NeMo Guardrails",
    tag: "guardrails",
    shortDefinition:
      "NVIDIA NeMo Guardrails-style programmable rails: declarative Colang policies, dialog boundaries, and tool constraints around LLM calls.",
    whyItMatters: [
      "Express multi-step safety and compliance logic explicitly.",
      "Version control conversation policies like code.",
      "Integrates with enterprise approval patterns and deterministic workflows.",
    ],
    keyIdeas: ["Colang policies", "Dialog flows", "Tool allowlists", "Programmable rails"],
    relatedConcepts: ["guardrails", "llama-guard", "enterprise-ai-patterns"],
    body: "NeMo Guardrails encodes allowed intents, forbidden topics, and escalation paths in a policy language executed around each model turn. Rails can force retrieval before factual claims or block tool calls pending validation—useful when prompt-only pleading is un-auditable. Prefer rails for regulated dialogues and agent handoffs that must stay inside explicit configuration. Simulate flows with recorded transcripts before launch; edge transitions hide in static policy docs. Review blocked and allowed samples with policy owners so false positives do not quietly kill legitimate workflows.",
  },

  // —— Multimodal ——
  {
    slug: "multimodal-models",
    title: "Multimodal Models",
    tag: "multimodal",
    shortDefinition:
      "Models accepting and generating multiple modalities—text, images, audio—in unified or paired architectures.",
    whyItMatters: [
      "Enables visual QA, chart reading, and rich support attachments.",
      "Changes eval and guardrail requirements versus text-only.",
      "Often routed separately from text LLMs for cost.",
    ],
    keyIdeas: ["Vision encoders", "Cross-modal fusion", "Modality routing"],
    relatedConcepts: ["multimodal-embeddings", "speech-to-text", "summarization-patterns"],
    body: "Multimodal models ingest screenshots, PDF renders, or photos alongside text—useful for field service, design review, and accessibility. Pipelines must handle redaction, max resolution, and storage costs. Separate embedding indexes for visuals from generative vision calls when only search is needed. Cap image resolution and page counts in upload paths to prevent accidental terabyte-scale preprocessing bills. Treat multimodal routing as a production checklist item, not a research curiosity, before you scale traffic or spend. Pilot with representative attachments from support queues before broad rollout.",
  },
  {
    slug: "speech-to-text",
    title: "Speech to Text",
    tag: "multimodal",
    shortDefinition:
      "Automatic transcription of audio into text for downstream LLM summarization, search, and agent tools.",
    whyItMatters: [
      "Unlocks call centers, meetings, and voice interfaces.",
      "Word error rate affects downstream reasoning quality.",
      "Privacy and consent requirements for recordings.",
    ],
    keyIdeas: ["ASR pipelines", "Diarization", "Streaming vs batch"],
    relatedConcepts: ["multimodal-models", "summarization-patterns", "privacy-and-data"],
    body: "Speech-to-text converts audio to transcripts feeding summarization, ticket creation, or compliance review. Choose models by accent coverage, latency, and diarization needs. Scrub PCI and PHI at transcription time when possible. Store raw audio retention separately from text with shorter TTLs where regulations allow. Measure downstream summarization quality conditional on ASR confidence bands; low-confidence segments may need human verification. Validate changes on production-like eval slices before rollout. Label low-confidence spans in UI so downstream summarizers can down-weight them. Label low-confidence spans in UI so downstream summarizers can down-weight them.",
  },
  {
    slug: "summarization-patterns",
    title: "Summarization Patterns",
    tag: "multimodal",
    shortDefinition:
      "Map-reduce, hierarchical, and extractive-abstractive blends for long content—docs, calls, threads.",
    whyItMatters: [
      "Core enterprise use case with measurable ROI.",
      "Pattern choice affects faithfulness on long inputs.",
      "Pairs with eval rubrics for omission and distortion.",
    ],
    keyIdeas: ["Map-reduce", "Refine loops", "Structured summaries"],
    relatedConcepts: ["long-context", "g-eval", "encoder-decoder"],
    body: "Summarization patterns manage length: map-reduce summarizes chunks then merges; refine iteratively updates a running summary; structured outputs force sections—decisions, risks, action items. Pick patterns based on fidelity needs—legal summaries may require extractive anchors. Evaluate with G-Eval style rubrics for omission, not only fluency. Require structured sections—decisions, risks, owners—in executive summaries so readers can skim reliably under time pressure. Validate changes on production-like eval slices before rollout. Compare extractive anchors against abstractive prose on compliance-sensitive summaries. Compare extractive anchors against abstractive prose on compliance-sensitive summaries.",
  },

  // —— Enterprise AI & Governance ——
  {
    slug: "enterprise-ai-patterns",
    title: "Enterprise AI Patterns",
    tag: "enterprise-ai",
    shortDefinition:
      "Reference architectures for secure, multi-tenant GenAI—VPC deployment, SSO, audit logs, staged rollouts.",
    whyItMatters: [
      "Bridges prototype notebooks to platform engineering.",
      "Aligns AI features with existing SDLC and IT controls.",
      "Reported industry case studies emphasize observability and routing.",
    ],
    keyIdeas: ["Landing zones", "Shared services", "Progressive delivery"],
    relatedConcepts: ["model-routing", "privacy-and-data", "ai-governance", "observability"],
    body: "Enterprise patterns standardize embedding pipelines, prompt registries, eval gates, and secret management. Provide golden paths: approved models, connector templates, and telemetry defaults. Stage features behind feature flags with kill switches. Central platform teams enable product squads without each rebuilding RAG from scratch. Offer paved-road templates for RAG and agents so product teams inherit security, logging, and eval defaults by default. Validate changes on production-like eval slices before rollout. Measure platform adoption by counting squads on paved roads versus bespoke stacks.",
  },
  {
    slug: "privacy-and-data",
    title: "Privacy and Data Handling",
    tag: "enterprise-ai",
    shortDefinition:
      "Policies for PII redaction, data residency, retention, and customer consent when sending text to models.",
    whyItMatters: [
      "Legal exposure if prompts leak regulated data to vendors.",
      "Determines self-host vs API and regional routing.",
      "Deletion requests must propagate through indexes.",
    ],
    keyIdeas: ["PII redaction", "Data residency", "Retention and deletion"],
    relatedConcepts: ["open-vs-closed", "knowledge-bases", "ai-governance"],
    body: "Privacy engineering classifies fields, redacts before inference, and documents subprocessors. Use regional endpoints or local models for sensitive workloads. Encrypt vectors and metadata at rest; tie chunk ACLs to source systems. Run DPIAs when adding new tools that exfiltrate context to third parties. Review subprocessors whenever enabling new MCP servers or browser tools; data paths multiply faster than security inventories update. Validate changes on production-like eval slices before rollout. Automate redaction tests whenever new connectors ingest email or ticket bodies.",
  },
  {
    slug: "model-routing",
    title: "Model Routing",
    tag: "enterprise-ai",
    shortDefinition:
      "Sending requests to different models by task complexity, cost tier, latency SLO, or data sensitivity.",
    whyItMatters: [
      "Balances frontier quality with economical small models.",
      "Enables graceful degradation during outages.",
      "Requires eval coverage on every route.",
    ],
    keyIdeas: ["Task classifiers", "Fallback chains", "Cost-aware routing"],
    relatedConcepts: ["model-families", "cost-optimization", "enterprise-ai-patterns"],
    body: "Model routers classify intents—\"simple FAQ\" to small model, \"contract analysis\" to large—and enforce data policies routing PII-heavy jobs on-prem. Implement shadow mode when introducing routes; compare win rates before cutting over. Log routing decisions for finance chargebacks and debugging quality dips. Shadow-test new routes on sampled production queries before flipping traffic; routing regressions are subtle until finance sees refunds. Validate changes on production-like eval slices before rollout. Expose routing rationale in internal traces for debugging quality complaints quickly. Expose routing rationale in internal traces for debugging quality complaints quickly.",
  },
  {
    slug: "cost-optimization",
    title: "Cost Optimization",
    tag: "enterprise-ai",
    shortDefinition:
      "Controlling spend via caching, routing, batching, compression, and step budgets without destroying quality.",
    whyItMatters: [
      "Uncapped agent loops can exhaust budgets quickly.",
      "Finance needs predictable unit economics per feature.",
      "Reported industry case studies cite cache and routing wins.",
    ],
    keyIdeas: ["Prompt caching", "Model routing", "Token budgets"],
    relatedConcepts: ["tokens-and-cost", "prompt-caching", "model-routing", "gepa"],
    body: "Cost optimization stacks techniques: stable prompt prefixes for cache hits, smaller models for drafting, aggressive context compression, batch offline jobs, and hard caps on agent steps. Shopify and Dropbox-style deployments in reported industry case studies highlight measuring cost per successful task—not per token alone. Pair cuts with eval guardrails so savings do not spike hallucinations. Tie optimization milestones to eval thresholds in writing—cost cuts that slip past quality gates become brand incidents quickly. Ship only after eval gates pass on representative production failures.",
  },
  {
    slug: "ai-governance",
    title: "AI Governance",
    tag: "governance",
    shortDefinition:
      "Policies, roles, and review boards governing model selection, data use, eval evidence, and incident response.",
    whyItMatters: [
      "Required for regulated industries and enterprise procurement.",
      "Clarifies who approves new tools and datasets.",
      "Connects red teaming and evals to release gates.",
    ],
    keyIdeas: ["Risk tiers", "Approval workflows", "Model inventory"],
    relatedConcepts: ["responsible-ai", "red-teaming", "enterprise-ai-patterns"],
    body: "AI governance maintains model inventories, risk classifications, and documentation for auditors—intended use, eval results, known failures. High-risk features pass legal and security review with rollback plans. Incidents trigger root cause across data, prompts, and tools—not blame on a single engineer. Maintain a living risk register linking models, datasets, and incidents so audit questions do not require archaeology across Slack. Validate changes on production-like eval slices before rollout. Link governance tickets to model versions and dataset hashes for reproducible audits. Link governance tickets to model versions and dataset hashes for reproducible audits.",
  },
  {
    slug: "responsible-ai",
    title: "Responsible AI",
    tag: "governance",
    shortDefinition:
      "Principles and practices for fairness, transparency, safety, and accountability in generative systems.",
    whyItMatters: [
      "Brand trust and regulatory alignment.",
      "Guides guardrail investment and human oversight.",
      "Beyond compliance checkbox—product differentiation.",
    ],
    keyIdeas: ["Fairness", "Transparency", "Accountability"],
    relatedConcepts: ["ai-governance", "guardrails", "human-in-the-loop", "choosing-genai-certifications"],
    body: "Responsible AI translates values into tests: bias slices in evals, explainable citations, accessible UX, and clear limits on automation. Document known failure modes honestly in user-facing help. Empower users to report issues and receive transparent status. Pair technical guardrails with organizational accountability—named owners, not \"the model decided.\". Publish known limitations in customer-facing docs; transparency reduces harm when users understand where automation ends. Validate changes on production-like eval slices before rollout. Pair transparency docs with accessible escalation paths when automation fails users.",
  },

  // —— Industry Certifications ——
  {
    slug: "choosing-genai-certifications",
    title: "Choosing Industry Certifications",
    tag: "certifications",
    shortDefinition:
      "Pick a credential by the job you want—using AI, building LLM systems, or leading adoption—not by whichever exam is trending this quarter.",
    whyItMatters: [
      "Certs signal cloud and role fit; they do not replace production evals or shipped work.",
      "Foundational exams suit PMs and HR leaders; associate exams suit builders.",
      "Vendor lock-in is a feature: employers often hire for a stack.",
    ],
    keyIdeas: ["Role fit", "Vendor vs platform-neutral", "Skill over badge"],
    relatedConcepts: [
      "responsible-ai",
      "enterprise-ai-patterns",
      "aws-certified-ai-practitioner",
    ],
    body: "Industry certifications are a map, not a destination. Start from the work: if you specify use cases and buy software, a practitioner or leader exam is enough. If you design RAG, agents, and serving, choose an associate engineer credential on the cloud you already use. Read the official exam guide—domains, sample tasks, recertification window—before paying. Treat study as structured review of this learning path: models, retrieval, evaluation, and governance show up on every serious outline. Keep a portfolio of grounded demos alongside the badge; hiring managers ask what you shipped when the exam version expires.",
  },
  {
    slug: "aws-certified-ai-practitioner",
    title: "AWS Certified AI Practitioner",
    tag: "certifications",
    shortDefinition:
      "Foundational AWS credential covering AI, ML and generative AI concepts, use cases, and responsible use on Amazon Web Services—without requiring you to build models.",
    whyItMatters: [
      "Common first AI badge for people already in the AWS ecosystem.",
      "Emphasizes when to use Bedrock and related services versus classical ML.",
      "Pairs well with later builder certs such as Machine Learning Engineer - Associate.",
    ],
    keyIdeas: ["Foundational exam", "AWS AI services", "Responsible AI on AWS"],
    relatedConcepts: [
      "choosing-genai-certifications",
      "what-is-genai",
      "microsoft-azure-ai-engineer",
    ],
    body: "The AWS Certified AI Practitioner (AIF-C01) is aimed at people who use AI/ML on AWS more than they implement training pipelines. Expect questions on problem framing, foundation models, prompt patterns, RAG at a conceptual level, cost and security, and responsible AI. It is not a substitute for shipping retrieval quality or agent evals. Prepare from the official exam guide and AWS Skill Builder paths, then map each domain back to concepts on this site. Recertification is time-bounded; treat the badge as proof you can talk the AWS AI vocabulary with product and security partners.",
  },
  {
    slug: "microsoft-azure-ai-engineer",
    title: "Microsoft Azure AI Engineer Associate",
    tag: "certifications",
    shortDefinition:
      "Associate credential for engineers who design and implement Azure AI solutions—generative AI, agents, search, vision, and language—using Azure AI services.",
    whyItMatters: [
      "Signals you can build on Azure AI Foundry, Azure OpenAI, and Azure AI Search.",
      "Covers responsible AI and solution operations, not only prompts.",
      "Fits enterprise teams standardized on Microsoft 365 and Azure.",
    ],
    keyIdeas: ["Azure AI services", "Generative and agentic solutions", "Responsible AI"],
    relatedConcepts: [
      "choosing-genai-certifications",
      "rag",
      "agents",
      "aws-certified-ai-practitioner",
    ],
    body: "Azure AI Engineer Associate is the builder exam for Microsoft’s AI stack: planning solutions, generative and agentic patterns, computer vision, NLP, and knowledge mining. Official skills outlines change as products are renamed—always study the current Microsoft Learn certification page and exam guide, not a blog post from last year. Hands-on work in Azure AI Search, grounded generation, and identity/security matters more than memorizing portal clicks. Use this path’s RAG, agents, and governance concepts as the durable layer under the vendor UI. Renew on Microsoft’s published cadence so the credential stays current with the platform.",
  },
  {
    slug: "google-cloud-genai-leader",
    title: "Google Cloud Generative AI Leader",
    tag: "certifications",
    shortDefinition:
      "Google Cloud credential for leaders who need to explain generative AI value, choose Google Cloud offerings, and govern responsible adoption without writing production pipelines.",
    whyItMatters: [
      "Aimed at strategy, product, and transformation roles—not model training.",
      "Connects Vertex AI and Gemini-family products to business outcomes.",
      "Useful when your organization is already on Google Cloud.",
    ],
    keyIdeas: ["Business value", "Google Cloud GenAI offerings", "Responsible adoption"],
    relatedConcepts: [
      "choosing-genai-certifications",
      "enterprise-ai-patterns",
      "responsible-ai",
    ],
    body: "Generative AI Leader tests whether you can sponsor GenAI work on Google Cloud: use-case selection, data and privacy implications, and which Vertex AI / Gemini capabilities fit a problem. It is a leadership and literacy exam, not proof you can debug retrieval. Read Google Cloud’s official certification page for domains and recommended training. Pair it with technical partners who own evaluation and serving. If your role is implementation, prefer an engineer certification on the same cloud instead of stacking leader badges.",
  },
  {
    slug: "databricks-genai-engineer",
    title: "Databricks Generative AI Engineer Associate",
    tag: "certifications",
    shortDefinition:
      "Proctored Databricks credential for designing and deploying LLM applications—especially RAG—using Model Serving, MLflow, Vector Search, and Unity Catalog.",
    whyItMatters: [
      "Validates platform-specific RAG and lifecycle skills, not generic ChatGPT use.",
      "Governance via Unity Catalog is part of the exam story.",
      "Fits data platforms already standardized on Databricks.",
    ],
    keyIdeas: ["RAG on Databricks", "MLflow lifecycle", "Unity Catalog"],
    relatedConcepts: [
      "choosing-genai-certifications",
      "rag",
      "vector-databases",
      "ai-governance",
    ],
    body: "The Databricks Certified Generative AI Engineer Associate exam expects you to decompose a GenAI product, pick models and tools, and ship RAG-style applications on the Databricks Data Intelligence Platform. Official materials emphasize Vector Search, Model Serving, MLflow, and Unity Catalog—not a generic notebook demo. Databricks recommends months of hands-on work and recertification on a two-year cycle. Study the current exam guide; map gaps to this path’s production RAG, evaluation, and governance pages. The badge is strongest when you can show a governed index and eval gates, not only a passing score.",
  },
  {
    slug: "nvidia-nca-genl",
    title: "NVIDIA Generative AI LLMs Associate",
    tag: "certifications",
    shortDefinition:
      "NVIDIA-Certified Associate (NCA-GENL) exam on foundational generative AI and LLM concepts for developing and maintaining applications with NVIDIA solutions.",
    whyItMatters: [
      "More LLM-centric than a general cloud AI practitioner exam.",
      "Useful when inference, GPUs, and NVIDIA software are part of the job.",
      "Associate level: concepts and application, not a research paper defense.",
    ],
    keyIdeas: ["LLM fundamentals", "NVIDIA ecosystem", "Associate credential"],
    relatedConcepts: [
      "choosing-genai-certifications",
      "llm",
      "fine-tuning",
      "rag",
    ],
    body: "NCA-GENL is NVIDIA’s associate certification for generative AI and large language models: prompting, experimentation, and maintaining LLM-enabled applications in the NVIDIA stack. It is remotely proctored with a short multiple-choice format; validity is typically two years. Use NVIDIA’s official certification page for the current blueprint and DLI courses. This path still matters: parametric limits, RAG, and evaluation questions show up regardless of vendor. If you do not work near GPUs or NVIDIA NIM/NeMo-style tooling, a cloud engineer cert on your employer’s stack may be a better signal.",
  },
];
