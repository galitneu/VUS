/**
 * Pulls the reference and variant bases out of an HGVS-style notation.
 *   "c.1213G>A" -> ["G", "A"]
 * Falls back to G/T when the notation has no single-base substitution
 * (e.g. CNV cases), so callers always get a usable pair.
 */
export const parseBases = (notation?: string): [string, string] => {
  const m = notation?.match(/([ACGT])>([ACGT])/);
  return m ? [m[1], m[2]] : ["G", "T"];
};
