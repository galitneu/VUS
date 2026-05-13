import { buildScene5Blocks } from "../src/params/buildScene5Blocks";
import { CASE_COL4A2 } from "../src/params/cases/mvp_col4a2";
import { CASE_BRPF1 } from "../src/params/cases/brpf1";
import { CASE_VCL } from "../src/params/cases/vcl";
import { CASE_FZD2 } from "../src/params/cases/fzd2";
import type { VUSVideoParams } from "../src/params/types";

// Synthetic case exercising 5-D4, 5-F2, 5-H1
const CASE_V3_NEW: VUSVideoParams = {
  variant: {
    geneName: "TEST",
    variantClass: "snv",
    variantType: "nonsense",
    deNovoStatus: "confirmed",
    populationStatus: "absent",
    predictionAvailable: false,
    inClinvar: false,
  },
  gene: {
    functionDescription: "test",
    geneType: "enzyme",
    proteinName: "test protein",
    tissueRole: "test",
    literatureContext: "מחלה מסוימת",
    inheritanceMode: "recessive",
    onsetTiming: "adult",
    toleranceLevel: "high",
  },
  clinical: { setting: "carrier" },
};

const cases: [string, VUSVideoParams, string][] = [
  ["COL4A2", CASE_COL4A2, "5-A · 5-B1 · 5-C1 · 5-D1 · 5-E1 · 5-F1"],
  ["BRPF1", CASE_BRPF1, "5-A · 5-B2 · 5-C1 · 5-D1 · 5-E2"],
  ["VCL", CASE_VCL, "5-A · 5-B3 · 5-C3 · 5-D3 · 5-G1 · 5-G2"],
  ["FZD2", CASE_FZD2, "5-A · 5-B1 · 5-C2 · 5-D2"],
  ["V3_NEW", CASE_V3_NEW, "5-A · 5-B1 · 5-C1 · 5-D4 · 5-F2 · 5-H1"],
];

let allOk = true;
for (const [name, p, expected] of cases as [string, VUSVideoParams, string][]) {
  const got = buildScene5Blocks(p).join(" · ");
  const ok = got === expected;
  if (!ok) allOk = false;
  console.log(`${ok ? "OK  " : "FAIL"}  ${name.padEnd(8)} ${got}`);
  if (!ok) console.log(`             exp: ${expected}`);
}
process.exit(allOk ? 0 : 1);
