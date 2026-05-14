import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../design/tokens";
import { Ltr } from "../components/Ltr";
import {
  type FadeWindow,
  opacityForWindow,
  translateYForWindow,
  sec,
} from "../design/animations";

const BOX_W = 580;
const BOX_H = 240;
const BOX_GAP = 60;
const BOXES_LEFT = (1920 - (BOX_W * 2 + BOX_GAP)) / 2;

const Y_TITLE = 150;
const Y_BOXES = 340;
const Y_FINAL = Y_BOXES + BOX_H + 130;

type Card = { fade: FadeWindow; text: string };

export const WhyUncertain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (t: number) => sec(t, fps);

  const titleFade: FadeWindow = { fadeInStart: s(0.3), fadeInEnd: s(1.4) };
  const card1Fade: FadeWindow = { fadeInStart: s(2.0), fadeInEnd: s(3.2) };
  const card2Fade: FadeWindow = { fadeInStart: s(5.0), fadeInEnd: s(6.2) };
  const finalFade: FadeWindow = { fadeInStart: s(18.0), fadeInEnd: s(19.2) };

  const cards: Card[] = [
    { fade: card1Fade, text: "תפקוד החלבון לא נבדק ישירות" },
    { fade: card2Fade, text: "לא תועדו מקרים דומים עם ממצא זה" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgMid} 0%, ${colors.bgDeep} 70%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
      <Audio src={staticFile("audio/why-uncertain.mp3")} />
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 80,
          fontSize: 18,
          color: colors.textMuted,
          letterSpacing: 3.6,
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        VUS · משמעות לא ודאית
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_TITLE,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: opacityForWindow(frame, titleFade),
          transform: `translateY(${translateYForWindow(frame, titleFade)}px)`,
          fontFamily: fonts.serif,
          fontSize: 42,
          color: colors.textPrimary,
          fontWeight: 300,
          letterSpacing: "0.01em",
          lineHeight: 1.4,
        }}
      >
        לסיווג ודאי נדרשות ראיות שעדיין חסרות
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_BOXES,
          left: BOXES_LEFT,
          display: "flex",
          gap: BOX_GAP,
          direction: "rtl",
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              width: BOX_W,
              height: BOX_H,
              borderRadius: 16,
              border: `1.5px solid rgba(74,99,120,0.55)`,
              background: "rgba(14,28,51,0.55)",
              boxShadow: "0 4px 22px rgba(0,0,0,0.32)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
              padding: 32,
              boxSizing: "border-box",
              opacity: opacityForWindow(frame, c.fade),
              transform: `translateY(${translateYForWindow(frame, c.fade)}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 70,
                color: colors.accent,
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              ?
            </div>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 26,
                color: colors.textPrimary,
                fontWeight: 300,
                textAlign: "center",
                lineHeight: 1.4,
                direction: "rtl",
              }}
            >
              {c.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_FINAL,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: opacityForWindow(frame, finalFade),
          transform: `translateY(${translateYForWindow(frame, finalFade)}px)`,
          fontFamily: fonts.serif,
          fontSize: 32,
          color: colors.textPrimary,
          fontWeight: 300,
          letterSpacing: "0.01em",
          direction: "rtl",
        }}
      >
        עד שהראיות נאספות — הסיווג נשאר{" "}
        <Ltr
          style={{
            color: colors.accent,
            fontWeight: 400,
            letterSpacing: 2,
          }}
        >
          VUS
        </Ltr>
      </div>
    </AbsoluteFill>
  );
};
