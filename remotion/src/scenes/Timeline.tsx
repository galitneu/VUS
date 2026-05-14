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
  opacityForWindow,
  translateYForWindow,
  fadeIn,
} from "../design/animations";

type Props = {
  inClinvar: boolean;
  clinvarAccession?: string;
};

const TL_WIDTH = 1300;
const TL_LEFT = (1920 - TL_WIDTH) / 2;
const TL_TOP = 380;
const DOT_SIZE = 22;
const LINE_Y = DOT_SIZE / 2 - 1;

const POSITIONS = [88, 50, 12];

export const Timeline: React.FC<Props> = ({
  inClinvar,
  clinvarAccession,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleFade = fadeIn(0.3, "slow", fps);
  const lineFade = fadeIn(1.6, "slow", fps);
  const node1Fade = fadeIn(2.0, "slow", fps);
  const node2Fade = fadeIn(3.6, "slow", fps);
  const node3Fade = fadeIn(5.2, "slow", fps);
  const captionFade = fadeIn(17, "slow", fps);
  const accessionFade = fadeIn(18.5, "slow", fps);

  const node3PulseT =
    (Math.sin((frame / fps) * Math.PI * (2 / 3)) + 1) / 2;

  const nodes = [
    {
      label: "סיווג ראשוני",
      sublabel: "VUS",
      sublabelLtr: true,
      color: colors.accent,
      fade: node1Fade,
    },
    {
      label: "צבירת מידע",
      sublabel: "מחקרים · מקרים נוספים",
      color: colors.textSecondary,
      fade: node2Fade,
    },
    {
      label: "עדכון סיווג אפשרי",
      sublabel: "?",
      color: colors.green,
      fade: node3Fade,
      pulsing: true,
    },
  ] as const;

  const lineOp = opacityForWindow(frame, lineFade);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgMid} 0%, ${colors.bgDeep} 70%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
      }}
    >
      <Audio src={staticFile("audio/timeline.mp3")} />
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
          top: 150,
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
        }}
      >
        הסיווג משתנה עם הזמן
      </div>

      <div
        style={{
          position: "absolute",
          top: TL_TOP,
          left: TL_LEFT,
          width: TL_WIDTH,
          height: 200,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: LINE_Y,
            left: `${POSITIONS[2]}%`,
            width: `${POSITIONS[0] - POSITIONS[2]}%`,
            height: 1.5,
            background: `linear-gradient(90deg, ${colors.green} 0%, ${colors.textSecondary} 50%, ${colors.accent} 100%)`,
            opacity: lineOp * 0.6,
          }}
        />

        {nodes.map((n, i) => {
          const op = opacityForWindow(frame, n.fade);
          const ty = translateYForWindow(frame, n.fade);
          const isPulse = "pulsing" in n && n.pulsing;
          const pulseBlur = isPulse ? 14 + node3PulseT * 22 : 0;
          const pulseAlpha = isPulse ? 0.4 + node3PulseT * 0.4 : 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: `${POSITIONS[i]}%`,
                transform: `translateX(-50%) translateY(${ty}px)`,
                opacity: op,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                direction: "rtl",
              }}
            >
              <div
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: DOT_SIZE / 2,
                  background: n.color,
                  boxShadow: isPulse
                    ? `0 0 ${pulseBlur}px rgba(110,190,140,${pulseAlpha})`
                    : "none",
                }}
              />
              <div
                style={{
                  marginTop: 28,
                  fontFamily: fonts.serif,
                  fontSize: 26,
                  color: n.color,
                  fontWeight: 300,
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {n.label}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: fonts.sans,
                  fontSize: 16,
                  color: colors.textMuted,
                  letterSpacing: 1.2,
                  ...("sublabelLtr" in n && n.sublabelLtr
                    ? {
                        direction: "ltr",
                        unicodeBidi: "embed",
                        letterSpacing: 2,
                        fontFamily: fonts.sansLatin,
                      }
                    : {}),
                }}
              >
                {n.sublabel}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          top: 720,
          left: "10%",
          right: "10%",
          textAlign: "center",
          opacity: opacityForWindow(frame, captionFade),
          transform: `translateY(${translateYForWindow(frame, captionFade)}px)`,
          fontFamily: fonts.serif,
          fontSize: 30,
          color: colors.textPrimary,
          fontWeight: 300,
          lineHeight: 1.5,
          letterSpacing: "0.01em",
          direction: "rtl",
        }}
      >
        {inClinvar ? (
          <>
            הוריאנט רשום במאגר{" "}
            <Ltr style={{ color: colors.accent }}>ClinVar</Ltr>{" "}
            הציבורי — ייתכן שיתעדכן ככל שמתווסף מידע חדש.
          </>
        ) : (
          <>סיווגי וריאנטים אינם קבועים — ייתכן שיתעדכנו ככל שמתווסף מידע חדש.</>
        )}
      </div>

      {inClinvar && clinvarAccession && (
        <div
          style={{
            position: "absolute",
            top: 830,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: opacityForWindow(frame, accessionFade),
            fontFamily: fonts.sans,
            fontSize: 14,
            color: colors.textMuted,
            letterSpacing: 2.5,
            direction: "ltr",
          }}
        >
          {clinvarAccession}
        </div>
      )}
    </AbsoluteFill>
  );
};
