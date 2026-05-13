import type { VUSVideoParams } from "./types";

export const MVP_PARAMS: VUSVideoParams = {
  variant: {
    geneName: "COL4A2",
    notation: "c.2552G>T (p.Gly851Val)",
    variantType: "missense",
    isDeNovo: true,
    inPopulation: false,
    predictionStrength: "deleterious",
    clinvarAccession: "VCV2858375",
    acmgCriteria: ["PP3", "PM2"],
  },
  gene: {
    functionDescription:
      "מקודד תת-יחידה של קולגן IV, חלבון מבני בקרומי הבסיס",
    functionAnalogy: "פיגומים שמחזיקים יחד רקמות שונות בגוף",
    literatureContext: "מחלות כלי דם קטנים במוח",
  },
  clinical: {
    setting: "active_pregnancy",
    phenotypeDescription: "פגמי לב מולדים",
  },
};
