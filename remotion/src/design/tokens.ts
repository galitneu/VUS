export const colors = {
  bgDeep: "#0a1729",
  bgMid: "#152540",
  bgDarker: "#050d18",
  textPrimary: "#f4ede3",
  textSecondary: "#8ba4be",
  textMuted: "#4a6378",
  accent: "#d4a574",
  accentSoft: "rgba(212, 165, 116, 0.18)",
  accentGlow: "rgba(212, 165, 116, 0.35)",
  green: "#6ebe8c",
  greenSoft: "rgba(110, 190, 140, 0.15)",
  red: "#d2645a",
  redSoft: "rgba(210, 100, 90, 0.15)",
} as const;

export const fonts = {
  serif: "'Frank Ruhl Libre', serif",
  sans: "'Heebo', sans-serif",
} as const;

export const FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

export const sceneDurations = {
  opening: 15,
  variantIntro: 25,
  categories: 25,
  notVUS: 20,
  specificVariant: 40,
  whyUncertain: 25,
  timeline: 25,
  closing: 15,
} as const;

export const totalDurationSeconds = Object.values(sceneDurations).reduce(
  (a, b) => a + b,
  0,
);
