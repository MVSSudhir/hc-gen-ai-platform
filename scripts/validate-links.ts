/**
 * Internal link validation. Scans markdown bodies, source URLs, homepage
 * explore links, and static hrefs in app/components for routes that exist.
 * Fails (exit 1) on any broken internal link.
 */
import fs from "node:fs";
import path from "node:path";
import { itemPath, loadAllContent } from "../lib/content";
import { exploreByProblem } from "../lib/explore";
import { verticalMeta } from "../lib/site";

const staticRoutes = new Set([
  "/",
  "/genai",
  "/human-capital-ai",
  "/people-analytics",
  "/work",
  "/about",
  "/search",
  "/rss.xml",
]);

const items = loadAllContent();
const validRoutes = new Set([
  ...staticRoutes,
  ...items.map((item) => itemPath(item.meta)),
  ...Object.values(verticalMeta).map((v) => v.path),
]);

let errors = 0;
const linkPattern = /\[[^\]]*\]\((\/[^)\s#?]*)/g;
const hrefPattern =
  /(?:href|canonical)\s*[:=]\s*["'`](\/[^"'`?#]*)["'`]|href=["'`](\/[^"'`?#]*)["'`]/g;

function fail(message: string) {
  console.error(`  ✗ ${message}`);
  errors += 1;
}

function checkRoute(label: string, target: string) {
  const normalized = target.replace(/\/$/, "") || "/";
  if (!validRoutes.has(normalized)) {
    fail(`${label}: broken internal link "${target}"`);
  }
}

for (const item of items) {
  const label = `${item.meta.vertical}/${item.meta.slug}`;

  for (const match of item.body.matchAll(linkPattern)) {
    checkRoute(label, match[1]);
  }

  const sources = (item.meta as unknown as Record<string, unknown>).sources;
  if (Array.isArray(sources)) {
    for (const source of sources as Array<{ id: string; url?: string }>) {
      if (!source.url) {
        fail(`${label}: source "${source.id}" has no URL`);
      }
    }
  }
}

for (const entry of exploreByProblem) {
  for (const link of entry.links) {
    checkRoute(`explore:${entry.problem}`, link.href);
  }
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(tsx|ts)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

for (const file of [
  ...walk(path.join(process.cwd(), "app")),
  ...walk(path.join(process.cwd(), "components")),
  ...walk(path.join(process.cwd(), "lib")),
]) {
  const rel = path.relative(process.cwd(), file);
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(hrefPattern)) {
    const target = match[1] ?? match[2];
    if (!target || target.startsWith("//")) continue;
    if (target.includes("${") || target.includes("[")) continue;
    checkRoute(rel, target);
  }
}

if (errors > 0) {
  console.error(`\nLink validation failed with ${errors} error(s).`);
  process.exit(1);
}
console.log(`Link validation passed (${items.length} items).`);
