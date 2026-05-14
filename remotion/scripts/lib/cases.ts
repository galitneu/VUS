import { CASE_COL4A2 } from "../../src/params/cases/mvp_col4a2";
import { CASE_BRPF1 } from "../../src/params/cases/brpf1";
import { CASE_VCL } from "../../src/params/cases/vcl";
import { CASE_FZD2 } from "../../src/params/cases/fzd2";
import type { VUSVideoParams } from "../../src/params/types";

export const CASES: Record<string, VUSVideoParams> = {
  col4a2: CASE_COL4A2,
  brpf1: CASE_BRPF1,
  vcl: CASE_VCL,
  fzd2: CASE_FZD2,
};

export const DEFAULT_CASE = "col4a2";

/** Resolves the --case CLI flag (--case x or --case=x) to a params object. */
export function resolveCase(argv: string[]): {
  caseKey: string;
  params: VUSVideoParams;
} {
  const flagIndex = argv.indexOf("--case");
  const arg =
    argv.find((a) => a.startsWith("--case="))?.split("=")[1] ??
    (flagIndex !== -1 ? argv[flagIndex + 1] : undefined);
  const caseKey = (arg ?? DEFAULT_CASE).toLowerCase();
  const params = CASES[caseKey];
  if (!params) {
    throw new Error(
      `Unknown case "${caseKey}". Available: ${Object.keys(CASES).join(", ")}`,
    );
  }
  return { caseKey, params };
}
