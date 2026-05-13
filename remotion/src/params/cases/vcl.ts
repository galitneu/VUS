import type { VUSVideoParams } from "../types";

export const CASE_VCL: VUSVideoParams = {
  variant: {
    geneName: "VCL",
    variantClass: "cnv-deletion",
    deNovoStatus: "unknown",
    populationStatus: "present",
    predictionAvailable: false,
    inClinvar: true,
  },
  gene: {
    functionDescription: "מקודד חלבון מבני בתאי שריר הלב",
    functionAnalogy: "סיכות שמחזיקות יחד את מבנה תא שריר הלב",
    proteinName: "Vinculin",
    tissueRole: "שריר הלב",
  },
  cnv: {
    sizeBp: 493000,
    genesIncluded: ["VCL"],
    keyGeneKnownPathogenic: true,
    lofInHealthyPopulation: true,
  },
  clinical: { setting: "active_pregnancy" },
};
