/**
 * Provider interfaces for the research pipeline (Phase 7 — not yet active).
 *
 * The pipeline depends only on these interfaces so that Tavily, Exa or any
 * other search provider — and any LLM API — can be swapped via configuration
 * without changing the rest of the system.
 *
 * Credentials must only ever come from environment variables (GitHub Actions
 * secrets / local .env). Never expose keys to browser code.
 */

export interface SearchResult {
  url: string;
  title: string;
  snippet?: string;
  publishedDate?: string;
}

export interface SearchProvider {
  /** e.g. "tavily", "exa" — matches the RESEARCH_PROVIDER env variable. */
  readonly name: string;
  search(query: string, options?: { maxResults?: number }): Promise<SearchResult[]>;
}

export interface ExtractedSource {
  url: string;
  title: string;
  /** Main textual content of the page, cleaned of navigation/boilerplate. */
  content: string;
}

export interface SourceExtractor {
  extract(url: string): Promise<ExtractedSource>;
}

export interface LlmCompletionOptions {
  /** Contents of a versioned prompt file from research/prompts/. */
  systemPrompt: string;
  input: string;
  /** Request JSON output; providers should enforce it where supported. */
  json?: boolean;
  temperature?: number;
}

export interface LlmProvider {
  /** e.g. "anthropic", "openai" — matches the LLM_MODEL env variable family. */
  readonly name: string;
  complete(options: LlmCompletionOptions): Promise<string>;
}

/**
 * Factory stubs. Phase 7 implements concrete providers here, selected by
 * environment configuration; nothing else in the pipeline should reference
 * a concrete provider.
 */
export function createSearchProvider(): SearchProvider {
  throw new Error(
    "Research pipeline is not active yet. Implement a SearchProvider (e.g. Tavily or Exa) and select it via RESEARCH_PROVIDER.",
  );
}

export function createLlmProvider(): LlmProvider {
  throw new Error(
    "Research pipeline is not active yet. Implement an LlmProvider and select it via LLM_MODEL.",
  );
}
