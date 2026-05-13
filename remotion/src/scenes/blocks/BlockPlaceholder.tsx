import React from "react";
import { colors, fonts } from "../../design/tokens";
import type { BlockId } from "../../params/types";
import { BlockKicker } from "./BlockKicker";

type Props = {
  id: BlockId;
  index: number;
  total: number;
};

export const BlockPlaceholder: React.FC<Props> = ({ id, index, total }) => (
  <>
    <BlockKicker label="בקרוב" index={index} total={total} />
    <div
      style={{
        position: "absolute",
        top: 460,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: fonts.sans,
        fontSize: 32,
        color: colors.textMuted,
        fontWeight: 300,
        letterSpacing: 2,
        direction: "ltr",
      }}
    >
      Block {id} — pending implementation
    </div>
  </>
);
