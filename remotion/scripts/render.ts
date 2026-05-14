/**
 * Renders the full video and writes out/video.meta.json beside it — a
 * provenance record (schema / template / TTS versions, render time) so every
 * output file is traceable to the inputs that produced it.
 *
 * Usage: npm run build [-- <extra remotion flags>]
 */
import { spawnSync } from "child_process";
import { writeFileSync } from "fs";
import path from "path";
import { VERSIONS } from "../src/version";

const result = spawnSync(
  "npx",
  ["remotion", "render", "Video", "out/video.mp4", ...process.argv.slice(2)],
  { stdio: "inherit" },
);
if (result.status !== 0) process.exit(result.status ?? 1);

const meta = { ...VERSIONS, renderedAt: new Date().toISOString() };
const metaFile = path.resolve(__dirname, "../out/video.meta.json");
writeFileSync(metaFile, JSON.stringify(meta, null, 2) + "\n", "utf8");

console.log("\nWrote provenance record beside the video:");
console.log(JSON.stringify(meta, null, 2));
