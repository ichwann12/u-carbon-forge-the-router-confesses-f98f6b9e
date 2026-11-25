// The Router Confesses — make.fun bounty entry
// Reads the single-line entry from entry.txt at the repo root and writes it
// to the output directory given by MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR.
// The entry line itself lives in entry.txt (114 characters, under the
// 200-character bounty limit); this program only reads and echoes it.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const entryPath = join(repoRoot, "entry.txt");

const entry = readFileSync(entryPath, "utf8").trim();

if (entry.length === 0) {
  throw new Error("entry.txt is empty");
}
if (entry.length > 200) {
  throw new Error(`entry is ${entry.length} characters, over the 200-character limit`);
}

const outputDir =
  process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? join(repoRoot, "output");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "output.txt"), entry + "\n", "utf8");

console.log(entry);
