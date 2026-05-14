import { CASE_FZD2 } from "./cases/fzd2";

/**
 * Single source of truth for which variant case the video renders.
 * Changing this swaps the whole pipeline: the composition (via Root.tsx) and
 * the CI narration-audio regeneration (via DEFAULT_CASE in scripts/lib/cases).
 * The key and the params object must point at the same case.
 */
export const CURRENT_CASE_KEY = "fzd2";
export const CURRENT_CASE = CASE_FZD2;
