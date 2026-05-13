import React from "react";
import { interpolate, Easing } from "remotion";
import { colors, fonts } from "../../design/tokens";
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

type Props = BlockProps & {
  geneName: string;
  literatureContext: string;
  isAdultOnset?: boolean;
};

export const Block5F_Literature: React.FC<Props> = ({
  geneName,
  literatureContext,
  isAdultOnset = false,
  localFrame,
  fps,
  index,
  total,
}) => {
  const iconOp = fadeWindow(localFrame, 0.3 * fps, 1.0 * fps);
  const contextOp = fadeWindow(localFrame, 0.9 * fps, 1.7 * fps);
  const captionOp = fadeWindow(localFrame, 1.5 * fps, 2.3 * fps);

  return (
    <>
      <BlockKicker label="הקשר ספרותי" index={index} total={total} />

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
        <LiteratureIcon />
      </div>

      <div
        style={{
          position: "absolute",
          top: 460,
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
        תוארו בספרות המדעית
      </div>

      <div
        style={{
          position: "absolute",
          top: 510,
          left: "10%",
          right: "10%",
          textAlign: "center",
          fontFamily: fonts.serif,
          fontSize: 36,
          color: colors.textPrimary,
          fontWeight: 300,
          opacity: contextOp,
          direction: "rtl",
          fontStyle: "italic",
        }}
      >
        “{literatureContext}”
      </div>

      <div style={{ opacity: captionOp }}>
        <BlockCaption fontSize={26}>
          וריאנטים בגן{" "}
          <span
            dir="ltr"
            style={{ unicodeBidi: "embed", color: colors.accent }}
          >
            {geneName}
          </span>{" "}
          תוארו בספרות המדעית בהקשר של {literatureContext}.
          {isAdultOnset && (
            <>
              {" "}
              <span style={{ color: colors.textSecondary }}>
                מחלה המתבטאת בד״כ בבגרות.
              </span>
            </>
          )}
        </BlockCaption>
      </div>
    </>
  );
};

const LiteratureIcon: React.FC = () => (
  <svg width={140} height={120} viewBox="0 0 140 120">
    <rect
      x="20"
      y="14"
      width="48"
      height="86"
      rx="2"
      fill="none"
      stroke={colors.textSecondary}
      strokeWidth="1.4"
    />
    <rect
      x="72"
      y="14"
      width="48"
      height="86"
      rx="2"
      fill="none"
      stroke={colors.textSecondary}
      strokeWidth="1.4"
    />
    <line
      x1="70"
      y1="14"
      x2="70"
      y2="100"
      stroke={colors.textSecondary}
      strokeWidth="1.4"
    />
    <line x1="30" y1="36" x2="58" y2="36" stroke={colors.textMuted} strokeWidth="1" />
    <line x1="30" y1="48" x2="58" y2="48" stroke={colors.textMuted} strokeWidth="1" />
    <line x1="30" y1="60" x2="50" y2="60" stroke={colors.textMuted} strokeWidth="1" />
    <line x1="82" y1="36" x2="110" y2="36" stroke={colors.textMuted} strokeWidth="1" />
    <line x1="82" y1="48" x2="110" y2="48" stroke={colors.textMuted} strokeWidth="1" />
    <line x1="82" y1="60" x2="102" y2="60" stroke={colors.textMuted} strokeWidth="1" />
  </svg>
);
