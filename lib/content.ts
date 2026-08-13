import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Vertical } from "./site";
import {
  schemaFor,
  type ContentItem,
  type GenaiConcept,
  type HcaiUseCase,
  type PaDashboard,
  type PaItem,
  type PaMethod,
  type PaMetric,
  type WorkProject,
} from "./validation";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface LoadedItem<T extends ContentItem = ContentItem> {
  meta: T;
  /** Markdown body below the frontmatter (may be empty). */
  body: string;
  filePath: string;
}

let cache: LoadedItem[] | null = null;

/**
 * Loads and validates every content file under content/.
 * Invalid files throw so a bad item can never silently reach the build.
 * Cache is used for production builds only — in `next dev` we always
 * re-read disk so newly generated content appears without a restart.
 */
export function loadAllContent(): LoadedItem[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const items: LoadedItem[] = [];
  for (const vertical of fs.readdirSync(CONTENT_DIR)) {
    const dir = path.join(CONTENT_DIR, vertical);
    if (!fs.statSync(dir).isDirectory()) continue;

    for (const file of fs.readdirSync(dir)) {
      if (!/\.(md|mdx)$/.test(file)) continue;
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      let meta: ContentItem;
      try {
        meta = schemaFor(data).parse(data) as ContentItem;
      } catch (error) {
        throw new Error(
          `Invalid content in ${path.relative(process.cwd(), filePath)}:\n${error instanceof Error ? error.message : String(error)}`,
        );
      }

      if (meta.vertical !== vertical) {
        throw new Error(
          `${filePath}: frontmatter vertical "${meta.vertical}" does not match folder "${vertical}"`,
        );
      }

      items.push({ meta, body: content.trim(), filePath });
    }
  }

  const seen = new Set<string>();
  for (const item of items) {
    const key = `${item.meta.vertical}/${item.meta.slug}`;
    if (seen.has(key)) throw new Error(`Duplicate slug: ${key}`);
    seen.add(key);
  }

  cache = items;
  return items;
}

/** Published content only — everything public reads through this. */
export function publishedContent(): LoadedItem[] {
  return loadAllContent().filter((i) => i.meta.status === "published");
}

export function byVertical(vertical: Vertical): LoadedItem[] {
  return publishedContent().filter((i) => i.meta.vertical === vertical);
}

export function getItem(
  vertical: Vertical,
  slug: string,
): LoadedItem | undefined {
  return byVertical(vertical).find((i) => i.meta.slug === slug);
}

export function genaiConcepts(): LoadedItem<GenaiConcept>[] {
  return byVertical("genai") as LoadedItem<GenaiConcept>[];
}

export function hcaiUseCases(): LoadedItem<HcaiUseCase>[] {
  return byVertical("human-capital-ai") as LoadedItem<HcaiUseCase>[];
}

export function paItems(): LoadedItem<PaItem>[] {
  return byVertical("people-analytics") as LoadedItem<PaItem>[];
}

export function paMetrics(): LoadedItem<PaMetric>[] {
  return paItems().filter(
    (i) => i.meta.contentType === "metric",
  ) as LoadedItem<PaMetric>[];
}

export function paMethods(): LoadedItem<PaMethod>[] {
  return paItems().filter(
    (i) => i.meta.contentType === "analytical-method",
  ) as LoadedItem<PaMethod>[];
}

export function paDashboards(): LoadedItem<PaDashboard>[] {
  return paItems().filter(
    (i) => i.meta.contentType === "dashboard-pattern",
  ) as LoadedItem<PaDashboard>[];
}

export function workProjects(): LoadedItem<WorkProject>[] {
  return byVertical("work") as LoadedItem<WorkProject>[];
}

/** Canonical URL path for a content item. */
export function itemPath(meta: ContentItem): string {
  return `/${meta.vertical}/${meta.slug}`;
}

/**
 * Most recently updated published items across the knowledge verticals,
 * capped at two per vertical so the section stays representative rather
 * than becoming a news feed for whichever vertical changed last.
 */
export function latestItems(limit = 6): LoadedItem[] {
  const sorted = publishedContent()
    .filter((i) => i.meta.vertical !== "work")
    .sort((a, b) => b.meta.updatedAt.localeCompare(a.meta.updatedAt));

  const perVertical = new Map<string, number>();
  const picked: LoadedItem[] = [];
  for (const item of sorted) {
    const count = perVertical.get(item.meta.vertical) ?? 0;
    if (count >= 2) continue;
    perVertical.set(item.meta.vertical, count + 1);
    picked.push(item);
    if (picked.length === limit) break;
  }
  return picked;
}
