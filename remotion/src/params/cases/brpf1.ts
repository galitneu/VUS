import type { VUSVideoParams } from "../types";

export const CASE_BRPF1: VUSVideoParams = {
  variant: {
    geneName: "BRPF1",
    notation: "c.2920+3G>A",
    variantClass: "snv",
    variantType: "splice",
    deNovoStatus: "confirmed",
    populationStatus: "absent",
    predictionStrength: "inconclusive",
    predictionAvailable: true,
    inClinvar: false,
  },
  gene: {
    functionDescription:
      "מקודד חלבון שמווסת את פעילות גנים אחרים בתא",
    functionAnalogy: "מנהל תפעול שמחליט אילו הוראות בגנום מופעלות",
    proteinName: "BRPF1",
    tissueRole: "ויסות שעתוק גנים",
  },
  clinical: { setting: "active_pregnancy" },
};
