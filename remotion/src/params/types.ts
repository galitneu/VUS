export type VariantType = "missense" | "nonsense" | "splice" | "indel";
export type PredictionStrength = "deleterious" | "benign" | "uncertain";
export type ClinicalSetting =
  | "carrier"
  | "family_planning"
  | "active_pregnancy";

export interface VUSVideoParams {
  variant: {
    geneName: string;
    notation: string;
    variantType: VariantType;
    isDeNovo: boolean;
    inPopulation: boolean;
    predictionStrength: PredictionStrength;
    clinvarAccession: string;
    acmgCriteria: string[];
  };
  gene: {
    functionDescription: string;
    functionAnalogy: string;
    literatureContext: string;
  };
  clinical: {
    setting: ClinicalSetting;
    phenotypeDescription?: string;
  };
}
