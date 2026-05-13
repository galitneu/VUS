import React from "react";
import { interpolate, Easing } from "remotion";
import { colors, fonts } from "../../design/tokens";
import { SequenceZoom } from "../../components/SequenceZoom";
import { BlockKicker } from "./BlockKicker";
import { BlockCaption } from "./BlockCaption";
import type { BlockProps } from "./types";

const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

const SEQUENCE_LETTERS = "ACGTAGCTACGAT";
const HIGHLIGHT_INDEX = 6;

const fadeWindow = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const Block5B1_SNV: React.FC<BlockProps> = ({
  localFrame,
  fps,
  index,
  total,
}) => {
  const seqOp = fadeWindow(localFrame, 0.3 * fps, 1.2 * fps);
  const labelOp = fadeWindow(localFrame, 1.0 * fps, 1.8 * fps);
  const captionOp = fadeWindow(localFrame, 1.4 * fps, 2.2 * fps);

  const pulseT = (Math.sin((localFrame / fps) * Math.PI * (2 / 3)) + 1) / 2;
  const pulseOpacity = 0.82 + pulseT * 0.18;

  return (
    <>
      <BlockKicker label="סוג השינוי" index={index} total={total} />

      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: seqOp,
        }}
      >
        <SequenceZoom
          letters={SEQUENCE_LETTERS}
          highlightIndex={HIGHLIGHT_INDEX}
          highlightOpacity={pulseOpacity}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 470,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 14,
          color: colors.accent,
          letterSpacing: 5,
          textTransform: "uppercase",
          fontWeight: 400,
          fontFamily: fonts.sans,
          opacity: labelOp,
        }}
      >
        וריאנט
      </div>

      <div style={{ opacity: captionOp }}>
        <BlockCaption>
          זוהה שינוי בודד באחת מהאותיות הגנטיות בתוך הגן.
        </BlockCaption>
      </div>
    </>
  );
};
