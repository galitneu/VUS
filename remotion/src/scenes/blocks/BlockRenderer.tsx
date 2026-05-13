import React from "react";
import type { BlockId, VUSVideoParams } from "../../params/types";
import { Block5A_GeneFunction } from "./Block5A_GeneFunction";
import { Block5B1_SNV } from "./Block5B1_SNV";
import { Block5C1_DeNovoConfirmed } from "./Block5C1_DeNovoConfirmed";
import { Block5D_Population } from "./Block5D_Population";
import { Block5D4_LOFTolerant } from "./Block5D4_LOFTolerant";
import { Block5E_Prediction } from "./Block5E_Prediction";
import { Block5F_Literature } from "./Block5F_Literature";
import { Block5H1_RecessiveHit } from "./Block5H1_RecessiveHit";
import { BlockPlaceholder } from "./BlockPlaceholder";

type Props = {
  id: BlockId;
  params: VUSVideoParams;
  localFrame: number;
  fps: number;
  index: number;
  total: number;
};

export const BlockRenderer: React.FC<Props> = ({
  id,
  params,
  localFrame,
  fps,
  index,
  total,
}) => {
  const common = { localFrame, fps, index, total };

  switch (id) {
    case "5-A":
      return (
        <Block5A_GeneFunction
          geneName={params.variant.geneName}
          geneType={params.gene.geneType}
          proteinName={params.gene.proteinName}
          tissueRole={params.gene.tissueRole}
          {...common}
        />
      );
    case "5-B1":
      return <Block5B1_SNV {...common} />;
    case "5-C1":
      return <Block5C1_DeNovoConfirmed {...common} />;
    case "5-D1":
      return <Block5D_Population status="absent" {...common} />;
    case "5-D2":
      return <Block5D_Population status="rare" {...common} />;
    case "5-D3":
      return <Block5D_Population status="present" {...common} />;
    case "5-D4":
      return <Block5D4_LOFTolerant {...common} />;
    case "5-E1":
      return <Block5E_Prediction strength="suggests-effect" {...common} />;
    case "5-E2":
      return <Block5E_Prediction strength="inconclusive" {...common} />;
    case "5-E3":
      return <Block5E_Prediction strength="suggests-benign" {...common} />;
    case "5-F1":
      if (!params.gene.literatureContext) return null;
      return (
        <Block5F_Literature
          geneName={params.variant.geneName}
          literatureContext={params.gene.literatureContext}
          {...common}
        />
      );
    case "5-F2":
      if (!params.gene.literatureContext) return null;
      return (
        <Block5F_Literature
          geneName={params.variant.geneName}
          literatureContext={params.gene.literatureContext}
          isAdultOnset
          {...common}
        />
      );
    case "5-H1":
      return <Block5H1_RecessiveHit {...common} />;
    default:
      return <BlockPlaceholder id={id} index={index} total={total} />;
  }
};
