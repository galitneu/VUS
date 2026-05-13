import React from "react";
import { colors, fonts } from "../../design/tokens";

type Props = {
  label: string;
  index: number;
  total: number;
};

export const BlockKicker: React.FC<Props> = ({ label, index, total }) => (
  <div
    style={{
      position: "absolute",
      top: 120,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: fonts.sans,
      fontSize: 15,
      color: colors.textMuted,
      letterSpacing: 3.2,
      textTransform: "uppercase",
      fontWeight: 300,
    }}
  >
    {label} · {index + 1}/{total}
  </div>
);
