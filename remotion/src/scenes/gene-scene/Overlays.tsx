import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../design/tokens";
import { Ltr } from "../../components/Ltr";

/** Style props shared by every gene sub-scene's outer AbsoluteFill. */
export const SCENE_BACKGROUND: React.CSSProperties = {
  background: `radial-gradient(ellipse at 50% 45%, ${colors.bgMid} 0%, ${colors.bgDeep} 55%, ${colors.bgDarker} 100%)`,
  fontFamily: fonts.sans,
  direction: "rtl",
};

/** A soft 0.6s fade-in at the start of every sub-scene. */
export const useSceneFadeIn = (): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame, [0, fps * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const TopicLabel: React.FC = () => (
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
);

export const StageTag: React.FC<{ num: 1 | 2 | 3; name: string }> = ({
  num,
  name,
}) => (
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
    שלב {num} מתוך 3 ·{" "}
    <span style={{ color: colors.accent }}>{name}</span>
  </div>
);

export const NarrationText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
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
    }}
  >
    {children}
  </div>
);

export const Dots: React.FC<{ active: 1 | 2 | 3 }> = ({ active }) => (
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
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: i === active ? colors.accent : colors.textMuted,
          transform: i === active ? "scale(1.5)" : "scale(1)",
        }}
      />
    ))}
  </div>
);

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = Math.min(1, frame / durationInFrames);
  return (
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
  );
};

/** Mini-chromosome icon, top-left — shown in the helix and base sub-scenes. */
export const Breadcrumb: React.FC = () => (
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
);
