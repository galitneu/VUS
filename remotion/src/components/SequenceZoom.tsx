import React from "react";
import { colors, fonts } from "../design/tokens";

type Props = {
  letters: string;
  highlightIndex: number;
  highlightOpacity?: number;
  cellSize?: number;
  gap?: number;
};

export const SequenceZoom: React.FC<Props> = ({
  letters,
  highlightIndex,
  highlightOpacity = 1,
  cellSize = 60,
  gap = 10,
}) => {
  return (
    <div style={{ display: "flex", gap, direction: "ltr" }}>
      {letters.split("").map((l, i) => {
        const isHighlight = i === highlightIndex;
        return (
          <div
            key={i}
            style={{
              width: cellSize,
              height: cellSize,
              border: `1px solid ${isHighlight ? colors.accent : "rgba(74,99,120,0.7)"}`,
              borderRadius: 8,
              background: isHighlight
                ? colors.accentSoft
                : "rgba(14,28,51,0.7)",
              opacity: isHighlight ? highlightOpacity : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.sans,
              fontSize: 28,
              fontWeight: isHighlight ? 400 : 300,
              color: isHighlight ? colors.accent : colors.textSecondary,
              textShadow: isHighlight
                ? `0 0 14px ${colors.accentGlow}`
                : "none",
              boxShadow: isHighlight
                ? `0 0 22px ${colors.accentGlow}`
                : "none",
              boxSizing: "border-box",
            }}
          >
            {l}
          </div>
        );
      })}
    </div>
  );
};
