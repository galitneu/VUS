import { buildScene5Blocks } from "../src/params/buildScene5Blocks";
import { CASE_COL4A2 } from "../src/params/cases/mvp_col4a2";
import { CASE_BRPF1 } from "../src/params/cases/brpf1";
import { CASE_VCL } from "../src/params/cases/vcl";
import { CASE_FZD2 } from "../src/params/cases/fzd2";

const cases = [
  ["COL4A2", CASE_COL4A2, "5-A · 5-B1 · 5-C1 · 5-D1 · 5-E1 · 5-F1"],
  ["BRPF1", CASE_BRPF1, "5-A · 5-B2 · 5-C1 · 5-D1 · 5-E2"],
  ["VCL", CASE_VCL, "5-A · 5-B3 · 5-C3 · 5-D3 · 5-G1 · 5-G2"],
  ["FZD2", CASE_FZD2, "5-A · 5-B1 · 5-C2 · 5-D2"],
] as const;

let allOk = true;
for (const [name, p, expected] of cases) {
  const got = buildScene5Blocks(p).join(" · ");
  const ok = got === expected;
  if (!ok) allOk = false;
  console.log(`${ok ? "OK  " : "FAIL"}  ${name.padEnd(8)} ${got}`);
  if (!ok) console.log(`             exp: ${expected}`);
}
process.exit(allOk ? 0 : 1);
