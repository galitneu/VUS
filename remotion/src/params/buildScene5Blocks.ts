import type { BlockId, VUSVideoParams } from "./types";

export function buildScene5Blocks(params: VUSVideoParams): BlockId[] {
  const blocks: BlockId[] = ["5-A"];

  if (params.variant.variantClass === "snv") {
    blocks.push(params.variant.variantType === "splice" ? "5-B2" : "5-B1");
  } else if (params.variant.variantClass === "cnv-deletion") {
    blocks.push("5-B3");
  } else {
    blocks.push("5-B4");
  }

  const deNovoMap: Record<VUSVideoParams["variant"]["deNovoStatus"], BlockId> = {
    confirmed: "5-C1",
    "inherited-healthy-parent": "5-C2",
    unknown: "5-C3",
  };
  blocks.push(deNovoMap[params.variant.deNovoStatus]);

  const popMap: Record<VUSVideoParams["variant"]["populationStatus"], BlockId> = {
    absent: "5-D1",
    rare: "5-D2",
    present: "5-D3",
  };
  blocks.push(popMap[params.variant.populationStatus]);

  if (params.variant.predictionAvailable && params.variant.predictionStrength) {
    const predMap: Record<NonNullable<VUSVideoParams["variant"]["predictionStrength"]>, BlockId> = {
      "suggests-effect": "5-E1",
      inconclusive: "5-E2",
      "suggests-benign": "5-E3",
    };
    blocks.push(predMap[params.variant.predictionStrength]);
  }

  if (params.gene.literatureContext) blocks.push("5-F1");

  if (params.cnv) {
    if (params.cnv.lofInHealthyPopulation) blocks.push("5-G1");
    if (params.cnv.keyGeneKnownPathogenic) blocks.push("5-G2");
  }

  return blocks;
}
