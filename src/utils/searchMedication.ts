import medicationData from "@/data/medications.json";
import type {
  SearchResult,
  MedicationData,
  Category,
  Combo,
  Medication,
} from "@/types/medication";

// Simple Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

// Rough match helper: returns true if distance is small relative to length
function roughlyMatches(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return true;
  const distance = levenshtein(q, t);
  const maxLen = Math.max(q.length, t.length);
  const ratio = distance / maxLen;
  return ratio <= 0.4; // allow a few character errors (e.g. "tylnol" vs "tylenol")
}

export function searchMedication(query: string): SearchResult | null {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return null;
  }

  const data = medicationData as MedicationData;

  // Prepare quick lookup maps
  const avoidActives = new Set<string>(
    data.avoid.map((m) => m.activeIngredient.toLowerCase())
  );

  // First pass: exact/contains matching as before
  const categories: ("safe" | "avoid")[] = ["safe", "avoid"];
  for (const category of categories) {
    const medications = (data[category as keyof typeof data] ||
      []) as (typeof data)["safe"];

    for (const medication of medications) {
      if (medication.name.toLowerCase().includes(normalizedQuery)) {
        return { type: "medication", medication, category, fuzzy: false };
      }

      if (medication.activeIngredient.toLowerCase().includes(normalizedQuery)) {
        return { type: "medication", medication, category, fuzzy: false };
      }

      if (medication.commonBrands) {
        for (const brand of medication.commonBrands) {
          if (brand.toLowerCase().includes(normalizedQuery)) {
            return { type: "medication", medication, category, fuzzy: false };
          }
        }
      }
    }
  }

  const combos = data.combos || [];
  for (const combo of combos as Combo[]) {
    if (combo.name.toLowerCase().includes(normalizedQuery)) {
      const reasons: string[] = [];
      for (const act of combo.actives) {
        const lower = act.toLowerCase();
        if (avoidActives.has(lower)) reasons.push(lower);
      }
      const category: Category = reasons.length > 0 ? "avoid" : "safe";
      return { type: "combo", combo, category, reasons, fuzzy: false };
    }

    for (const act of combo.actives) {
      if (act.toLowerCase().includes(normalizedQuery)) {
        const reasons: string[] = [];
        for (const a of combo.actives) {
          const lower = a.toLowerCase();
          if (avoidActives.has(lower)) reasons.push(lower);
        }
        const category: Category = reasons.length > 0 ? "avoid" : "safe";
        return { type: "combo", combo, category, reasons, fuzzy: false };
      }
    }
  }

  // Second pass: fuzzy matching on medication names/brands if nothing exact was found
  let bestMed: {
    medication: Medication;
    category: Category;
    score: number;
  } | null = null;

  for (const category of categories) {
    const medications = (data[category as keyof typeof data] ||
      []) as (typeof data)["safe"];

    for (const medication of medications) {
      const candidates: string[] = [
        medication.name,
        medication.activeIngredient,
        ...(medication.commonBrands || []),
      ];

      for (const c of candidates) {
        if (!c) continue;
        if (roughlyMatches(normalizedQuery, c)) {
          const score = levenshtein(normalizedQuery, c.toLowerCase());
          if (!bestMed || score < bestMed.score) {
            bestMed = { medication, category, score };
          }
        }
      }
    }
  }

  if (bestMed) {
    return {
      type: "medication",
      medication: bestMed.medication,
      category: bestMed.category,
      fuzzy: true,
    };
  }

  // Fuzzy matching for combos by name only (brand text)
  let bestCombo: {
    combo: Combo;
    reasons: string[];
    category: Category;
    score: number;
  } | null = null;
  for (const combo of combos as Combo[]) {
    if (roughlyMatches(normalizedQuery, combo.name)) {
      const reasons: string[] = [];
      for (const act of combo.actives) {
        const lower = act.toLowerCase();
        if (avoidActives.has(lower)) reasons.push(lower);
      }
      const category: Category = reasons.length > 0 ? "avoid" : "safe";
      const score = levenshtein(normalizedQuery, combo.name.toLowerCase());
      if (!bestCombo || score < bestCombo.score) {
        bestCombo = { combo, reasons, category, score };
      }
    }
  }

  if (bestCombo) {
    return {
      type: "combo",
      combo: bestCombo.combo,
      category: bestCombo.category,
      reasons: bestCombo.reasons,
      fuzzy: true,
    };
  }

  return null;
}
