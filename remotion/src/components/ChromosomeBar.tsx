import React from "react";
import { colors } from "../design/tokens";

const BANDS: { w: number; shade: number }[] = [
  { w: 0.05, shade: 0.38 },
  { w: 0.08, shade: 0.62 },
  { w: 0.04, shade: 0.30 },
  { w: 0.10, shade: 0.55 },
  { w: 0.06, shade: 0.35 },
  { w: 0.09, shade: 0.50 },
  { w: 0.05, shade: 0.68 },
  { w: 0.12, shade: 0.40 },
  { w: 0.04, shade: 0.62 },
  { w: 0.10, shade: 0.45 },
  { w: 0.06, shade: 0.32 },
  { w: 0.08, shade: 0.55 },
  { w: 0.07, shade: 0.42 },
  { w: 0.06, shade: 0.60 },
];

type Props = {
  width: number;
  height: number;
  highlight?: { start: number; end: number; opacity?: number };
};

export const ChromosomeBar: React.FC<Props> = ({
  width,
  height,
  highlight,
}) => {
  const radius = height * 0.5;
  let xCursor = 0;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        background: "#0e1c33",
        position: "relative",
        border: `1px solid rgba(74,99,120,0.45)`,
      }}
    >
      {BANDS.map((b, i) => {
        const x = xCursor;
        const w = b.w * width;
        xCursor += w;
        const c = Math.round(b.shade * 70 + 60);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: 0,
              width: w,
              height,
              background: `rgb(${c}, ${c + 18}, ${c + 32})`,
            }}
          />
        );
      })}
      {highlight && (
        <div
          style={{
            position: "absolute",
            left: highlight.start * width,
            top: 0,
            width: (highlight.end - highlight.start) * width,
            height,
            background: colors.accentSoft,
            border: `2px solid ${colors.accent}`,
            borderRadius: 6,
            opacity: highlight.opacity ?? 1,
            boxShadow: `0 0 24px ${colors.accentGlow}`,
            boxSizing: "border-box",
          }}
        />
      )}
    </div>
  );
};
