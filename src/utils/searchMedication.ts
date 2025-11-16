import medicationData from "@/data/medications.json";
import type { SearchResult, MedicationData, Category } from "@/types/medication";

export function searchMedication(query: string): SearchResult | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return null;
  }

  const data = medicationData as MedicationData;

  // Search through all categories
  for (const category of ["safe", "avoid"] as Category[]) {
    const medications = data[category];
    
    for (const medication of medications) {
      // Check if query matches medication name
      if (medication.name.toLowerCase().includes(normalizedQuery)) {
        return { medication, category };
      }
      
      // Check if query matches active ingredient
      if (medication.activeIngredient.toLowerCase().includes(normalizedQuery)) {
        return { medication, category };
      }
      
      // Check if query matches any common brand
      if (medication.commonBrands) {
        for (const brand of medication.commonBrands) {
          if (brand.toLowerCase().includes(normalizedQuery)) {
            return { medication, category };
          }
        }
      }
    }
  }

  return null;
}
