import { Easing, interpolate } from "remotion";

const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

export type FadeWindow = {
  fadeInStart: number;
  fadeInEnd: number;
  fadeOutStart?: number;
  fadeOutEnd?: number;
};

export const opacityForWindow = (frame: number, w: FadeWindow): number => {
  let opacity = interpolate(
    frame,
    [w.fadeInStart, w.fadeInEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );
  if (w.fadeOutStart !== undefined && w.fadeOutEnd !== undefined) {
    const fade = interpolate(
      frame,
      [w.fadeOutStart, w.fadeOutEnd],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
    );
    opacity = Math.min(opacity, fade);
  }
  return opacity;
};

export const translateYForWindow = (
  frame: number,
  w: FadeWindow,
  enterFrom = 8,
  exitTo = -8,
): number => {
  const inY = interpolate(
    frame,
    [w.fadeInStart, w.fadeInEnd],
    [enterFrom, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
  );
  if (w.fadeOutStart !== undefined && w.fadeOutEnd !== undefined) {
    const outY = interpolate(
      frame,
      [w.fadeOutStart, w.fadeOutEnd],
      [0, exitTo],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
    );
    return frame >= w.fadeOutStart ? outY : inY;
  }
  return inY;
};

export const sec = (s: number, fps: number) => s * fps;

// Design committee Q7: motion uses exactly three transition durations, paired
// with the single easing curve above. Everything that fades or moves picks one.
export const MOTION_SECONDS = { fast: 0.3, medium: 0.6, slow: 1.2 } as const;
export type MotionDuration = keyof typeof MOTION_SECONDS;

/** A fade-in window starting at startSec, lasting one motion duration. */
export const fadeIn = (
  startSec: number,
  duration: MotionDuration,
  fps: number,
): FadeWindow => ({
  fadeInStart: sec(startSec, fps),
  fadeInEnd: sec(startSec + MOTION_SECONDS[duration], fps),
});

/** A fade-in and a later fade-out, each lasting one motion duration. */
export const fadeInOut = (
  inStartSec: number,
  inDuration: MotionDuration,
  outStartSec: number,
  outDuration: MotionDuration,
  fps: number,
): FadeWindow => ({
  fadeInStart: sec(inStartSec, fps),
  fadeInEnd: sec(inStartSec + MOTION_SECONDS[inDuration], fps),
  fadeOutStart: sec(outStartSec, fps),
  fadeOutEnd: sec(outStartSec + MOTION_SECONDS[outDuration], fps),
});
