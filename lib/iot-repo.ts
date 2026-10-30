import fs from "fs";
import path from "path";

// Build-time helpers for the IoT session pages. Code shown on the page is read
// straight from iot-projects/, so the page and the GitHub folder never drift apart.

const ROOT = process.cwd();
const REPO = "https://github.com/mmanoj770/my_portfolio";
const BRANCH = "main";

export function readProjectFile(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, "iot-projects", relPath), "utf8").trimEnd();
}

// One function from a source file: from the first line that starts (after indentation) with
// `startsWith` down to the closing brace at that line's indentation. Throws if not found so a
// renamed function breaks the build instead of silently showing the wrong code.
export function readProjectExcerpt(relPath: string, startsWith: string): string {
  const lines = readProjectFile(relPath).split("\n");
  const start = lines.findIndex((l) => l.trimStart().startsWith(startsWith));
  if (start === -1) throw new Error(`"${startsWith}" not found in ${relPath}`);
  const indent = lines[start].match(/^\s*/)![0];
  const end = lines.findIndex((l, i) => i > start && l === `${indent}}`);
  if (end === -1) throw new Error(`No closing brace for "${startsWith}" in ${relPath}`);
  return lines
    .slice(start, end + 1)
    .map((l) => (l.startsWith(indent) ? l.slice(indent.length) : l))
    .join("\n");
}

export function lineCount(relPath: string): number {
  return readProjectFile(relPath).split("\n").length;
}

export function repoTreeUrl(relPath: string): string {
  return `${REPO}/tree/${BRANCH}/iot-projects/${relPath}`;
}

export function repoBlobUrl(relPath: string): string {
  return `${REPO}/blob/${BRANCH}/iot-projects/${relPath}`;
}

const MEDIA_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".mp4"];

// Returns the public URL of the first existing file for a media path given with or
// without an extension (e.g. "/media/iot/task2/adafruit-dashboard"), or null.
export function resolveMedia(src: string): string | null {
  const candidates = path.extname(src) ? [src] : MEDIA_EXTENSIONS.map((ext) => src + ext);
  return candidates.find((c) => fs.existsSync(path.join(ROOT, "public", c))) ?? null;
}

// Parses a simple CSV export (quoted fields without embedded quotes) from public/.
export function readPublicCsv(src: string): string[][] | null {
  const file = path.join(ROOT, "public", src);
  if (!fs.existsSync(file)) return null;
  return fs
    .readFileSync(file, "utf8")
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.replace(/^"|"$/g, "").trim()));
}
