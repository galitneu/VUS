import React from "react";
import { interpolate, Easing } from "remotion";
import { colors, fonts } from "../../design/tokens";
import type { PopulationStatus } from "../../params/types";
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

type Props = BlockProps & { status: PopulationStatus };

const CAPTION: Record<PopulationStatus, string> = {
  absent: "השינוי לא תועד במאגרי מידע גנטיים של אנשים בריאים.",
  rare: "השינוי תועד במקרים בודדים במאגרי מידע גנטיים — לא ידוע האם הופיע אצל אנשים בריאים או אצל אנשים עם תסמינים.",
  present:
    "שינויים מסוג זה תועדו גם אצל אנשים בריאים. עובדה זו רלוונטית לשיקול — אם כי אינה מספיקה לקביעה ודאית.",
};

const HEADLINE: Record<PopulationStatus, string> = {
  absent: "לא תועד",
  rare: "תועד במקרים בודדים",
  present: "תועד גם באוכלוסייה בריאה",
};

const HEADLINE_COLOR: Record<PopulationStatus, string> = {
  absent: colors.textPrimary,
  rare: colors.textPrimary,
  present: colors.textPrimary,
};

export const Block5D_Population: React.FC<Props> = ({
  status,
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
      <BlockKicker label="נוכחות במאגרי מידע" index={index} total={total} />

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
        <DatabaseIcon />
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
        מאגרי מידע גנטיים
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
          color: HEADLINE_COLOR[status],
          fontWeight: 300,
          opacity: headlineOp,
          direction: "rtl",
        }}
      >
        {HEADLINE[status]}
      </div>

      <div style={{ opacity: captionOp }}>
        <BlockCaption fontSize={26}>{CAPTION[status]}</BlockCaption>
      </div>
    </>
  );
};

const DatabaseIcon: React.FC = () => (
  <svg width={110} height={130} viewBox="0 0 100 120">
    <ellipse
      cx="50"
      cy="14"
      rx="38"
      ry="9"
      fill="none"
      stroke={colors.textSecondary}
      strokeWidth="1.5"
    />
    <path
      d="M12 14 L12 38 A38 9 0 0 0 88 38 L88 14"
      fill="none"
      stroke={colors.textSecondary}
      strokeWidth="1.5"
    />
    <path
      d="M12 38 L12 62 A38 9 0 0 0 88 62 L88 38"
      fill="none"
      stroke={colors.textSecondary}
      strokeWidth="1.5"
    />
    <path
      d="M12 62 L12 86 A38 9 0 0 0 88 86 L88 62"
      fill="none"
      stroke={colors.textSecondary}
      strokeWidth="1.5"
    />
    <ellipse
      cx="50"
      cy="86"
      rx="38"
      ry="9"
      fill="none"
      stroke={colors.textSecondary}
      strokeWidth="1.5"
      opacity="0.4"
    />
  </svg>
);
