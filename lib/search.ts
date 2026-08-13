/**
 * Shared search-index types and the builder used at build time.
 * The index is emitted as static JSON and queried client-side with Fuse.js —
 * no hosted search service.
 */
import { itemPath, publishedContent } from "./content";

export interface SearchRecord {
  slug: string;
  url: string;
  title: string;
  description: string;
  vertical: "genai" | "human-capital-ai" | "people-analytics" | "work";
  contentType: string;
  tags: string[];
  /** Category/domain plus related-item titles — searchable context. */
  keywords: string[];
}

export function buildSearchIndex(): SearchRecord[] {
  const all = publishedContent();
  const titleBySlug = new Map(all.map((i) => [i.meta.slug, i.meta.title]));

  return all.map(({ meta }) => {
    const record = meta as unknown as Record<string, unknown>;
    const keywords: string[] = [];

    for (const field of ["category", "domain"]) {
      if (typeof record[field] === "string") {
        keywords.push(record[field] as string);
      }
    }
    for (const field of [
      "relatedConcepts",
      "relatedGenAIConcepts",
      "relatedMetrics",
      "relatedUseCases",
      "relatedImplementations",
      "relatedPeopleAnalytics",
      "technologyPatterns",
      "keyIdeas",
    ]) {
      const value = record[field];
      if (Array.isArray(value)) {
        for (const entry of value as string[]) {
          keywords.push(titleBySlug.get(entry) ?? entry);
        }
      }
    }

    return {
      slug: meta.slug,
      url: itemPath(meta),
      title: meta.title,
      description: meta.description,
      vertical: meta.vertical,
      contentType: meta.contentType,
      tags: meta.tags as string[],
      keywords: [...new Set(keywords)],
    };
  });
}
