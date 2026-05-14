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
  fadeIn,
} from "../design/animations";

const EQ_WIDTH = 620;
const EQ_HEIGHT = 140;
const Y_EQ1 = 270;
const Y_EQ2 = Y_EQ1 + EQ_HEIGHT + 44;
const Y_CLARIFY = Y_EQ2 + EQ_HEIGHT + 78;
const EQ_LEFT = (1920 - EQ_WIDTH) / 2;

type EqDef = {
  fade: FadeWindow;
  hebrew: string;
  border: string;
  bg: string;
  y: number;
};

export const NotVUS: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eq1Fade = fadeIn(0.4, "medium", fps);
  const eq2Fade = fadeIn(1.2, "medium", fps);
  const clarifyFade = fadeIn(5.5, "slow", fps);

  const eqs: EqDef[] = [
    {
      fade: eq1Fade,
      hebrew: "מסוכן",
      border: colors.pathogenic,
      bg: colors.pathogenicSoft,
      y: Y_EQ1,
    },
    {
      fade: eq2Fade,
      hebrew: "בטוח",
      border: colors.benign,
      bg: colors.benignSoft,
      y: Y_EQ2,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgMid} 0%, ${colors.bgDeep} 70%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
      <Audio src={staticFile("audio/not-vus.mp3")} />
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

      {eqs.map((eq, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: eq.y,
            left: EQ_LEFT,
            width: EQ_WIDTH,
            height: EQ_HEIGHT,
            border: `2px solid ${eq.border}`,
            borderRadius: 16,
            background: eq.bg,
            boxShadow: "0 4px 22px rgba(0,0,0,0.32)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: opacityForWindow(frame, eq.fade),
            transform: `translateY(${translateYForWindow(frame, eq.fade)}px)`,
          }}
        >
          <div
            dir="ltr"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              fontFamily: fonts.serifLatin,
            }}
          >
            <span
              style={{
                fontSize: 58,
                color: colors.accent,
                fontWeight: 400,
                letterSpacing: 3,
              }}
            >
              VUS
            </span>
            <span
              style={{
                fontSize: 54,
                color: colors.textSecondary,
                fontWeight: 300,
              }}
            >
              ≠
            </span>
            <span
              dir="rtl"
              style={{
                fontSize: 58,
                color: colors.textPrimary,
                fontWeight: 300,
              }}
            >
              {eq.hebrew}
            </span>
          </div>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          top: Y_CLARIFY,
          left: "10%",
          right: "10%",
          textAlign: "center",
          opacity: opacityForWindow(frame, clarifyFade),
          transform: `translateY(${translateYForWindow(frame, clarifyFade)}px)`,
          fontFamily: fonts.serif,
          fontSize: 30,
          color: colors.textSecondary,
          fontWeight: 300,
          lineHeight: 1.5,
          letterSpacing: "0.01em",
        }}
      >
        המידע הקיים אינו מספיק כדי להגיע למסקנה ודאית — לכאן או לכאן
      </div>
    </AbsoluteFill>
  );
};
