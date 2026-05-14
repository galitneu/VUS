import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { colors, fonts } from "../design/tokens";
import { Ltr } from "../components/Ltr";
import { Scene3D } from "./gene-scene/Scene3D";
import {
  getStageState,
  GENE_Y,
  STAGE_NAMES,
  type StageState,
} from "./gene-scene/rig";

type Props = { geneName: string; notation?: string };

const GENE_CLAUSE_AT = 2.2; // seconds into stage 0 — spec committee rule

// "c.2552G>T (p.Gly851Val)" -> ["G", "T"]; falls back to the spec defaults.
const parseBases = (notation?: string): [string, string] => {
  const m = notation?.match(/([ACGT])>([ACGT])/);
  return m ? [m[1], m[2]] : ["G", "T"];
};

/** Which stage's narration to show — switches at the transition midpoint. */
const narrationStageOf = (s: StageState): 0 | 1 | 2 =>
  s.inTransition && s.transT < 0.5 ? s.fromStage : s.stage;

export const VariantIntro: React.FC<Props> = ({ geneName, notation }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const timeSec = frame / fps;
  const totalSec = durationInFrames / fps;

  const state = getStageState(timeSec, totalSec);
  const [origBase, varBase] = parseBases(notation);

  const sceneOpacity = interpolate(frame, [0, fps * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nStage = narrationStageOf(state);
  const narrationOpacity = state.inTransition
    ? 0.25 + Math.abs(state.transT - 0.5) * 2 * 0.75
    : 1;

  const showGeneClause =
    state.stage === 0 &&
    !state.inTransition &&
    state.stageTimeSec > GENE_CLAUSE_AT;

  // Callout appears with the gene clause, during the stage-0 hold only.
  const calloutOpacity =
    state.stage === 0 && !state.inTransition
      ? interpolate(
          state.stageTimeSec,
          [GENE_CLAUSE_AT, GENE_CLAUSE_AT + 0.6],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 0;

  const breadcrumbVisible = nStage >= 1;
  const progress = Math.min(1, frame / durationInFrames);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, ${colors.bgMid} 0%, ${colors.bgDeep} 55%, ${colors.bgDarker} 100%)`,
        fontFamily: fonts.sans,
        direction: "rtl",
        opacity: sceneOpacity,
      }}
    >
      <Audio src={staticFile("audio/variant-intro.mp3")} />

      <ThreeCanvas
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene3D />
      </ThreeCanvas>

      {/* topic label — consistent with the other scenes */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          fontSize: 18,
          color: colors.textMuted,
          letterSpacing: 3.6,
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        <Ltr style={{ fontFamily: fonts.sansLatin }}>VUS</Ltr> · משמעות לא ודאית
      </div>

      {/* stage tag */}
      <div
        style={{
          position: "absolute",
          top: 58,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 19,
          color: colors.textSecondary,
          letterSpacing: 2,
          fontWeight: 300,
        }}
      >
        שלב {state.stage + 1} מתוך 3 ·{" "}
        <span style={{ color: colors.accent }}>
          {STAGE_NAMES[state.stage]}
        </span>
      </div>

      {/* breadcrumb mini-chromosome */}
      {breadcrumbVisible && (
        <svg
          width={46}
          height={84}
          viewBox="0 0 46 84"
          style={{ position: "absolute", top: 104, left: 90, opacity: 0.85 }}
        >
          <rect x={17} y={6} width={12} height={30} rx={6} fill={colors.textSecondary} />
          <rect x={17} y={40} width={12} height={38} rx={6} fill={colors.textSecondary} />
          <circle cx={23} cy={38} r={5.5} fill={colors.textMuted} />
          <circle cx={23} cy={27} r={4.5} fill={colors.accent} />
        </svg>
      )}

      {/* gene callout — stage 0 */}
      {calloutOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            top: 392,
            right: 300,
            opacity: calloutOpacity,
            display: "flex",
            alignItems: "center",
            gap: 0,
            direction: "ltr",
          }}
        >
          <div
            style={{
              background: colors.bgMid,
              border: `1px solid ${colors.accent}`,
              borderRadius: 4,
              padding: "6px 16px",
              fontSize: 24,
              color: colors.accent,
              letterSpacing: 1.5,
              whiteSpace: "nowrap",
            }}
          >
            <Ltr style={{ fontFamily: fonts.sansLatin }}>{geneName}</Ltr>
          </div>
          <div
            style={{
              width: 150,
              height: 1,
              background: colors.accent,
              opacity: 0.7,
            }}
          />
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: colors.accent,
              marginLeft: -3,
            }}
          />
        </div>
      )}

      {/* base-pair labels — stage 2 */}
      {nStage === 2 && (
        <div
          style={{
            position: "absolute",
            top: 600,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 48,
            direction: "ltr",
            opacity: narrationOpacity,
          }}
        >
          <ContextColumn letters={["A", "C", "G"]} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 26 }}>
            <BaseLabel letter={origBase} caption="מקורי" color={colors.pathogenic} />
            <div style={{ fontSize: 30, color: colors.textSecondary, marginTop: 8 }}>→</div>
            <BaseLabel letter={varBase} caption="וריאנט" color={colors.accent} />
          </div>
          <ContextColumn letters={["T", "A", "C"]} />
        </div>
      )}

      {/* narration */}
      <div
        style={{
          position: "absolute",
          bottom: 132,
          left: "13%",
          right: "13%",
          textAlign: "center",
          fontFamily: fonts.serif,
          fontWeight: 300,
          fontSize: 31,
          lineHeight: 1.5,
          color: colors.textPrimary,
          letterSpacing: "0.01em",
          opacity: narrationOpacity,
        }}
      >
        {nStage === 0 && (
          <>
            כרומוזום הוא מבנה שנמצא בכל תא בגוף ומכיל חלק מהמידע הגנטי.
            {showGeneClause && (
              <>
                {" "}
                הגן <Ltr>{geneName}</Ltr> — זה שנמצא בבדיקה — יושב בנקודה
                ספציפית על אחד מהכרומוזומים.
              </>
            )}
          </>
        )}
        {nStage === 1 && (
          <>
            הגן עצמו בנוי מסליל של אותיות גנטיות — <Ltr>A</Ltr>, <Ltr>T</Ltr>,{" "}
            <Ltr>G</Ltr> ו-<Ltr>C</Ltr>. הסדר המדויק של האותיות הוא ההוראה:
            ממנו הגוף קורא כיצד לבנות חלבון.
          </>
        )}
        {nStage === 2 && (
          <>
            הבדיקה זיהתה שינוי בנקודה ספציפית ברצף הגן: האות{" "}
            <Ltr>{origBase}</Ltr> הוחלפה ב-<Ltr>{varBase}</Ltr>. זו האות
            שנמצאת במוקד.
          </>
        )}
      </div>

      {/* stage dots */}
      <div
        style={{
          position: "absolute",
          bottom: 46,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background:
                i === state.stage ? colors.accent : colors.textMuted,
              transform: i === state.stage ? "scale(1.5)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: `${progress * 100}%`,
          background: colors.accent,
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};

const ContextColumn: React.FC<{ letters: string[] }> = ({ letters }) => (
  <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
    {letters.map((l, i) => (
      <div
        key={i}
        style={{
          fontSize: 26,
          color: colors.textMuted,
          fontFamily: fonts.serifLatin,
        }}
      >
        {l}
      </div>
    ))}
  </div>
);

const BaseLabel: React.FC<{
  letter: string;
  caption: string;
  color: string;
}> = ({ letter, caption, color }) => (
  <div style={{ textAlign: "center", direction: "rtl" }}>
    <div
      style={{
        fontSize: 40,
        fontWeight: 400,
        color,
        fontFamily: fonts.serifLatin,
        direction: "ltr",
      }}
    >
      {letter}
    </div>
    <div
      style={{
        fontSize: 15,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginTop: 4,
      }}
    >
      {caption}
    </div>
  </div>
);
