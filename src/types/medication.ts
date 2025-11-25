export type Category = "safe" | "avoid" | "caution";

export interface Medication {
  name: string;
  activeIngredient: string;
  commonBrands?: string[];
  notes?: string;
}

export interface MedicationData {
  safe: Medication[];
  avoid: Medication[];
  combos?: Combo[];
}

export interface Combo {
  name: string;
  actives: string[]; // list of active ingredient keys (same as medication.activeIngredient values)
  notes?: string;
}

export interface MedicationResult {
  type: "medication";
  medication: Medication;
  category: Category;
  fuzzy?: boolean; // true when matched via fuzzy logic
}

export interface ComboResult {
  type: "combo";
  combo: Combo;
  category: Category;
  reasons?: string[]; // acts that caused categorization (if any)
  fuzzy?: boolean; // true when matched via fuzzy logic
}

export type SearchResult = MedicationResult | ComboResult;
