/**
 * Validates the narration MP3s against a case's scripts.
 *
 * Usage:
 *   npm run validate-audio
 *   npm run validate-audio -- --case brpf1
 *
 * Also runs automatically inside generate-audio, before durations are written.
 */
import { resolveCase } from "./lib/cases";
import { buildNarration } from "../src/narration/texts";
import { validateAudio } from "./lib/validate-audio";

let resolved;
try {
  resolved = resolveCase(process.argv);
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}

console.log(`Validating narration audio for case: ${resolved.caseKey.toUpperCase()}`);
validateAudio(buildNarration(resolved.params))
  .then(() => console.log("Done."))
  .catch((err) => {
    console.error(err?.message ?? err);
    process.exit(1);
  });
