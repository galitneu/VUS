import React from "react";
import { interpolate, Easing } from "remotion";
import { colors, fonts } from "../../design/tokens";
import { BlockKicker } from "./BlockKicker";
import { BlockCaption } from "./BlockCaption";
import type { BlockProps } from "./types";

const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

const fadeWindow = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

const BOX_W = 240;
const BOX_H = 200;
const BOX_GAP = 40;

export const Block5C1_DeNovoConfirmed: React.FC<BlockProps> = ({
  localFrame,
  fps,
  index,
  total,
}) => {
  const boxesOp = fadeWindow(localFrame, 0.3 * fps, 1.2 * fps);
  const embryoMarkOp = fadeWindow(localFrame, 1.4 * fps, 2.0 * fps);
  const captionOp = fadeWindow(localFrame, 1.8 * fps, 2.6 * fps);

  const items = [
    { label: "אבא", marked: false },
    { label: "עובר", marked: true },
    { label: "אמא", marked: false },
  ];

  const rowWidth = BOX_W * 3 + BOX_GAP * 2;
  const rowLeft = (1920 - rowWidth) / 2;

  return (
    <>
      <BlockKicker label="מקור השינוי" index={index} total={total} />

      <div
        style={{
          position: "absolute",
          top: 320,
          left: rowLeft,
          display: "flex",
          gap: BOX_GAP,
          direction: "rtl",
          opacity: boxesOp,
        }}
      >
        {items.map((it) => {
          const isMarked = it.marked;
          const markOp = isMarked ? embryoMarkOp : 0;
          return (
            <div
              key={it.label}
              style={{
                width: BOX_W,
                height: BOX_H,
                borderRadius: 14,
                border: `1.5px solid ${
                  isMarked ? colors.accent : "rgba(74,99,120,0.55)"
                }`,
                background: isMarked
                  ? colors.accentSoft
                  : "rgba(14,28,51,0.55)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                boxShadow: isMarked
                  ? `0 0 26px rgba(212,165,116,0.32)`
                  : "0 4px 18px rgba(0,0,0,0.28)",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 36,
                  color: isMarked ? colors.accent : colors.textPrimary,
                  fontWeight: 300,
                }}
              >
                {it.label}
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  color: isMarked ? colors.accent : colors.textMuted,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  fontWeight: 400,
                  opacity: isMarked ? markOp : 1,
                }}
              >
                {isMarked ? "וריאנט נמצא" : "ללא וריאנט"}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ opacity: captionOp }}>
        <BlockCaption>
          השינוי לא נמצא אצל ההורים — מדובר בשינוי שהופיע לראשונה בבדיקה זו.
        </BlockCaption>
      </div>
    </>
  );
};
