/**
 * Internal link validation. Scans markdown bodies (and source URLs) for
 * internal links and verifies each target route exists. Fails (exit 1)
 * on any broken internal link.
 */
import { itemPath, loadAllContent } from "../lib/content";

const staticRoutes = new Set([
  "/",
  "/genai",
  "/human-capital-ai",
  "/people-analytics",
  "/work",
  "/about",
  "/search",
]);

const items = loadAllContent();
const validRoutes = new Set([
  ...staticRoutes,
  ...items.map((item) => itemPath(item.meta)),
]);

let errors = 0;
const linkPattern = /\[[^\]]*\]\((\/[^)\s#?]*)/g;

for (const item of items) {
  const label = `${item.meta.vertical}/${item.meta.slug}`;

  for (const match of item.body.matchAll(linkPattern)) {
    const target = match[1].replace(/\/$/, "") || "/";
    if (!validRoutes.has(target)) {
      console.error(`  ✗ ${label}: broken internal link "${match[1]}"`);
      errors += 1;
    }
  }

  const sources = (item.meta as unknown as Record<string, unknown>).sources;
  if (Array.isArray(sources)) {
    for (const source of sources as Array<{ id: string; url?: string }>) {
      if (!source.url) {
        console.error(`  ✗ ${label}: source "${source.id}" has no URL`);
        errors += 1;
      }
    }
  }
}

if (errors > 0) {
  console.error(`\nLink validation failed with ${errors} error(s).`);
  process.exit(1);
}
console.log(`Link validation passed (${items.length} items).`);
