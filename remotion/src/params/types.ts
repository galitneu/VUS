export type VariantClass = "snv" | "cnv-deletion" | "cnv-duplication";
export type VariantType = "missense" | "nonsense" | "splice" | "indel";
export type DeNovoStatus =
  | "confirmed"
  | "inherited-healthy-parent"
  | "unknown";
export type PopulationStatus = "absent" | "rare" | "present";
export type PredictionStrength =
  | "suggests-effect"
  | "inconclusive"
  | "suggests-benign";
export type ClinicalSetting =
  | "carrier"
  | "family_planning"
  | "active_pregnancy";

export type GeneType =
  | "structural"
  | "transcription-regulator"
  | "enzyme"
  | "receptor"
  | "ubiquitin-ligase"
  | "transport"
  | "other";

export type BlockId =
  | "5-A"
  | "5-B1"
  | "5-B2"
  | "5-B3"
  | "5-B4"
  | "5-C1"
  | "5-C2"
  | "5-C3"
  | "5-D1"
  | "5-D2"
  | "5-D3"
  | "5-D4"
  | "5-E1"
  | "5-E2"
  | "5-E3"
  | "5-F1"
  | "5-F2"
  | "5-G1"
  | "5-G2"
  | "5-H1";

export interface VUSVideoParams {
  variant: {
    geneName: string;
    notation?: string;
    variantClass: VariantClass;
    variantType?: VariantType;
    deNovoStatus: DeNovoStatus;
    populationStatus: PopulationStatus;
    predictionStrength?: PredictionStrength;
    predictionAvailable: boolean;
    clinvarAccession?: string;
    inClinvar: boolean;
    acmgCriteria?: string[];
  };
  gene: {
    functionDescription: string;
    geneType: GeneType;
    proteinName: string;
    tissueRole: string;
    literatureContext?: string;
    inheritanceMode?: "dominant" | "recessive" | "x-linked" | "variable";
    onsetTiming?: "fetal" | "pediatric" | "adult" | "variable";
    toleranceLevel?: "low" | "high";
  };
  cnv?: {
    sizeBp: number;
    genesIncluded: string[];
    keyGeneKnownPathogenic: boolean;
    lofInHealthyPopulation: boolean;
  };
  clinical: {
    setting: ClinicalSetting;
    phenotypeDescription?: string;
  };
}
