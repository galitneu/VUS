import React from "react";
import { colors, fonts } from "../../design/tokens";

type Props = {
  children: React.ReactNode;
  top?: number;
  fontSize?: number;
};

export const BlockCaption: React.FC<Props> = ({
  children,
  top = 750,
  fontSize = 30,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left: "10%",
      right: "10%",
      textAlign: "center",
      fontFamily: fonts.serif,
      fontSize,
      color: colors.textPrimary,
      fontWeight: 300,
      lineHeight: 1.5,
      letterSpacing: "0.01em",
      direction: "rtl",
    }}
  >
    {children}
  </div>
);
