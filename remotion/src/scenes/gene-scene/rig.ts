import { colors } from "../../design/tokens";

/**
 * Committee palette mapped onto the gene scene. The spec's section 4.1 colors
 * are deliberately overridden with the committee tokens (project instruction):
 *   doc --bg #040C1A      -> bgDarker
 *   doc --accent #D4A574  -> accent      (identical)
 *   doc --red #CF5E55     -> pathogenic  (the committee's red replacement)
 *   doc --sec #7A94AE     -> textSecondary
 *   doc --text #F0E8DC    -> textPrimary
 *   doc chromosome #1C4294 / helix cyan  -> textSecondary (no committee blue)
 *   doc helix green #4AB870              -> benign
 */
export const PALETTE = {
  bg: colors.bgDarker,
  particles: colors.bgMid,
  accent: colors.accent,
  pathogenic: colors.pathogenic,
  benign: colors.benign,
  structure: colors.textSecondary,
  dim: colors.textMuted,
  text: colors.textPrimary,
} as const;

// Stage layout — spec section 5.4. STAGE_DUR adapts to the scene's real length
// (which the committee architecture derives from measured narration).
export const TRANS_SEC = 1.5;
export const STAGE_COUNT = 3;

export const STAGE_NAMES = ["כרומוזום", "סליל DNA", "וריאנט"] as const;

// Variant placement — spec section 6 defaults.
export const VARIANT_IDX = 16;
export const HELIX_PAIRS = 32;
export const GENE_Y = 0.52;

export type StageState = {
  /** Current (or transition target) stage. */
  stage: 0 | 1 | 2;
  /** 0..1 progress through the current stage's hold (0 during a transition). */
  stageT: number;
  /** Seconds elapsed in the current stage's hold. */
  stageTimeSec: number;
  inTransition: boolean;
  /** 0..1 progress through the active transition. */
  transT: number;
  /** Stage index the active transition is leaving. */
  fromStage: 0 | 1;
};

/** easeInOut quadratic — spec section 5.4. */
export const ease = (t: number): number =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export function getStageState(timeSec: number, totalSec: number): StageState {
  const stageDur = Math.max(
    0.1,
    (totalSec - TRANS_SEC * (STAGE_COUNT - 1)) / STAGE_COUNT,
  );
  const t = Math.max(0, Math.min(timeSec, totalSec));

  const b0 = stageDur; // end of stage 0 hold
  const b1 = b0 + TRANS_SEC; // end of transition 0->1
  const b2 = b1 + stageDur; // end of stage 1 hold
  const b3 = b2 + TRANS_SEC; // end of transition 1->2

  if (t < b0) {
    return {
      stage: 0,
      stageT: t / stageDur,
      stageTimeSec: t,
      inTransition: false,
      transT: 0,
      fromStage: 0,
    };
  }
  if (t < b1) {
    return {
      stage: 1,
      stageT: 0,
      stageTimeSec: 0,
      inTransition: true,
      transT: (t - b0) / TRANS_SEC,
      fromStage: 0,
    };
  }
  if (t < b2) {
    const st = t - b1;
    return {
      stage: 1,
      stageT: st / stageDur,
      stageTimeSec: st,
      inTransition: false,
      transT: 0,
      fromStage: 0,
    };
  }
  if (t < b3) {
    return {
      stage: 2,
      stageT: 0,
      stageTimeSec: 0,
      inTransition: true,
      transT: (t - b2) / TRANS_SEC,
      fromStage: 1,
    };
  }
  const st = t - b3;
  return {
    stage: 2,
    stageT: st / stageDur,
    stageTimeSec: st,
    inTransition: false,
    transT: 0,
    fromStage: 1,
  };
}

type Vec3 = [number, number, number];
type CamState = { pos: Vec3; look: Vec3 };

// Camera states — spec section 5.3.
export const CAM: Record<"stage0" | "stage1" | "stage2" | "geneZoom", CamState> =
  {
    stage0: { pos: [0, 0.35, 7.0], look: [0, 0.38, 0] },
    stage1: { pos: [1.3, 0.05, 4.1], look: [0, 0.0, 0] },
    stage2: { pos: [0, 0.1, 3.2], look: [0, 0.1, 0] },
    geneZoom: { pos: [0, 0.52, 3.0], look: [0, 0.52, 0] },
  };

const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/** Interpolated camera pos/look for the current frame — spec section 5.4. */
export function getCameraTarget(s: StageState): CamState {
  if (!s.inTransition) {
    return s.stage === 0 ? CAM.stage0 : s.stage === 1 ? CAM.stage1 : CAM.stage2;
  }
  if (s.fromStage === 0) {
    // Two-phase: zoom into the gene, then continue out to the helix.
    if (s.transT < 0.5) {
      const k = ease(s.transT * 2);
      return {
        pos: lerp3(CAM.stage0.pos, CAM.geneZoom.pos, k),
        look: lerp3(CAM.stage0.look, CAM.geneZoom.look, k),
      };
    }
    const k = ease((s.transT - 0.5) * 2);
    return {
      pos: lerp3(CAM.geneZoom.pos, CAM.stage1.pos, k),
      look: lerp3(CAM.geneZoom.look, CAM.stage1.look, k),
    };
  }
  // Transition 1->2: direct lerp.
  const k = ease(s.transT);
  return {
    pos: lerp3(CAM.stage1.pos, CAM.stage2.pos, k),
    look: lerp3(CAM.stage1.look, CAM.stage2.look, k),
  };
}

// The chromosome reads small at the spec's camera distance — give it a base
// scale so stage 0 fills the frame.
const CHROM_BASE_SCALE = 1.3;

/** Per-element visibility and scale for the current frame. */
export function getStageVisibility(s: StageState) {
  let chromVisible = false;
  let chromScale = CHROM_BASE_SCALE;
  let helixVisible = false;
  let helixScale = 1;
  let bpVisible = false;
  let bpScale = 1;

  if (!s.inTransition) {
    if (s.stage === 0) chromVisible = true;
    else if (s.stage === 1) helixVisible = true;
    else bpVisible = true; // stage 2 hold: base-pair only, helix cleared away
  } else if (s.fromStage === 0) {
    // Transition 0->1: chromosome shrinks away, then the helix grows in.
    if (s.transT < 0.5) {
      chromVisible = true;
      chromScale = CHROM_BASE_SCALE * (1 - ease(s.transT * 2) * 0.65);
    } else {
      helixVisible = true;
      helixScale = ease((s.transT - 0.5) * 2);
    }
  } else {
    // Transition 1->2: helix holds while the base-pair grows in front of it.
    helixVisible = true;
    bpVisible = true;
    bpScale = ease(s.transT);
  }

  return { chromVisible, chromScale, helixVisible, helixScale, bpVisible, bpScale };
}
