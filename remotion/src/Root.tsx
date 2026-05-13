import React from "react";
import { Composition } from "remotion";
import { Opening } from "./scenes/Opening";
import { Video } from "./Video";
import { MVP_PARAMS } from "./params/mvp";
import { FPS, VIDEO_WIDTH, VIDEO_HEIGHT, sceneDurations, totalDurationSeconds } from "./design/tokens";
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
        id="Video"
        component={Video}
        durationInFrames={Math.round(totalDurationSeconds * FPS)}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ params: MVP_PARAMS }}
      />
    </>
  );
};
