import React from "react";
import { fonts } from "../design/tokens";

/**
 * Wraps Latin-script text (gene names, "VUS", "ClinVar", ...) embedded in RTL
 * Hebrew copy. Isolates bidi direction and renders it in the Latin serif —
 * the design committee Q6 pairing — instead of the Hebrew face's Latin glyphs.
 */
export const Ltr: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <span
    dir="ltr"
    style={{
      unicodeBidi: "embed",
      fontFamily: fonts.serifLatin,
      ...style,
    }}
  >
    {children}
  </span>
);
