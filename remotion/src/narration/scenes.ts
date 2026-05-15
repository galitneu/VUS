import type { NarrationSet } from "./texts";

export type SceneKey = keyof NarrationSet;

/** Maps each narration scene key to its audio file basename in public/audio/. */
export const sceneFilenames: Record<SceneKey, string> = {
  opening: "opening",
  variantIntroChrom: "variant-intro-chrom",
  variantIntroHelix: "variant-intro-helix",
  variantIntroBase: "variant-intro-base",
  categories: "categories",
  notVUS: "not-vus",
  specificVariant: "specific-variant",
  whyUncertain: "why-uncertain",
  timeline: "timeline",
  closing: "closing",
};
