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
import { buildNarration } from "../src/narration/texts";
import { sceneFilenames } from "../src/narration/scenes";
import { writeAudioDurations } from "./lib/audio-durations";
import { validateAudio } from "./lib/validate-audio";
import { resolveCase } from "./lib/cases";

const VOICE = "he-IL-HilaNeural";
const OUT_DIR = path.resolve(__dirname, "../public/audio");

const { caseKey, params } = (() => {
  try {
    return resolveCase(process.argv);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
})();

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

console.log(`\nGenerating audio for case: ${caseKey.toUpperCase()}`);
console.log(`Voice: ${VOICE}`);
console.log(`Output: ${OUT_DIR}\n`);

for (const [scene, text] of scenes) {
  generate(sceneFilenames[scene], text);
}

console.log("\nValidating and measuring audio...");
validateAudio(narration)
  .then(() => writeAudioDurations())
  .then(() => console.log("\nDone. Run `npm run dev` to preview with audio."))
  .catch((err) => {
    console.error(err?.message ?? err);
    process.exit(1);
  });
