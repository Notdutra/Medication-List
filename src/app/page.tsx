"use client";

import { useState } from "react";
import { Search, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { searchMedication } from "@/utils/searchMedication";
import type { SearchResult } from "@/types/medication";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const searchResult = searchMedication(query);
      setResult(searchResult);
    } else {
      setResult(null);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "safe":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "avoid":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "safe":
        return "✓";
      case "avoid":
        return "✕";
      default:
        return "?";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "safe":
        return "Safe to Take";
      case "avoid":
        return "Cannot Take";
      default:
        return "Not Found";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Medication Safety Checker
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Search for a medication to check if it&apos;s safe to take
          </p>
          <Link href="/list">
            <Button variant="outline" className="gap-2">
              <List className="h-4 w-4" />
              View Complete Medication List
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8 md:mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter medication name (e.g., Tylenol, Ibuprofen, Aspirin)..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-6 text-base md:text-lg w-full rounded-lg shadow-sm"
            />
          </div>
        </div>

        {/* Result Card */}
        {result && (
          <Card className="mb-8 shadow-lg border-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  {result.type === "medication" ? (
                    <>
                      <CardTitle className="text-xl md:text-2xl mb-2">
                        {result.medication.name}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        Active Ingredient: {result.medication.activeIngredient}
                      </CardDescription>
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-xl md:text-2xl mb-2">
                        {result.combo.name}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        Active Ingredients: {result.combo.actives.join(", ")}
                      </CardDescription>
                    </>
                  )}
                </div>
                <Badge
                  className={`${getCategoryColor(
                    result.category
                  )} text-white text-base md:text-lg px-4 py-2 self-start sm:self-center`}
                >
                  {getCategoryIcon(result.category)}{" "}
                  {getCategoryText(result.category)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {result.fuzzy && (
                <div className="mb-3 text-sm text-gray-500 italic">
                  Did you mean this medication?
                </div>
              )}
              {result.type === "medication" ? (
                <>
                  {result.medication.commonBrands &&
                    result.medication.commonBrands.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Common Brands:
                        </p>
                        <p className="text-sm text-gray-600">
                          {result.medication.commonBrands.join(", ")}
                        </p>
                      </div>
                    )}
                  {result.medication.notes && (
                    <div
                      className={`p-3 md:p-4 rounded-md ${
                        result.category === "safe"
                          ? "bg-emerald-50 border border-emerald-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <p className="text-sm md:text-base text-gray-700">
                        {result.medication.notes}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Active Ingredients:
                    </p>
                    <p className="text-sm text-gray-600">
                      {result.combo.actives.join(", ")}
                    </p>
                  </div>
                  {result.reasons && result.reasons.length > 0 && (
                    <div className="mb-3 p-3 md:p-4 rounded-md bg-red-50 border border-red-200">
                      <p className="text-sm font-semibold text-red-600 mb-1">
                        Warning – Contains Avoid Ingredient(s):
                      </p>
                      <p className="text-sm text-red-700">
                        {result.reasons.join(", ")}
                      </p>
                    </div>
                  )}
                  {result.combo.notes && (
                    <div className="p-3 md:p-4 rounded-md bg-gray-50 border border-gray-200">
                      <p className="text-sm md:text-base text-gray-700">
                        {result.combo.notes}
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}

        {searchQuery && !result && (
          <Card className="mb-8 shadow-lg border-2 border-gray-300">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-lg md:text-xl text-gray-600 mb-2">
                  No results found
                </p>
                <p className="text-sm md:text-base text-gray-500">
                  The medication &quot;{searchQuery}&quot; is not in our
                  database.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legend */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Category Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Safe to Take</p>
                  <p className="text-sm text-gray-600">
                    These medications are safe for you
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  ✕
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Cannot Take</p>
                  <p className="text-sm text-gray-600">
                    Avoid these medications
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Always consult with your healthcare provider before taking any
            medication.
          </p>
        </div>
      </div>
    </main>
  );
}
