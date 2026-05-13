import type { VUSVideoParams } from "../types";

export const CASE_FZD2: VUSVideoParams = {
  variant: {
    geneName: "FZD2",
    notation: "c.1213G>A",
    variantClass: "snv",
    variantType: "missense",
    deNovoStatus: "inherited-healthy-parent",
    populationStatus: "rare",
    predictionAvailable: false,
    inClinvar: false,
  },
  gene: {
    functionDescription:
      "מקודד קולטן במסלול התפתחותי המעורב בבניית שלד ופנים",
    geneType: "receptor",
    proteinName: "FZD2",
    tissueRole: "התפתחות שלד ופנים",
  },
  clinical: { setting: "active_pregnancy" },
};
