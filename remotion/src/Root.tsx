import React from "react";
import { Composition } from "remotion";
import { Opening } from "./Opening";
import "./fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={15 * 30}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
