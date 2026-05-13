import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import type { VUSVideoParams } from "./params/types";
import { FPS, sceneDurations } from "./design/tokens";
import { Opening } from "./scenes/Opening";

const dur = (seconds: number) => Math.round(seconds * FPS);

export const Video: React.FC<{ params: VUSVideoParams }> = () => {
  let cursor = 0;
  const at = (seconds: number) => {
    const from = cursor;
    cursor += dur(seconds);
    return from;
  };

  return (
    <AbsoluteFill>
      <Sequence from={at(sceneDurations.opening)} durationInFrames={dur(sceneDurations.opening)}>
        <Opening />
      </Sequence>
    </AbsoluteFill>
  );
};
