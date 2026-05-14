import React from "react";
import { Composition } from "remotion";
import { Opening } from "./scenes/Opening";
import { VariantIntro } from "./scenes/VariantIntro";
import { Categories } from "./scenes/Categories";
import { NotVUS } from "./scenes/NotVUS";
import { SpecificVariant } from "./scenes/SpecificVariant";
import { WhyUncertain } from "./scenes/WhyUncertain";
import { Timeline } from "./scenes/Timeline";
import { Closing } from "./scenes/Closing";
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
        defaultProps={{
          geneName: CASE_COL4A2.variant.geneName,
          notation: CASE_COL4A2.variant.notation,
        }}
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
        id="NotVUS"
        component={NotVUS}
        durationInFrames={Math.round(sceneDurations.notVUS * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="SpecificVariant"
        component={SpecificVariant}
        durationInFrames={Math.round(sceneDurations.specificVariant * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ params: CASE_COL4A2 }}
      />
      <Composition
        id="WhyUncertain"
        component={WhyUncertain}
        durationInFrames={Math.round(sceneDurations.whyUncertain * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="Timeline"
        component={Timeline}
        durationInFrames={Math.round(sceneDurations.timeline * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          inClinvar: CASE_COL4A2.variant.inClinvar,
          clinvarAccession: CASE_COL4A2.variant.clinvarAccession,
        }}
      />
      <Composition
        id="Closing"
        component={Closing}
        durationInFrames={Math.round(sceneDurations.closing * FPS)}
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
