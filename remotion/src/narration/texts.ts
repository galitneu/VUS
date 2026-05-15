import type { VUSVideoParams } from "../params/types";
import { buildScene5Blocks } from "../params/buildScene5Blocks";
import { parseBases } from "../params/notation";

export type NarrationSet = {
  opening: string;
  variantIntroChrom: string;
  variantIntroHelix: string;
  variantIntroBase: string;
  categories: string;
  notVUS: string;
  specificVariant: string;
  whyUncertain: string;
  timeline: string;
  closing: string;
};

export function buildNarration(params: VUSVideoParams): NarrationSet {
  const { geneName } = params.variant;
  const [origBase, varBase] = parseBases(params.variant.notation);
  const blocks = buildScene5Blocks(params);

  return {
    opening:
      "קיבלתם תוצאה של בדיקה גנטית עם סיווג: משמעות לא ודאית. " +
      "תוצאה זו אינה תשובה ברורה לכאן או לכאן — היא מציגה תמונה מורכבת. " +
      "סרטון זה יסביר מה משמעות הסיווג, ומה ידוע על הוריאנט הספציפי שנמצא בבדיקה.",

    variantIntroChrom:
      "כרומוזום הוא מבנה שנמצא בכל תא בגוף ומכיל חלק מהמידע הגנטי. " +
      `הגן ${geneName} — זה שנמצא בבדיקה — יושב בנקודה ספציפית על אחד מהכרומוזומים.`,

    variantIntroHelix:
      "הגן עצמו בנוי מסליל של אותיות גנטיות — A, T, G ו-C. " +
      "הסדר המדויק של האותיות הוא ההוראה: ממנו הגוף קורא כיצד לבנות חלבון.",

    variantIntroBase:
      `הבדיקה זיהתה שינוי בנקודה ספציפית ברצף הגן: האות ${origBase} הוחלפה ב-${varBase}. ` +
      "זו האות שנמצאת במוקד.",

    categories:
      "כל וריאנט גנטי מקבל סיווג לפי כללים מקצועיים בינלאומיים. " +
      "ישנן שלוש קטגוריות עיקריות: " +
      "פתוגני — וריאנט שגורם למחלה; " +
      "שפיר — וריאנט שאינו גורם למחלה; " +
      "ובמרכז — VUS, משמעות לא ודאית, כאשר המידע אינו מספיק לקביעה חד-משמעית. " +
      "הוריאנט שנמצא בבדיקה שלכם מסווג כ-VUS.",

    notVUS:
      "חשוב להבין מה VUS אינו. " +
      "הוא אינו אבחנה של מחלה ואינו תוצאה שלילית ודאית. " +
      "הוא גם אינו שפיר בוודאות. " +
      "VUS פירושו שהמדע עדיין אוסף ראיות — ועדיין אין תשובה ברורה לגבי ההשפעה הקלינית.",

    specificVariant: buildSpecificVariantNarration(params, blocks),

    whyUncertain:
      "מדוע הסיווג לא ודאי? לסיווג ודאי נדרשות ראיות שעדיין חסרות. " +
      "ראשית, תפקוד החלבון לא נבדק ישירות במעבדה. " +
      "שנית, לא תועדו מקרים דומים עם אותו ממצא בספרות המדעית. " +
      "עד שהראיות הנדרשות ייאספו — הסיווג יישאר VUS.",

    timeline: buildTimelineNarration(params),

    closing:
      "VUS אינו תשובה סופית. " +
      "הוא נקודת ביניים בידע המדעי, שצפויה להתחדד עם הזמן. " +
      "מומלץ לדון בצעדים הבאים עם היועצת הגנטית.",
  };
}

function buildTimelineNarration(params: VUSVideoParams): string {
  const base =
    "סיווג הוריאנט אינו קבוע לנצח. " +
    "התהליך מתפתח: מסיווג ראשוני כ-VUS, " +
    "דרך צבירת מידע ממחקרים ומקרים נוספים ברחבי העולם, " +
    "ועד לאפשרות של עדכון סיווג בעתיד.";
  if (params.variant.inClinvar) {
    return (
      base +
      " הוריאנט שלכם רשום במאגר ClinVar הציבורי, שמתעדכן ככל שמתווסף מידע חדש."
    );
  }
  return (
    base +
    " ככל שנצבר מידע נוסף ממחקרים ומקרים קליניים דומים, ייתכן שהסיווג יתעדכן."
  );
}

function buildSpecificVariantNarration(
  params: VUSVideoParams,
  blocks: ReturnType<typeof buildScene5Blocks>
): string {
  const { geneName } = params.variant;
  const parts: string[] = [];

  for (const block of blocks) {
    switch (block) {
      case "5-A":
        parts.push(
          `הגן ${geneName} מכיל הוראות לייצור ${params.gene.proteinName}. ` +
            `${params.gene.tissueRole}.`
        );
        break;
      case "5-B1":
        parts.push(
          "הוריאנט הוא מסוג missense — שינוי של אות גנטית בודדת, הגורם לשינוי בחומצת אמינו בחלבון."
        );
        break;
      case "5-B2":
        parts.push(
          "הוריאנט הוא מסוג splice — שינוי שעלול לפגוע בעיבוד ה-RNA ולגרום לחלבון לקוי."
        );
        break;
      case "5-B3":
        parts.push(
          "הוריאנט הוא מחיקת CNV — חסר של קטע כרומוזומלי הכולל מספר גנים."
        );
        break;
      case "5-B4":
        parts.push(
          "הוריאנט הוא שכפול CNV — כפל של קטע כרומוזומלי הכולל מספר גנים."
        );
        break;
      case "5-C1":
        parts.push(
          "הוריאנט נמצא דה-נובו — לא עבר בירושה מהורים אלא נוצר לראשונה. " +
            "ממצא זה מגביר את הרלוונטיות הקלינית."
        );
        break;
      case "5-C2":
        parts.push(
          "הוריאנט עבר בירושה מהורה בריא. " +
            "עובדה זו מפחיתה מעט את חשיבותו, אך אינה שוללת השפעה."
        );
        break;
      case "5-C3":
        parts.push(
          "מקור הוריאנט לא נקבע — לא ידוע אם עבר בירושה מהורה או נוצר מחדש."
        );
        break;
      case "5-D1":
        parts.push(
          "הוריאנט לא תועד במאגרי מידע גנטיים של אנשים בריאים. " +
            "היעדרות זו תומכת בכך שאינו שגרתי."
        );
        break;
      case "5-D2":
        parts.push(
          "הוריאנט תועד במקרים בודדים במאגרי מידע — לא ידוע בוודאות אם הופיע אצל אנשים בריאים."
        );
        break;
      case "5-D3":
        parts.push(
          "וריאנטים מסוג זה תועדו גם אצל אנשים בריאים — עובדה הרלוונטית לשיקול הכולל."
        );
        break;
      case "5-D4":
        parts.push(
          "הוריאנט לא תועד במאגרים, אך גן זה סובלני לוריאנטים מסוג loss-of-function — " +
            "כלומר, LoF וריאנטים נמצאים גם באנשים בריאים."
        );
        break;
      case "5-E1":
        parts.push(
          "כלי חיזוי ממוחשבים מצביעים על כך שהשינוי עשוי להשפיע על תפקוד החלבון. " +
            "יש לזכור שמדובר בחיזוי, לא בהוכחה."
        );
        break;
      case "5-E2":
        parts.push(
          "כלי חיזוי ממוחשבים אינם מצביעים באופן חד-משמעי על השפעה או חוסר השפעה."
        );
        break;
      case "5-E3":
        parts.push(
          "כלי חיזוי ממוחשבים מצביעים על כך שהשינוי כנראה אינו פוגע בתפקוד החלבון."
        );
        break;
      case "5-F1":
      case "5-F2":
        if (params.gene.literatureContext) {
          const adultSuffix =
            block === "5-F2" ? " זוהי מחלה המתבטאת בדרך כלל בבגרות." : "";
          parts.push(
            `בספרות המדעית תוארו וריאנטים בגן ${geneName} בהקשר של ${params.gene.literatureContext}.${adultSuffix}`
          );
        }
        break;
      case "5-G1":
        parts.push(
          "וריאנטים דומים של אובדן פעולה תועדו גם באנשים בריאים — עובדה המפחיתה את חשיבות הממצא."
        );
        break;
      case "5-G2":
        parts.push(
          "גן מפתח הכלול במחיקה ידוע כגורם למחלה בוריאנטים פתוגניים — ממצא זה מגביר את הרלוונטיות."
        );
        break;
      case "5-H1":
        parts.push(
          "אופן התורשה של הגן הוא רצסיבי. " +
            "הוריאנט נמצא בעותק אחד בלבד מתוך שניים — " +
            "במחלה רצסיבית נדרשים שינויים בשני העותקים."
        );
        break;
    }
  }

  return parts.join(" ");
}
