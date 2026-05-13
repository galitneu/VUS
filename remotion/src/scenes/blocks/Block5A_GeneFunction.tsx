import React from "react";
import { interpolate, Easing } from "remotion";
import { colors, fonts } from "../../design/tokens";
import type { GeneType } from "../../params/types";
import { analogyFor } from "../../params/geneTypeAnalogy";
import { BlockKicker } from "./BlockKicker";
import { BlockCaption } from "./BlockCaption";
import type { BlockProps } from "./types";

const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

type Props = BlockProps & {
  geneName: string;
  geneType: GeneType;
  proteinName: string;
  tissueRole: string;
};

const fadeWindow = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const Block5A_GeneFunction: React.FC<Props> = ({
  geneName,
  geneType,
  proteinName,
  tissueRole,
  localFrame,
  fps,
  index,
  total,
}) => {
  const analogy = analogyFor(geneType);

  const nameOp = fadeWindow(localFrame, 0.2 * fps, 1.0 * fps);
  const chainOp = fadeWindow(localFrame, 0.8 * fps, 1.6 * fps);
  const captionOp = fadeWindow(localFrame, 1.4 * fps, 2.2 * fps);

  return (
    <>
      <BlockKicker label="תפקיד הגן" index={index} total={total} />

      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.sans,
          fontSize: 88,
          fontWeight: 400,
          color: colors.accent,
          letterSpacing: 4,
          direction: "ltr",
          opacity: nameOp,
        }}
      >
        {geneName}
      </div>

      <div
        style={{
          position: "absolute",
          top: 410,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          direction: "rtl",
          opacity: chainOp,
        }}
      >
        <ChainItem label="גן" value={geneName} ltr />
        <Arrow />
        <ChainItem label="חלבון" value={proteinName} />
        <Arrow />
        <ChainItem label="רקמה" value={tissueRole} />
      </div>

      <div style={{ opacity: captionOp }}>
        <BlockCaption>
          הגן{" "}
          <span dir="ltr" style={{ unicodeBidi: "embed", color: colors.accent }}>
            {geneName}
          </span>{" "}
          מכיל הוראות לייצור {analogy}.
        </BlockCaption>
      </div>
    </>
  );
};

const ChainItem: React.FC<{
  label: string;
  value: string;
  ltr?: boolean;
}> = ({ label, value, ltr }) => (
  <div style={{ textAlign: "center", direction: "rtl", minWidth: 200 }}>
    <div
      style={{
        fontSize: 14,
        color: colors.textMuted,
        letterSpacing: 3,
        marginBottom: 12,
        fontWeight: 300,
        fontFamily: fonts.sans,
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: fonts.serif,
        fontSize: 30,
        color: colors.textPrimary,
        fontWeight: 300,
        ...(ltr
          ? { direction: "ltr", unicodeBidi: "embed", letterSpacing: 2 }
          : {}),
      }}
    >
      {value}
    </div>
  </div>
);

const Arrow: React.FC = () => (
  <div
    style={{
      fontSize: 28,
      color: colors.textSecondary,
      fontWeight: 300,
      paddingBottom: 4,
    }}
  >
    ←
  </div>
);
