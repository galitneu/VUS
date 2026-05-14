/**
 * Validates the narration MP3s against their scripts.
 *
 * Architecture committee Q4: a TTS step needs a validation gate — every file
 * present, non-empty, and roughly the length its script implies — so a silent
 * or truncated track can't slip through into a render.
 */
import { parseFile } from "music-metadata";
import { existsSync } from "fs";
import path from "path";
import { sceneFilenames, type SceneKey } from "../../src/narration/scenes";
import type { NarrationSet } from "../../src/narration/texts";

const AUDIO_DIR = path.resolve(__dirname, "../../public/audio");

// A real narration paragraph is never shorter than this; below it, TTS
// produced silence or a truncated file.
const MIN_SECONDS = 2;

// Plausible Hebrew narration pace, seconds per spoken word. Outside this band
// the audio almost certainly doesn't match the script it was generated from.
const MIN_SEC_PER_WORD = 0.15;
const MAX_SEC_PER_WORD = 1.0;

const wordCount = (text: string): number =>
  text
    .trim()
    .split(/\s+/)
    .filter((token) => /\p{L}/u.test(token)).length;

export async function validateAudio(narration: NarrationSet): Promise<void> {
  const problems: string[] = [];

  for (const scene of Object.keys(sceneFilenames) as SceneKey[]) {
    const file = path.join(AUDIO_DIR, `${sceneFilenames[scene]}.mp3`);
    if (!existsSync(file)) {
      problems.push(`${scene}: audio file missing (${file})`);
      continue;
    }

    const { format } = await parseFile(file);
    const duration = format.duration ?? 0;
    if (duration < MIN_SECONDS) {
      problems.push(
        `${scene}: only ${duration.toFixed(2)}s of audio — likely empty or truncated`,
      );
      continue;
    }

    const words = wordCount(narration[scene]);
    const secPerWord = duration / words;
    if (secPerWord < MIN_SEC_PER_WORD || secPerWord > MAX_SEC_PER_WORD) {
      problems.push(
        `${scene}: ${duration.toFixed(1)}s for ${words} words ` +
          `(${secPerWord.toFixed(2)}s/word, expected ${MIN_SEC_PER_WORD}-${MAX_SEC_PER_WORD}) ` +
          `— audio may not match its script`,
      );
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `TTS validation failed (${problems.length} issue(s)):\n` +
        problems.map((p) => `  - ${p}`).join("\n"),
    );
  }

  console.log(
    `  TTS validation passed - ${Object.keys(sceneFilenames).length} files OK`,
  );
}
