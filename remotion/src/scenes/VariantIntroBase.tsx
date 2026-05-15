import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Ltr } from "../components/Ltr";
import { colors, fonts } from "../design/tokens";
import { parseBases } from "../params/notation";
import { BasePair } from "./gene-scene/BasePair";
import { StageRig } from "./gene-scene/StageRig";
import {
  Breadcrumb,
  Dots,
  NarrationText,
  ProgressBar,
  SCENE_BACKGROUND,
  StageTag,
  TopicLabel,
  useSceneFadeIn,
} from "./gene-scene/Overlays";

type Props = { notation?: string };

/** Stage 3 of the gene scene — the variant base-pair close-up. */
export const VariantIntroBase: React.FC<Props> = ({ notation }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;
  const sceneOpacity = useSceneFadeIn();
  const [origBase, varBase] = parseBases(notation);

  return (
    <AbsoluteFill style={{ ...SCENE_BACKGROUND, opacity: sceneOpacity }}>
      <Audio src={staticFile("audio/variant-intro-base.mp3")} />

      <ThreeCanvas
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        <StageRig camera="stage2" time={time}>
          <BasePair visible={true} scale={1} time={time} />
        </StageRig>
      </ThreeCanvas>

      <TopicLabel />
      <StageTag num={3} name="וריאנט" />
      <Breadcrumb />

      <div
        style={{
          position: "absolute",
          top: 600,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 48,
          direction: "ltr",
        }}
      >
        <ContextColumn letters={["A", "C", "G"]} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 26 }}>
          <BaseLabel
            letter={origBase}
            caption="מקורי"
            color={colors.pathogenic}
          />
          <div
            style={{
              fontSize: 30,
              color: colors.textSecondary,
              marginTop: 8,
            }}
          >
            →
          </div>
          <BaseLabel letter={varBase} caption="וריאנט" color={colors.accent} />
        </div>
        <ContextColumn letters={["T", "A", "C"]} />
      </div>

      <NarrationText>
        הבדיקה זיהתה שינוי בנקודה ספציפית ברצף הגן: האות{" "}
        <Ltr>{origBase}</Ltr> הוחלפה ב-<Ltr>{varBase}</Ltr>. זו האות שנמצאת
        במוקד.
      </NarrationText>

      <Dots active={3} />
      <ProgressBar />
    </AbsoluteFill>
  );
};

const ContextColumn: React.FC<{ letters: string[] }> = ({ letters }) => (
  <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
    {letters.map((l, i) => (
      <div
        key={i}
        style={{
          fontSize: 26,
          color: colors.textMuted,
          fontFamily: fonts.serifLatin,
        }}
      >
        {l}
      </div>
    ))}
  </div>
);

const BaseLabel: React.FC<{
  letter: string;
  caption: string;
  color: string;
}> = ({ letter, caption, color }) => (
  <div style={{ textAlign: "center", direction: "rtl" }}>
    <div
      style={{
        fontSize: 40,
        fontWeight: 400,
        color,
        fontFamily: fonts.serifLatin,
        direction: "ltr",
      }}
    >
      {letter}
    </div>
    <div
      style={{
        fontSize: 15,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginTop: 4,
      }}
    >
      {caption}
    </div>
  </div>
);
