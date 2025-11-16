export type Category = "safe" | "avoid";

export interface Medication {
  name: string;
  activeIngredient: string;
  commonBrands?: string[];
  notes?: string;
}

export interface MedicationData {
  safe: Medication[];
  avoid: Medication[];
}

export interface SearchResult {
  medication: Medication;
  category: Category;
}
