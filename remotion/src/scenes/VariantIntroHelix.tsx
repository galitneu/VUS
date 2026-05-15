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
import { Helix } from "./gene-scene/Helix";
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

/**
 * Stage 2 of the gene scene — the generic DNA double helix with the variant
 * pair lit up. Case-independent: this sub-scene's render is identical for
 * every variant case, so the build pipeline caches it permanently.
 */
export const VariantIntroHelix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;
  const sceneOpacity = useSceneFadeIn();

  return (
    <AbsoluteFill style={{ ...SCENE_BACKGROUND, opacity: sceneOpacity }}>
      <Audio src={staticFile("audio/variant-intro-helix.mp3")} />

      <ThreeCanvas
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        <StageRig camera="stage1" time={time}>
          <Helix visible={true} scale={1} time={time} />
        </StageRig>
      </ThreeCanvas>

      <TopicLabel />
      <StageTag num={2} name="סליל DNA" />
      <Breadcrumb />

      <NarrationText>
        הגן עצמו בנוי מסליל של אותיות גנטיות — <Ltr>A</Ltr>, <Ltr>T</Ltr>,{" "}
        <Ltr>G</Ltr> ו-<Ltr>C</Ltr>. הסדר המדויק של האותיות הוא ההוראה:
        ממנו הגוף קורא כיצד לבנות חלבון.
      </NarrationText>

      <Dots active={2} />
      <ProgressBar />
    </AbsoluteFill>
  );
};
