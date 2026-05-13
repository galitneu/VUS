import React from "react";
import { Composition } from "remotion";
import { Opening } from "./scenes/Opening";
import { VariantIntro } from "./scenes/VariantIntro";
import { Categories } from "./scenes/Categories";
import { Video } from "./Video";
import { CASE_COL4A2 } from "./params/cases/mvp_col4a2";
import {
  FPS,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  sceneDurations,
  totalDurationSeconds,
} from "./design/tokens";
import "./fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={Math.round(sceneDurations.opening * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="VariantIntro"
        component={VariantIntro}
        durationInFrames={Math.round(sceneDurations.variantIntro * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ geneName: CASE_COL4A2.variant.geneName }}
      />
      <Composition
        id="Categories"
        component={Categories}
        durationInFrames={Math.round(sceneDurations.categories * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="Video"
        component={Video}
        durationInFrames={Math.round(totalDurationSeconds * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ params: CASE_COL4A2 }}
      />
    </>
  );
};
