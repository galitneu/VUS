/**
 * Generates Hebrew TTS audio files for each scene using edge-tts.
 *
 * Prerequisites:
 *   pip install edge-tts
 *
 * Usage:
 *   npm run generate-audio
 *   npm run generate-audio -- --case brpf1
 *
 * Output: public/audio/{scene-name}.mp3
 * These files are loaded by Remotion via staticFile("audio/{scene-name}.mp3").
 */
import { execSync } from "child_process";
import {
  writeFileSync,
  mkdirSync,
  existsSync,
  unlinkSync,
  statSync,
} from "fs";
import path from "path";
import { CASE_COL4A2 } from "../src/params/cases/mvp_col4a2";
import { CASE_BRPF1 } from "../src/params/cases/brpf1";
import { CASE_VCL } from "../src/params/cases/vcl";
import { CASE_FZD2 } from "../src/params/cases/fzd2";
import { buildNarration } from "../src/narration/texts";
import type { VUSVideoParams } from "../src/params/types";

const VOICE = "he-IL-HilaNeural";
const OUT_DIR = path.resolve(__dirname, "../public/audio");

const CASES: Record<string, VUSVideoParams> = {
  col4a2: CASE_COL4A2,
  brpf1: CASE_BRPF1,
  vcl: CASE_VCL,
  fzd2: CASE_FZD2,
};

// Parse --case argument (default: col4a2)
const caseFlagIndex = process.argv.indexOf("--case");
const caseArg =
  process.argv.find((a) => a.startsWith("--case="))?.split("=")[1] ??
  (caseFlagIndex !== -1 ? process.argv[caseFlagIndex + 1] : undefined);
const caseKey = (caseArg ?? "col4a2").toLowerCase();
const params = CASES[caseKey];
if (!params) {
  console.error(
    `Unknown case "${caseKey}". Available: ${Object.keys(CASES).join(", ")}`
  );
  process.exit(1);
}

// Check edge-tts is installed
try {
  execSync("edge-tts --version", { stdio: "pipe" });
} catch {
  console.error(
    "edge-tts not found. Install with: pip install edge-tts\n" +
      "Then retry: npm run generate-audio"
  );
  process.exit(1);
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

function generate(name: string, text: string): void {
  const tmpFile = path.join(OUT_DIR, `.tmp-${name}.txt`);
  const outFile = path.join(OUT_DIR, `${name}.mp3`);

  writeFileSync(tmpFile, text, "utf8");
  console.log(`  → ${name}`);

  try {
    execSync(
      `edge-tts --voice "${VOICE}" -f "${tmpFile}" --write-media "${outFile}"`,
      { stdio: "pipe" }
    );
    const size = Math.round(statSync(outFile).size / 1024);
    console.log(`    ✓ ${outFile} (${size} KB)`);
  } catch (err) {
    // edge-tts creates the output file before streaming audio into it, so a
    // failed run leaves a 0-byte .mp3 behind. Remove it so it can't be
    // committed as a silent track.
    if (existsSync(outFile) && statSync(outFile).size === 0) unlinkSync(outFile);
    throw err;
  } finally {
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
  }
}

const narration = buildNarration(params);
const scenes = Object.entries(narration) as [
  keyof typeof narration,
  string
][];

const sceneFilenames: Record<keyof typeof narration, string> = {
  opening: "opening",
  variantIntro: "variant-intro",
  categories: "categories",
  notVUS: "not-vus",
  specificVariant: "specific-variant",
  whyUncertain: "why-uncertain",
  timeline: "timeline",
  closing: "closing",
};

console.log(`\nGenerating audio for case: ${caseKey.toUpperCase()}`);
console.log(`Voice: ${VOICE}`);
console.log(`Output: ${OUT_DIR}\n`);

for (const [scene, text] of scenes) {
  generate(sceneFilenames[scene], text);
}

console.log("\nDone. Run `npm run dev` to preview with audio.");
