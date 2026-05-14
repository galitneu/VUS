import type { NarrationSet } from "../narration/texts";
import { audioDurations } from "../narration/audio-durations";

export const colors = {
  bgDeep: "#0c1a2f",
  bgMid: "#1a2b45",
  bgDarker: "#050d18",
  textPrimary: "#f4ede3",
  textSecondary: "#8ba4be",
  textMuted: "#4a6378",
  accent: "#d4a574",
  accentSoft: "rgba(212, 165, 116, 0.18)",
  accentGlow: "rgba(212, 165, 116, 0.35)",
  // Classification poles — deliberately not red/green: avoids the red-green
  // colorblind clash, and the good/bad framing the video works against.
  benign: "#7ba88f",
  benignSoft: "rgba(123, 168, 143, 0.15)",
  pathogenic: "#8a7fb0",
  pathogenicSoft: "rgba(138, 127, 176, 0.15)",
} as const;

export const fonts = {
  serif: "'Frank Ruhl Libre', serif",
  sans: "'Heebo', sans-serif",
  // Latin-first stacks for text wrapped in dir="ltr" (design committee Q6).
  serifLatin: "'Cormorant Garamond', 'Frank Ruhl Libre', serif",
  sansLatin: "'Inter', 'Heebo', sans-serif",
} as const;

export const FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

// Design committee Q7: a beat of visual quiet after the narration ends,
// before the transition to the next scene.
export const REST_PERIOD_SECONDS = 2;

// Architecture committee Q1/Q4: each scene's length is a *result* of its
// narration length (measured post-TTS in audio-durations.ts), not a hardcoded
// guess — narration + a rest period, rounded up to whole seconds.
export const sceneDurations = Object.fromEntries(
  (Object.keys(audioDurations) as (keyof NarrationSet)[]).map((scene) => [
    scene,
    Math.ceil(audioDurations[scene]) + REST_PERIOD_SECONDS,
  ]),
) as Record<keyof NarrationSet, number>;

export const totalDurationSeconds = Object.values(sceneDurations).reduce(
  (a, b) => a + b,
  0,
);
