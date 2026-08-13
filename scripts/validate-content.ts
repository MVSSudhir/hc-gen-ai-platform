/**
 * Content validation gate. Fails (exit 1) on:
 *  - schema violations (required fields, taxonomy values, date formats)
 *  - duplicate slugs (per vertical and globally — cross-refs resolve by slug)
 *  - duplicate ids
 *  - cross-references to slugs that do not exist
 *  - published items referencing unpublished items
 *  - updatedAt earlier than createdAt
 *
 * Runs in prebuild and CI; a failure blocks deployment.
 */
import { loadAllContent } from "../lib/content";
import { outgoingSlugs } from "../lib/relationships";
import { site } from "../lib/site";

if (/example\.com$/i.test(site.url)) {
  console.warn(
    "SITE_URL is unset or still example.com — canonical URLs, sitemap and Open Graph tags will be wrong. Set SITE_URL (see .env.example).",
  );
}

let errors = 0;

function fail(message: string) {
  console.error(`  ✗ ${message}`);
  errors += 1;
}

try {
  // loadAllContent throws on schema violations and duplicate vertical/slug.
  const items = loadAllContent();
  console.log(`Validating ${items.length} content items…`);

  const bySlug = new Map<string, (typeof items)[number]>();
  const seenIds = new Set<string>();

  for (const item of items) {
    const label = `${item.meta.vertical}/${item.meta.slug}`;

    if (seenIds.has(item.meta.id)) {
      fail(`${label}: duplicate id "${item.meta.id}"`);
    }
    seenIds.add(item.meta.id);

    const existing = bySlug.get(item.meta.slug);
    if (existing) {
      fail(
        `${label}: slug "${item.meta.slug}" is also used by ${existing.meta.vertical}/${existing.meta.slug} — cross-references resolve by slug and must be globally unique`,
      );
    } else {
      bySlug.set(item.meta.slug, item);
    }
  }

  for (const item of items) {
    const label = `${item.meta.vertical}/${item.meta.slug}`;

    if (item.meta.updatedAt < item.meta.createdAt) {
      fail(
        `${label}: updatedAt (${item.meta.updatedAt}) is before createdAt (${item.meta.createdAt})`,
      );
    }

    for (const ref of outgoingSlugs(item.meta)) {
      const target = bySlug.get(ref);
      if (!target) {
        fail(`${label}: references unknown slug "${ref}"`);
        continue;
      }
      if (
        item.meta.status === "published" &&
        target.meta.status !== "published"
      ) {
        fail(
          `${label}: published item references unpublished "${ref}" (status: ${target.meta.status})`,
        );
      }
    }
  }
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (errors > 0) {
  console.error(`\nContent validation failed with ${errors} error(s).`);
  process.exit(1);
}
console.log("Content validation passed.");
