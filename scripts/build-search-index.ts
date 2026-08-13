/**
 * Emits the static client-side search index to public/search-index.json.
 * Runs before `next build` (see the prebuild script in package.json).
 */
import fs from "node:fs";
import path from "node:path";
import { buildSearchIndex } from "../lib/search";

const index = buildSearchIndex();
const outPath = path.join(process.cwd(), "public", "search-index.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(index));
console.log(`Search index: ${index.length} records → ${outPath}`);
