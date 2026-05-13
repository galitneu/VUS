import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../design/tokens";
import type { VUSVideoParams } from "../params/types";
import { buildScene5Blocks } from "../params/buildScene5Blocks";
import { BlockRenderer } from "./blocks/BlockRenderer";

const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

type Props = { params: VUSVideoParams };

export const SpecificVariant: React.FC<Props> = ({ params }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const blockIds = buildScene5Blocks(params);
  const total = blockIds.length;
  const blockDuration = durationInFrames / total;
  const fadeFrames = 0.5 * fps;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgMid} 0%, ${colors.bgDeep} 70%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 80,
          fontSize: 18,
          color: colors.textMuted,
          letterSpacing: 3.6,
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        VUS · משמעות לא ודאית
      </div>

      <ProgressDots
        index={Math.min(total - 1, Math.floor(frame / blockDuration))}
        total={total}
      />

      {blockIds.map((id, i) => {
        const blockStart = i * blockDuration;
        const blockEnd = (i + 1) * blockDuration;
        const fadeIn = interpolate(
          frame,
          [blockStart, blockStart + fadeFrames],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
        );
        const isLast = i === total - 1;
        const fadeOut = isLast
          ? 1
          : interpolate(
              frame,
              [blockEnd - fadeFrames, blockEnd],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              },
            );
        const opacity = Math.min(fadeIn, fadeOut);
        if (opacity < 0.001) return null;
        const localFrame = frame - blockStart;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity,
            }}
          >
            <BlockRenderer
              id={id}
              params={params}
              localFrame={localFrame}
              fps={fps}
              index={i}
              total={total}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const ProgressDots: React.FC<{ index: number; total: number }> = ({
  index,
  total,
}) => {
  const dots = Array.from({ length: total }, (_, i) => i);
  return (
    <div
      style={{
        position: "absolute",
        top: 1020,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 14,
        direction: "ltr",
      }}
    >
      {dots.map((i) => {
        const active = i === index;
        return (
          <div
            key={i}
            style={{
              width: active ? 28 : 8,
              height: 4,
              borderRadius: 2,
              background: active ? colors.accent : "rgba(74,99,120,0.55)",
              transition: "all 200ms",
            }}
          />
        );
      })}
    </div>
  );
};

