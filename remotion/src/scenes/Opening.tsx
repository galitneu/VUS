import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../design/tokens";
import {
  type FadeWindow,
  opacityForWindow,
  translateYForWindow,
  sec,
  fadeIn,
  fadeInOut,
} from "../design/animations";

const SEQUENCE = "ACGTAGCGCTAGCTGTAGCTAGCTGACGTACGTAGCT";
const HIGHLIGHT_INDEX = 16;

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (t: number) => sec(t, fps);

  const sequenceFade = fadeIn(0.6, "slow", fps);
  const topicLabelFade = fadeIn(0.3, "slow", fps);
  const line1 = fadeInOut(2, "medium", 5.28, "medium", fps);
  const line2 = fadeInOut(6, "medium", 9.28, "medium", fps);
  const line3 = fadeIn(10, "slow", fps);

  const pulseT = (Math.sin((frame / fps) * Math.PI * (2 / 3)) + 1) / 2;
  const glowBlur = 10 + pulseT * 22;
  const glowExtra = pulseT * 32;

  const timerWidth = interpolate(frame, [0, s(15)], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgMid} 0%, ${colors.bgDeep} 70%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
      <Audio src={staticFile("audio/opening.mp3")} />
      <div
        style={{
          position: "absolute",
          top: "7%",
          right: "5%",
          fontFamily: fonts.sans,
          fontSize: 18,
          color: colors.textMuted,
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
                color: isHighlight ? colors.accent : colors.textMuted,
                width: 34,
                textAlign: "center",
                textShadow: isHighlight
                  ? `0 0 ${glowBlur}px ${colors.accentGlow}, 0 0 ${glowExtra}px ${colors.accentGlow}`
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
            <span style={{ color: colors.accent, fontWeight: 400 }}>
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
          background: colors.accent,
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
        color: colors.textPrimary,
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
