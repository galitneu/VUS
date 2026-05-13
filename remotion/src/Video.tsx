import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import type { VUSVideoParams } from "./params/types";
import { FPS, sceneDurations } from "./design/tokens";
import { Opening } from "./scenes/Opening";
import { VariantIntro } from "./scenes/VariantIntro";
import { Categories } from "./scenes/Categories";
import { NotVUS } from "./scenes/NotVUS";
import { SpecificVariant } from "./scenes/SpecificVariant";
import { WhyUncertain } from "./scenes/WhyUncertain";
import { Timeline } from "./scenes/Timeline";

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
        from={at(sceneDurations.variantIntro)}
        durationInFrames={dur(sceneDurations.variantIntro)}
      >
        <VariantIntro geneName={params.variant.geneName} />
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
    </AbsoluteFill>
  );
};
