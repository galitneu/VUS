import React from "react";
import { Composition } from "remotion";
import { Opening } from "./scenes/Opening";
import { VariantIntroChrom } from "./scenes/VariantIntroChrom";
import { VariantIntroHelix } from "./scenes/VariantIntroHelix";
import { VariantIntroBase } from "./scenes/VariantIntroBase";
import { Categories } from "./scenes/Categories";
import { NotVUS } from "./scenes/NotVUS";
import { SpecificVariant } from "./scenes/SpecificVariant";
import { WhyUncertain } from "./scenes/WhyUncertain";
import { Timeline } from "./scenes/Timeline";
import { Closing } from "./scenes/Closing";
import { Video } from "./Video";
import { CURRENT_CASE } from "./params/currentCase";
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
        id="VariantIntroChrom"
        component={VariantIntroChrom}
        durationInFrames={Math.round(sceneDurations.variantIntroChrom * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ geneName: CURRENT_CASE.variant.geneName }}
      />
      <Composition
        id="VariantIntroHelix"
        component={VariantIntroHelix}
        durationInFrames={Math.round(sceneDurations.variantIntroHelix * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="VariantIntroBase"
        component={VariantIntroBase}
        durationInFrames={Math.round(sceneDurations.variantIntroBase * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ notation: CURRENT_CASE.variant.notation }}
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
        defaultProps={{ params: CURRENT_CASE }}
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
          inClinvar: CURRENT_CASE.variant.inClinvar,
          clinvarAccession: CURRENT_CASE.variant.clinvarAccession,
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
        defaultProps={{ params: CURRENT_CASE }}
      />
    </>
  );
};
