/**
 * Measures the narration MP3s and regenerates src/narration/audio-durations.ts.
 *
 * Runs automatically at the end of generate-audio; also runnable on its own
 * (npm run measure-audio) when the audio files already exist.
 */
import { writeAudioDurations } from "./lib/audio-durations";

writeAudioDurations()
  .then(() => console.log("\nDone."))
  .catch((err) => {
    console.error(err?.message ?? err);
    process.exit(1);
  });
