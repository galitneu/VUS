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

export const Block5H1_RecessiveHit: React.FC<BlockProps> = ({
  localFrame,
  fps,
  index,
  total,
}) => {
  const iconOp = fadeWindow(localFrame, 0.3 * fps, 1.1 * fps);
  const headlineOp = fadeWindow(localFrame, 1.0 * fps, 1.8 * fps);
  const captionOp = fadeWindow(localFrame, 1.6 * fps, 2.4 * fps);

  return (
    <>
      <BlockKicker label="אופן תורשה" index={index} total={total} />

      <div
        style={{
          position: "absolute",
          top: 260,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: iconOp,
        }}
      >
        <TwoCopiesIcon />
      </div>

      <div
        style={{
          position: "absolute",
          top: 515,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.serif,
          fontSize: 40,
          color: colors.textPrimary,
          fontWeight: 300,
          opacity: headlineOp,
          direction: "rtl",
        }}
      >
        רק עותק אחד מושפע
      </div>

      <div style={{ opacity: captionOp }}>
        <BlockCaption fontSize={25}>
          לכל אחד שני עותקים של כל גן. הוריאנט שנמצא משפיע על עותק אחד בלבד.
          במחלות בתורשה רצסיבית, נדרש שינוי בשני העותקים להתבטאות המחלה.
        </BlockCaption>
      </div>
    </>
  );
};

const TwoCopiesIcon: React.FC = () => {
  const copyX = [580, 760] as const;
  const labelY = 220;
  const dotCY = 70;

  return (
    <svg
      width={280}
      height={250}
      viewBox="440 0 400 250"
      style={{ overflow: "visible" }}
    >
      {copyX.map((cx, i) => {
        const isVariant = i === 1;
        const color = isVariant ? colors.accent : colors.textSecondary;
        const opacity = isVariant ? 1 : 0.55;
        return (
          <g key={i} opacity={opacity}>
            <ellipse
              cx={cx}
              cy={dotCY}
              rx={30}
              ry={72}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
            <line
              x1={cx}
              y1={dotCY - 72}
              x2={cx}
              y2={dotCY + 72}
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            {isVariant && (
              <circle
                cx={cx}
                cy={dotCY}
                r={8}
                fill={colors.accent}
                opacity="0.9"
              />
            )}
            <text
              x={cx}
              y={labelY}
              textAnchor="middle"
              fontFamily={fonts.sans}
              fontSize={16}
              fill={color}
              letterSpacing="0.05em"
            >
              {isVariant ? "עותק 2 — וריאנט" : "עותק 1 — תקין"}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
