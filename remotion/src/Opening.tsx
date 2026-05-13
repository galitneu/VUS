import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fonts } from "./theme";

const SEQUENCE = "ACGTAGCGCTAGCTGTAGCTAGCTGACGTACGTAGCT";
const HIGHLIGHT_INDEX = 16;

type FadeWindow = {
  fadeInStart: number;
  fadeInEnd: number;
  fadeOutStart?: number;
  fadeOutEnd?: number;
};

const opacityForWindow = (frame: number, w: FadeWindow): number => {
  let opacity = interpolate(
    frame,
    [w.fadeInStart, w.fadeInEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  if (w.fadeOutStart !== undefined && w.fadeOutEnd !== undefined) {
    const fade = interpolate(
      frame,
      [w.fadeOutStart, w.fadeOutEnd],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    opacity = Math.min(opacity, fade);
  }
  return opacity;
};

const translateYForWindow = (frame: number, w: FadeWindow): number => {
  const inY = interpolate(
    frame,
    [w.fadeInStart, w.fadeInEnd],
    [8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  if (w.fadeOutStart !== undefined && w.fadeOutEnd !== undefined) {
    const outY = interpolate(
      frame,
      [w.fadeOutStart, w.fadeOutEnd],
      [0, -8],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    return frame >= w.fadeOutStart ? outY : inY;
  }
  return inY;
};

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sec = (s: number) => s * fps;

  const sequenceFade: FadeWindow = {
    fadeInStart: sec(0.6),
    fadeInEnd: sec(1.8),
  };

  const topicLabelFade: FadeWindow = {
    fadeInStart: sec(0.3),
    fadeInEnd: sec(1.3),
  };

  const line1: FadeWindow = {
    fadeInStart: sec(3),
    fadeInEnd: sec(3.72),
    fadeOutStart: sec(6.28),
    fadeOutEnd: sec(7),
  };

  const line2: FadeWindow = {
    fadeInStart: sec(7),
    fadeInEnd: sec(7.72),
    fadeOutStart: sec(10.28),
    fadeOutEnd: sec(11),
  };

  const line3: FadeWindow = {
    fadeInStart: sec(11),
    fadeInEnd: sec(12.2),
  };

  const pulseT = (Math.sin((frame / fps) * Math.PI * (2 / 3)) + 1) / 2;
  const glowBlur = 10 + pulseT * 22;
  const glowExtra = pulseT * 32;

  const timerWidth = interpolate(frame, [0, sec(15)], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${theme.bgMid} 0%, ${theme.bgDeep} 70%, ${theme.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "7%",
          right: "5%",
          fontFamily: fonts.sans,
          fontSize: 18,
          color: theme.textMuted,
          letterSpacing: 3.6,
          textTransform: "uppercase",
          fontWeight: 300,
          opacity: opacityForWindow(frame, topicLabelFade),
        }}
      >
        VUS · משמעות לא ודאית
      </div>

      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          direction: "ltr",
          gap: 6,
          opacity: opacityForWindow(frame, sequenceFade),
          padding: "0 4%",
        }}
      >
        {SEQUENCE.split("").map((letter, i) => {
          const isHighlight = i === HIGHLIGHT_INDEX;
          return (
            <span
              key={i}
              style={{
                fontFamily: fonts.sans,
                fontSize: 28,
                fontWeight: isHighlight ? 400 : 300,
                color: isHighlight ? theme.accent : theme.textMuted,
                width: 34,
                textAlign: "center",
                textShadow: isHighlight
                  ? `0 0 ${glowBlur}px ${theme.accentGlow}, 0 0 ${glowExtra}px ${theme.accentGlow}`
                  : "none",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "8%",
          right: "8%",
          bottom: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          direction: "rtl",
        }}
      >
        <TextLine window={line1} frame={frame}>
          <>
            תוצאה של בדיקה גנטית עם סיווג{" "}
            <span style={{ color: theme.accent, fontWeight: 400 }}>
              &ldquo;משמעות לא ודאית&rdquo;
            </span>
          </>
        </TextLine>
        <TextLine window={line2} frame={frame}>
          מציגה תמונה מורכבת — לא תשובה ברורה לכאן או לכאן
        </TextLine>
        <TextLine window={line3} frame={frame}>
          הסרטון מסביר מה משמעות הסיווג, ומה ידוע על הוריאנט הספציפי
        </TextLine>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: `${timerWidth}%`,
          background: theme.accent,
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};

const TextLine: React.FC<{
  window: FadeWindow;
  frame: number;
  children: React.ReactNode;
}> = ({ window: w, frame, children }) => {
  return (
    <div
      style={{
        position: "absolute",
        opacity: opacityForWindow(frame, w),
        transform: `translateY(${translateYForWindow(frame, w)}px)`,
        fontFamily: fonts.serif,
        fontWeight: 300,
        lineHeight: 1.5,
        color: theme.textPrimary,
        maxWidth: "92%",
        fontSize: 44,
        letterSpacing: "0.01em",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};
