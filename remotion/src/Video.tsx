import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import type { VUSVideoParams } from "./params/types";
import { FPS, sceneDurations } from "./design/tokens";
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

const dur = (seconds: number) => Math.round(seconds * FPS);

export const Video: React.FC<{ params: VUSVideoParams }> = ({ params }) => {
  let cursor = 0;
  const at = (seconds: number) => {
    const from = cursor;
    cursor += dur(seconds);
    return from;
  };

  return (
    <AbsoluteFill>
      <Sequence
        from={at(sceneDurations.opening)}
        durationInFrames={dur(sceneDurations.opening)}
      >
        <Opening />
      </Sequence>
      <Sequence
        from={at(sceneDurations.variantIntroChrom)}
        durationInFrames={dur(sceneDurations.variantIntroChrom)}
      >
        <VariantIntroChrom geneName={params.variant.geneName} />
      </Sequence>
      <Sequence
        from={at(sceneDurations.variantIntroHelix)}
        durationInFrames={dur(sceneDurations.variantIntroHelix)}
      >
        <VariantIntroHelix />
      </Sequence>
      <Sequence
        from={at(sceneDurations.variantIntroBase)}
        durationInFrames={dur(sceneDurations.variantIntroBase)}
      >
        <VariantIntroBase notation={params.variant.notation} />
      </Sequence>
      <Sequence
        from={at(sceneDurations.categories)}
        durationInFrames={dur(sceneDurations.categories)}
      >
        <Categories />
      </Sequence>
      <Sequence
        from={at(sceneDurations.notVUS)}
        durationInFrames={dur(sceneDurations.notVUS)}
      >
        <NotVUS />
      </Sequence>
      <Sequence
        from={at(sceneDurations.specificVariant)}
        durationInFrames={dur(sceneDurations.specificVariant)}
      >
        <SpecificVariant params={params} />
      </Sequence>
      <Sequence
        from={at(sceneDurations.whyUncertain)}
        durationInFrames={dur(sceneDurations.whyUncertain)}
      >
        <WhyUncertain />
      </Sequence>
      <Sequence
        from={at(sceneDurations.timeline)}
        durationInFrames={dur(sceneDurations.timeline)}
      >
        <Timeline
          inClinvar={params.variant.inClinvar}
          clinvarAccession={params.variant.clinvarAccession}
        />
      </Sequence>
      <Sequence
        from={at(sceneDurations.closing)}
        durationInFrames={dur(sceneDurations.closing)}
      >
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
