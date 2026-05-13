import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../design/tokens";
import {
  type FadeWindow,
  opacityForWindow,
  translateYForWindow,
  sec,
} from "../design/animations";

const BOX_WIDTH = 440;
const BOX_HEIGHT = 270;
const BOX_GAP = 50;
const TOTAL_W = BOX_WIDTH * 3 + BOX_GAP * 2;
const BOXES_LEFT = (1920 - TOTAL_W) / 2;

const Y_TITLE = 130;
const Y_SUBTITLE = 192;
const Y_BOXES = 320;
const Y_ARROW = Y_BOXES + BOX_HEIGHT + 50;
const Y_FINAL = Y_ARROW + 52;

type Category = {
  label: string;
  hebrew: string;
  sub: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  isVUS?: boolean;
};

const CATEGORIES: Category[] = [
  {
    label: "Pathogenic",
    hebrew: "פתוגני",
    sub: "גורם למחלה",
    borderColor: colors.red,
    bgColor: colors.redSoft,
    textColor: colors.red,
  },
  {
    label: "VUS",
    hebrew: "משמעות לא ודאית",
    sub: "מידע עדיין לא חד-משמעי",
    borderColor: colors.accent,
    bgColor: colors.accentSoft,
    textColor: colors.accent,
    isVUS: true,
  },
  {
    label: "Benign",
    hebrew: "שפיר",
    sub: "אינו גורם למחלה",
    borderColor: colors.green,
    bgColor: colors.greenSoft,
    textColor: colors.green,
  },
];

export const Categories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (t: number) => sec(t, fps);

  const titleFade: FadeWindow = { fadeInStart: s(0.3), fadeInEnd: s(1.3) };
  const subtitleFade: FadeWindow = { fadeInStart: s(0.7), fadeInEnd: s(1.6) };
  const boxFades: FadeWindow[] = [
    { fadeInStart: s(1.4), fadeInEnd: s(2.3) },
    { fadeInStart: s(1.7), fadeInEnd: s(2.6) },
    { fadeInStart: s(2.0), fadeInEnd: s(2.9) },
  ];
  const arrowFade: FadeWindow = { fadeInStart: s(19), fadeInEnd: s(20) };
  const finalLabelFade: FadeWindow = { fadeInStart: s(19.5), fadeInEnd: s(20.4) };

  const pulseT = (Math.sin((frame / fps) * Math.PI * (2 / 3)) + 1) / 2;
  const glowBlur = 22 + pulseT * 30;
  const glowAlpha = 0.28 + pulseT * 0.22;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgMid} 0%, ${colors.bgDeep} 70%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
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
          fontSize: 44,
          fontWeight: 300,
          color: colors.textPrimary,
          letterSpacing: "0.01em",
        }}
      >
        סיווג וריאנטים
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_SUBTITLE,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: opacityForWindow(frame, subtitleFade),
          fontSize: 18,
          color: colors.textMuted,
          letterSpacing: 1.4,
          fontWeight: 300,
        }}
      >
        לפי כללים מקצועיים בינלאומיים
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_BOXES,
          left: BOXES_LEFT,
          display: "flex",
          direction: "ltr",
          gap: BOX_GAP,
        }}
      >
        {CATEGORIES.map((cat, i) => {
          const fade = boxFades[i];
          return (
            <div
              key={cat.label}
              style={{
                width: BOX_WIDTH,
                height: BOX_HEIGHT,
                border: `2px solid ${cat.borderColor}`,
                borderRadius: 16,
                background: cat.bgColor,
                opacity: opacityForWindow(frame, fade),
                transform: `translateY(${translateYForWindow(frame, fade)}px)`,
                boxShadow: cat.isVUS
                  ? `0 0 ${glowBlur}px rgba(212, 165, 116, ${glowAlpha})`
                  : "0 4px 22px rgba(0,0,0,0.32)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                boxSizing: "border-box",
                direction: "rtl",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 34,
                  fontWeight: 400,
                  color: cat.textColor,
                  letterSpacing: 2,
                  direction: "ltr",
                  marginBottom: 14,
                }}
              >
                {cat.label}
              </div>
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 26,
                  fontWeight: 300,
                  color: colors.textPrimary,
                  direction: "rtl",
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                {cat.hebrew}
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 17,
                  color: colors.textSecondary,
                  fontWeight: 300,
                  direction: "rtl",
                  textAlign: "center",
                  letterSpacing: 0.5,
                }}
              >
                {cat.sub}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_ARROW,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: opacityForWindow(frame, arrowFade),
          fontSize: 30,
          color: colors.accent,
          fontWeight: 400,
        }}
      >
        ↑
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_FINAL,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: opacityForWindow(frame, finalLabelFade),
          transform: `translateY(${translateYForWindow(frame, finalLabelFade)}px)`,
          fontFamily: fonts.serif,
          fontSize: 32,
          color: colors.textPrimary,
          fontWeight: 300,
          letterSpacing: "0.01em",
          direction: "rtl",
        }}
      >
        הוריאנט בבדיקה מסווג כ-
        <span
          dir="ltr"
          style={{
            unicodeBidi: "embed",
            color: colors.accent,
            fontWeight: 400,
            letterSpacing: 2,
          }}
        >
          VUS
        </span>
      </div>
    </AbsoluteFill>
  );
};
