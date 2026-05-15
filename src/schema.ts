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

export type GeneType =
  | "structural"
  | "enzyme"
  | "receptor"
  | "transcription-regulator"
  | "ubiquitin-ligase"
  | "transport"
  | "other";

export type InheritanceMode = "dominant" | "recessive" | "x-linked" | "variable";

export type OnsetTiming = "fetal" | "pediatric" | "adult" | "variable";

export type ToleranceLevel = "low" | "high";

export type LiteratureStatus =
  | "supporting"
  | "conflicting"
  | "limited"
  | "absent";

export type SeveritySpectrum = "narrow" | "wide";

export type FindingContext = "explanatory" | "incidental" | "partial";

export type PhenotypeMatch = "full" | "partial" | "none";

export type ClinicalImpact = "relevant" | "none";

export type ClinicalSetting = "carrier" | "family-planning" | "active-pregnancy";

export interface VariantParams {
  variantClass: VariantClass;
  variantNotation: string;
  variantType?: VariantType;
  deNovoStatus: DeNovoStatus;
  populationStatus: PopulationStatus;
  predictionAvailable: boolean;
  predictionStrength?: PredictionStrength;
  clinvarAccession: string;
  acmgCriteria: string[];
}

export interface GeneParams {
  geneName: string;
  geneType: GeneType;
  functionDescription: string;
  proteinName: string;
  tissueRole: string;
  associatedConditionsInLiterature: string;
  inheritanceMode: InheritanceMode;
  onsetTiming: OnsetTiming;
  toleranceLevel: ToleranceLevel;
  literatureStatus: LiteratureStatus;
  severitySpectrum: SeveritySpectrum;
}

export interface ContextParams {
  setting: ClinicalSetting;
  findingContext: FindingContext;
  phenotypeMatch: PhenotypeMatch;
  clinicalImpact: ClinicalImpact;
  phenotypePresent: boolean;
  phenotypeDescription?: string;
}

export interface CnvParams {
  lofInHealthyPopulation: boolean;
  keyGeneKnownPathogenic: boolean;
}

export interface VUSVideoParams {
  variant: VariantParams;
  gene: GeneParams;
  context: ContextParams;
  cnv?: CnvParams;
}
