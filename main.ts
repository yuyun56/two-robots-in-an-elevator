// Two Robots in an Elevator — make.fun entry guard and hand-in program.
// Competition: u-motasimfuad-two-robots-in-an-elevator-8c6aeb8f
// Constraint: the entry is exactly one line of awkward robot elevator
// small talk, 1..199 characters long (a single trailing newline in the
// file is allowed and ignored). This program reads entry.txt beside it,
// validates the constraint, prints the line with its character count and
// the character budget still left over, and writes the line to
// /output/entry.txt (MAKEFUN_OUTPUT_DIR stands in for /output outside
// the grader). Any violation exits non-zero.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const MAX_CHARS = 199;

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

let raw: string;
try {
  raw = readFileSync(entryPath, "utf8");
} catch {
  fail(`cannot read ${entryPath}`);
}

// Allow exactly one trailing newline; anything beyond that is content.
const line = raw.endsWith("\n") ? raw.slice(0, -1) : raw;

if (line.includes("\n") || line.includes("\r")) {
  fail("entry must be a single line (found an embedded newline)");
}
if (line.length === 0) {
  fail("entry is empty");
}
if (line.length > MAX_CHARS) {
  fail(`entry is ${line.length} characters; the limit is ${MAX_CHARS}`);
}
if (line.trim().length === 0) {
  fail("entry is only whitespace");
}

console.log(line);
console.log(`characters: ${line.length}`);
console.log(`budget: ${MAX_CHARS - line.length} of ${MAX_CHARS} characters left`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
console.log(`written: ${join(outDir, "entry.txt")}`);
