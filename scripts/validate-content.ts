/**
 * Content validation gate. Fails (exit 1) on:
 *  - schema violations (required fields, taxonomy values, date formats)
 *  - duplicate slugs
 *  - cross-references to slugs that do not exist
 *  - published items referencing unpublished items
 *  - updatedAt earlier than createdAt
 *  - GenAI concepts missing or invalid top resources (1–10, with why + covered terms)
 *
 * Runs in prebuild and CI; a failure blocks deployment.
 */
import { loadAllContent } from "../lib/content";
import { missingTopicResourceSlugs, invalidTopicResourceSlugs } from "../lib/genai-resources";
import { outgoingSlugs } from "../lib/relationships";

let errors = 0;

function fail(message: string) {
  console.error(`  ✗ ${message}`);
  errors += 1;
}

try {
  // loadAllContent throws on schema violations and duplicate slugs.
  const items = loadAllContent();
  console.log(`Validating ${items.length} content items…`);

  const bySlug = new Map(items.map((item) => [item.meta.slug, item]));

  for (const item of items) {
    const label = `${item.meta.vertical}/${item.meta.slug}`;

    if (item.meta.updatedAt < item.meta.createdAt) {
      fail(`${label}: updatedAt (${item.meta.updatedAt}) is before createdAt (${item.meta.createdAt})`);
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

  const genaiSlugs = items
    .filter((item) => item.meta.vertical === "genai")
    .map((item) => item.meta.slug);
  for (const slug of missingTopicResourceSlugs(genaiSlugs)) {
    fail(`genai/${slug}: missing top resources`);
  }
  for (const label of invalidTopicResourceSlugs(genaiSlugs)) {
    fail(`genai/${label}: each resource needs why + covered terms, and 1–10 items`);
  }
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (errors > 0) {
  console.error(`\nContent validation failed with ${errors} error(s).`);
  process.exit(1);
}
console.log("Content validation passed.");
