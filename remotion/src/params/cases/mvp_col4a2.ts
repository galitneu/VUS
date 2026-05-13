import type { VUSVideoParams } from "../types";

export const CASE_COL4A2: VUSVideoParams = {
  variant: {
    geneName: "COL4A2",
    notation: "c.2552G>T (p.Gly851Val)",
    variantClass: "snv",
    variantType: "missense",
    deNovoStatus: "confirmed",
    populationStatus: "absent",
    predictionStrength: "suggests-effect",
    predictionAvailable: true,
    clinvarAccession: "VCV2858375",
    inClinvar: true,
    acmgCriteria: ["PP3", "PM2"],
  },
  gene: {
    functionDescription:
      "מקודד תת-יחידה של קולגן IV, חלבון מבני בקרומי הבסיס",
    functionAnalogy: "פיגומים שמחזיקים יחד רקמות שונות בגוף",
    proteinName: "קולגן IV",
    tissueRole: "קרומי בסיס",
    literatureContext: "מחלות כלי דם קטנים במוח",
  },
  clinical: {
    setting: "active_pregnancy",
    phenotypeDescription: "פגמי לב מולדים",
  },
};
