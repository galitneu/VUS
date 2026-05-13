import type { GeneType } from "./types";

const ANALOGY_BY_TYPE: Record<GeneType, string> = {
  structural: "חלבון שמעניק חוזק ויציבות לרקמה",
  "transcription-regulator": "חלבון שמווסת אילו גנים אחרים פועלים בתא",
  enzyme: "חלבון שמבצע תגובות כימיות בתא",
  receptor: "קולטן שמקבל אותות ומנחה תהליכי התפתחות",
  "ubiquitin-ligase": "חלבון שאחראי על פירוק חלבונים שסיימו את תפקידם",
  transport: "חלבון שמעביר חומרים בין תאים או בתוכם",
  other: "חלבון בעל תפקיד חיוני בתא",
};

export const analogyFor = (type: GeneType): string => ANALOGY_BY_TYPE[type];
