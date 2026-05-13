import React from "react";
import { interpolate, Easing } from "remotion";
import { colors, fonts } from "../../design/tokens";
import type { PredictionStrength } from "../../params/types";
import { BlockKicker } from "./BlockKicker";
import { BlockCaption } from "./BlockCaption";
import type { BlockProps } from "./types";

const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

const fadeWindow = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

type Props = BlockProps & { strength: PredictionStrength };

const HEADLINE: Record<PredictionStrength, string> = {
  "suggests-effect": "עשוי להשפיע",
  inconclusive: "לא חד-משמעי",
  "suggests-benign": "אינו משפיע",
};

const CAPTION: Record<PredictionStrength, string> = {
  "suggests-effect":
    "ניתוח ממוחשב מציע שהשינוי עשוי להשפיע על תפקוד החלבון. ניתוחים אלה מסייעים לסיווג, אך אינם מחליפים ראיות ישירות.",
  inconclusive: "ניתוח ממוחשב לא הצביע על השפעה ברורה — לא לכאן ולא לכאן.",
  "suggests-benign":
    "ניתוח ממוחשב מציע שהשינוי אינו משפיע על תפקוד החלבון. ניתוחים אלה מסייעים לסיווג, אך אינם מחליפים ראיות ישירות.",
};

export const Block5E_Prediction: React.FC<Props> = ({
  strength,
  localFrame,
  fps,
  index,
  total,
}) => {
  const iconOp = fadeWindow(localFrame, 0.3 * fps, 1.0 * fps);
  const headlineOp = fadeWindow(localFrame, 0.9 * fps, 1.7 * fps);
  const captionOp = fadeWindow(localFrame, 1.5 * fps, 2.3 * fps);

  return (
    <>
      <BlockKicker label="ניתוח ממוחשב" index={index} total={total} />

      <div
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: iconOp,
        }}
      >
        <AnalysisIcon />
      </div>

      <div
        style={{
          position: "absolute",
          top: 470,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.sans,
          fontSize: 14,
          color: colors.textMuted,
          letterSpacing: 3.5,
          textTransform: "uppercase",
          fontWeight: 300,
          opacity: iconOp,
        }}
      >
        השפעה על תפקוד החלבון
      </div>

      <div
        style={{
          position: "absolute",
          top: 520,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.serif,
          fontSize: 44,
          color: colors.textPrimary,
          fontWeight: 300,
          opacity: headlineOp,
          direction: "rtl",
        }}
      >
        {HEADLINE[strength]}
      </div>

      <div style={{ opacity: captionOp }}>
        <BlockCaption fontSize={24}>{CAPTION[strength]}</BlockCaption>
      </div>
    </>
  );
};

const AnalysisIcon: React.FC = () => (
  <svg width={140} height={140} viewBox="0 0 140 140">
    <rect
      x="14"
      y="80"
      width="22"
      height="44"
      rx="2"
      fill={colors.textSecondary}
      opacity="0.3"
    />
    <rect
      x="44"
      y="50"
      width="22"
      height="74"
      rx="2"
      fill={colors.textSecondary}
      opacity="0.5"
    />
    <rect
      x="74"
      y="64"
      width="22"
      height="60"
      rx="2"
      fill={colors.textSecondary}
      opacity="0.4"
    />
    <rect
      x="104"
      y="34"
      width="22"
      height="90"
      rx="2"
      fill={colors.accent}
      opacity="0.55"
    />
    <line
      x1="8"
      y1="124"
      x2="132"
      y2="124"
      stroke={colors.textMuted}
      strokeWidth="1.2"
    />
  </svg>
);
