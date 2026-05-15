import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Ltr } from "../components/Ltr";
import { colors } from "../design/tokens";
import { Chromosome } from "./gene-scene/Chromosome";
import { StageRig } from "./gene-scene/StageRig";
import {
  Dots,
  NarrationText,
  ProgressBar,
  SCENE_BACKGROUND,
  StageTag,
  TopicLabel,
  useSceneFadeIn,
} from "./gene-scene/Overlays";

// Committee rule: the gene name appears in the narration exactly when the
// callout box materialises on screen — not before, not after.
const GENE_CLAUSE_AT = 2.2;

type Props = { geneName: string };

/** Stage 1 of the gene scene — rotating chromosome with the gold gene ring. */
export const VariantIntroChrom: React.FC<Props> = ({ geneName }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;
  const sceneOpacity = useSceneFadeIn();

  const calloutOp = interpolate(
    time,
    [GENE_CLAUSE_AT, GENE_CLAUSE_AT + 0.6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const showGeneClause = time > GENE_CLAUSE_AT;

  return (
    <AbsoluteFill style={{ ...SCENE_BACKGROUND, opacity: sceneOpacity }}>
      <Audio src={staticFile("audio/variant-intro-chrom.mp3")} />

      <ThreeCanvas
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        <StageRig camera="stage0" time={time}>
          <Chromosome visible={true} scale={1.3} time={time} />
        </StageRig>
      </ThreeCanvas>

      <TopicLabel />
      <StageTag num={1} name="כרומוזום" />

      {calloutOp > 0.01 && (
        <div
          style={{
            position: "absolute",
            top: 392,
            right: 300,
            opacity: calloutOp,
            display: "flex",
            alignItems: "center",
            direction: "ltr",
          }}
        >
          <div
            style={{
              background: colors.bgMid,
              border: `1px solid ${colors.accent}`,
              borderRadius: 4,
              padding: "6px 16px",
              fontSize: 24,
              color: colors.accent,
              letterSpacing: 1.5,
              whiteSpace: "nowrap",
            }}
          >
            <Ltr>{geneName}</Ltr>
          </div>
          <div
            style={{
              width: 150,
              height: 1,
              background: colors.accent,
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: colors.accent,
              marginLeft: -3,
            }}
          />
        </div>
      )}

      <NarrationText>
        כרומוזום הוא מבנה שנמצא בכל תא בגוף ומכיל חלק מהמידע הגנטי.
        {showGeneClause && (
          <>
            {" "}
            הגן <Ltr>{geneName}</Ltr> — זה שנמצא בבדיקה — יושב בנקודה
            ספציפית על אחד מהכרומוזומים.
          </>
        )}
      </NarrationText>

      <Dots active={1} />
      <ProgressBar />
    </AbsoluteFill>
  );
};
