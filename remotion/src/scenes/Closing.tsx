import React from "react";
import {
  AbsoluteFill,
  Audio,
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
} from "../design/animations";

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (t: number) => sec(t, fps);

  const line1Fade: FadeWindow = { fadeInStart: s(0.3), fadeInEnd: s(1.4) };
  const ruleFade: FadeWindow = { fadeInStart: s(2.0), fadeInEnd: s(2.8) };
  const line2Fade: FadeWindow = { fadeInStart: s(3.0), fadeInEnd: s(4.0) };
  const line3Fade: FadeWindow = { fadeInStart: s(7.0), fadeInEnd: s(8.2) };

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgMid} 0%, ${colors.bgDeep} 70%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
      <Audio src={staticFile("audio/closing.mp3")} />
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

      <div
        style={{
          position: "absolute",
          top: 340,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: opacityForWindow(frame, line1Fade),
          transform: `translateY(${translateYForWindow(frame, line1Fade)}px)`,
          fontFamily: fonts.serif,
          fontSize: 58,
          color: colors.textPrimary,
          fontWeight: 300,
          letterSpacing: "0.01em",
          direction: "rtl",
        }}
      >
        <span
          dir="ltr"
          style={{
            unicodeBidi: "embed",
            color: colors.accent,
            fontWeight: 400,
            letterSpacing: 3,
          }}
        >
          VUS
        </span>{" "}
        אינו תשובה סופית
      </div>

      <div
        style={{
          position: "absolute",
          top: 450,
          left: "50%",
          width: 88,
          marginLeft: -44,
          height: 1.5,
          background: colors.accent,
          opacity: opacityForWindow(frame, ruleFade) * 0.85,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 510,
          left: "12%",
          right: "12%",
          textAlign: "center",
          opacity: opacityForWindow(frame, line2Fade),
          transform: `translateY(${translateYForWindow(frame, line2Fade)}px)`,
          fontFamily: fonts.serif,
          fontSize: 32,
          color: colors.textSecondary,
          fontWeight: 300,
          letterSpacing: "0.01em",
          direction: "rtl",
          lineHeight: 1.5,
        }}
      >
        הוא נקודת ביניים בידע המדעי, שצפויה להתחדד עם הזמן.
      </div>

      <div
        style={{
          position: "absolute",
          top: 690,
          left: "12%",
          right: "12%",
          textAlign: "center",
          opacity: opacityForWindow(frame, line3Fade),
          transform: `translateY(${translateYForWindow(frame, line3Fade)}px)`,
          fontFamily: fonts.sans,
          fontSize: 22,
          color: colors.textMuted,
          fontWeight: 300,
          letterSpacing: 1.2,
          direction: "rtl",
          lineHeight: 1.5,
        }}
      >
        מומלץ לדון בצעדים הבאים עם היועצת הגנטית.
      </div>
    </AbsoluteFill>
  );
};
