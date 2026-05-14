import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../design/tokens";
import {
  type FadeWindow,
  opacityForWindow,
  translateYForWindow,
  fadeIn,
  fadeInOut,
} from "../design/animations";
import { ChromosomeBar } from "../components/ChromosomeBar";
import { SequenceZoom } from "../components/SequenceZoom";

const SEQUENCE_LETTERS = "ACGTAGCTACGAT";
const SEQ_HIGHLIGHT_INDEX = 6;
const CHROM_WIDTH = 1100;
const CHROM_HEIGHT = 64;
const CHROM_HIGHLIGHT_START = 0.46;
const CHROM_HIGHLIGHT_END = 0.54;
const PIN_X_FRACTION = 0.5;

const Y_TOPIC_LABEL = 70;
const Y_PIN_LABEL = 160;
const Y_PIN_LINE = 200;
const Y_CHROM = 250;
const Y_CHROM_LABEL = Y_CHROM + CHROM_HEIGHT + 26;
const Y_ARROW = 410;
const Y_SEQ = 480;
const Y_VARIANT_LABEL = Y_SEQ + 84;
const Y_TEXT_AREA = 740;

type Props = { geneName: string };

export const VariantIntro: React.FC<Props> = ({ geneName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromFade = fadeIn(0.3, "slow", fps);
  const chromLabelFade = fadeIn(0.8, "slow", fps);

  const geneHighlightFade = fadeIn(2.0, "slow", fps);
  const pinFade = fadeIn(2.6, "slow", fps);

  const arrowFade = fadeIn(4.2, "slow", fps);
  const seqFade = fadeIn(4.7, "slow", fps);
  const variantLabelFade = fadeIn(6.2, "slow", fps);

  const line1 = fadeInOut(7, "medium", 12.3, "medium", fps);
  const line2 = fadeInOut(13, "medium", 18.3, "medium", fps);
  const line3 = fadeIn(19, "slow", fps);

  const pulseT = (Math.sin((frame / fps) * Math.PI * (2 / 3)) + 1) / 2;
  const pulseOpacity = 0.82 + pulseT * 0.18;

  const chromLeft = (1920 - CHROM_WIDTH) / 2;
  const pinAbsX = chromLeft + PIN_X_FRACTION * CHROM_WIDTH;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgMid} 0%, ${colors.bgDeep} 70%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
      <Audio src={staticFile("audio/variant-intro.mp3")} />
      <div
        style={{
          position: "absolute",
          top: Y_TOPIC_LABEL,
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
          top: Y_CHROM,
          left: chromLeft,
          opacity: opacityForWindow(frame, chromFade),
        }}
      >
        <ChromosomeBar
          width={CHROM_WIDTH}
          height={CHROM_HEIGHT}
          highlight={{
            start: CHROM_HIGHLIGHT_START,
            end: CHROM_HIGHLIGHT_END,
            opacity: opacityForWindow(frame, geneHighlightFade) * pulseOpacity,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_CHROM_LABEL,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 18,
          color: colors.textMuted,
          letterSpacing: 1.4,
          opacity: opacityForWindow(frame, chromLabelFade),
        }}
      >
        כרומוזום · ~200 מיליון אותיות
      </div>

      {opacityForWindow(frame, pinFade) > 0.01 && (
        <>
          <div
            style={{
              position: "absolute",
              top: Y_PIN_LABEL,
              left: pinAbsX,
              transform: "translateX(-50%)",
              opacity: opacityForWindow(frame, pinFade),
              background: colors.bgMid,
              border: `1px solid ${colors.accent}`,
              borderRadius: 4,
              padding: "4px 14px",
              fontSize: 22,
              color: colors.accent,
              letterSpacing: 1.5,
              direction: "ltr",
              unicodeBidi: "embed",
              whiteSpace: "nowrap",
            }}
          >
            {geneName}
          </div>
          <div
            style={{
              position: "absolute",
              top: Y_PIN_LINE,
              left: pinAbsX,
              width: 1,
              height: Y_CHROM - Y_PIN_LINE,
              background: colors.accent,
              opacity: opacityForWindow(frame, pinFade) * 0.85,
            }}
          />
        </>
      )}

      <div
        style={{
          position: "absolute",
          top: Y_ARROW,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: opacityForWindow(frame, arrowFade),
        }}
      >
        <svg width={44} height={56}>
          <line
            x1={22}
            y1={2}
            x2={22}
            y2={42}
            stroke={colors.textSecondary}
            strokeWidth={1.6}
          />
          <polyline
            points="10,34 22,50 34,34"
            fill="none"
            stroke={colors.textSecondary}
            strokeWidth={1.6}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_SEQ,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: opacityForWindow(frame, seqFade),
        }}
      >
        <SequenceZoom
          letters={SEQUENCE_LETTERS}
          highlightIndex={SEQ_HIGHLIGHT_INDEX}
          highlightOpacity={pulseOpacity}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_VARIANT_LABEL,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 14,
          color: colors.accent,
          letterSpacing: 5,
          textTransform: "uppercase",
          fontWeight: 400,
          opacity: opacityForWindow(frame, variantLabelFade),
        }}
      >
        וריאנט
      </div>

      <div
        style={{
          position: "absolute",
          top: Y_TEXT_AREA,
          left: "8%",
          right: "8%",
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <TextLine window={line1} frame={frame}>
          גן הוא קטע בכרומוזום שמכיל הוראות לבניית חלבון
        </TextLine>
        <TextLine window={line2} frame={frame}>
          וריאנט הוא שינוי בודד באחת מהאותיות הגנטיות בתוך הגן
        </TextLine>
        <TextLine window={line3} frame={frame}>
          מרבית הוריאנטים אינם משפיעים על הבריאות — מיעוטם עשוי להשפיע
        </TextLine>
      </div>
    </AbsoluteFill>
  );
};

const TextLine: React.FC<{
  window: FadeWindow;
  frame: number;
  children: React.ReactNode;
}> = ({ window: w, frame, children }) => (
  <div
    style={{
      position: "absolute",
      opacity: opacityForWindow(frame, w),
      transform: `translateY(${translateYForWindow(frame, w)}px)`,
      fontFamily: fonts.serif,
      fontWeight: 300,
      lineHeight: 1.5,
      color: colors.textPrimary,
      maxWidth: "92%",
      fontSize: 38,
      letterSpacing: "0.01em",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);
