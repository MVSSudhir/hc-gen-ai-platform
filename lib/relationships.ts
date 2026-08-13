import { itemPath, publishedContent, type LoadedItem } from "./content";
import type { ContentItem } from "./validation";

/** Lightweight, serializable reference to a related content item. */
export interface RelatedRef {
  slug: string;
  title: string;
  url: string;
  vertical: ContentItem["vertical"];
  contentType: string;
}

export interface RelatedGroup {
  label: string;
  items: RelatedRef[];
}

function toRef(item: LoadedItem): RelatedRef {
  return {
    slug: item.meta.slug,
    title: item.meta.title,
    url: itemPath(item.meta),
    vertical: item.meta.vertical,
    contentType: item.meta.contentType,
  };
}

function resolve(slugs: string[] | undefined): RelatedRef[] {
  if (!slugs?.length) return [];
  const all = publishedContent();
  return slugs
    .map((slug) => all.find((i) => i.meta.slug === slug))
    .filter((i): i is LoadedItem => Boolean(i))
    .map(toRef);
}

/** Field names on any schema that hold cross-reference slug arrays. */
const RELATION_FIELDS: Array<{ field: string; label: string }> = [
  { field: "relatedConcepts", label: "Related concepts" },
  { field: "relatedGenAIConcepts", label: "Related GenAI concepts" },
  { field: "relatedImplementations", label: "Related implementations" },
  { field: "relatedUseCases", label: "Related use cases" },
  { field: "relatedPeopleAnalytics", label: "Related People Analytics" },
  { field: "relatedMetrics", label: "Related metrics" },
  { field: "recommendedMetrics", label: "Recommended metrics" },
  { field: "relatedMethods", label: "Related methods" },
  { field: "relatedDashboards", label: "Related dashboards" },
];

/**
 * Resolves every outgoing cross-reference of an item into labeled groups,
 * ready for the Related-content UI.
 */
export function relatedGroups(meta: ContentItem): RelatedGroup[] {
  const record = meta as unknown as Record<string, unknown>;
  const groups: RelatedGroup[] = [];
  const seen = new Set<string>();

  for (const { field, label } of RELATION_FIELDS) {
    const value = record[field];
    if (!Array.isArray(value)) continue;
    const items = resolve(value as string[]).filter((ref) => {
      if (seen.has(ref.url)) return false;
      seen.add(ref.url);
      return true;
    });
    if (items.length) groups.push({ label, items });
  }
  return groups;
}

/**
 * Items elsewhere on the site that reference this item — inverse links,
 * e.g. "Where this concept is used".
 */
export function referencedBy(meta: ContentItem): RelatedRef[] {
  const target = meta.slug;
  return publishedContent()
    .filter((item) => {
      if (item.meta.slug === target) return false;
      const record = item.meta as unknown as Record<string, unknown>;
      return RELATION_FIELDS.some(({ field }) => {
        const value = record[field];
        return Array.isArray(value) && (value as string[]).includes(target);
      });
    })
    .map(toRef);
}

/** All slug references (used by validation to detect dangling links). */
export function outgoingSlugs(meta: ContentItem): string[] {
  const record = meta as unknown as Record<string, unknown>;
  return RELATION_FIELDS.flatMap(({ field }) => {
    const value = record[field];
    return Array.isArray(value) ? (value as string[]) : [];
  });
}
