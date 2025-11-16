"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import medicationData from "@/data/medications.json";
import type { Medication, MedicationData } from "@/types/medication";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MedicationList() {
  const data = medicationData as MedicationData;

  // Sort medications alphabetically by active ingredient
  const sortedSafe = [...data.safe].sort((a, b) =>
    a.activeIngredient.localeCompare(b.activeIngredient)
  );

  const sortedAvoid = [...data.avoid].sort((a, b) =>
    a.activeIngredient.localeCompare(b.activeIngredient)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 print:bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header - Hidden when printing */}
        <div className="mb-8 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </Button>
            </Link>
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print List
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Complete Medication Reference List
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Organized by category and alphabetized by active ingredient
          </p>
        </div>

        {/* Print Header - Only visible when printing */}
        <div className="hidden print:block mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Medication Reference List
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Safe and Unsafe Medications - Alphabetically Organized
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Generated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 print:mb-6">
          <Card className="border-2 border-emerald-200 bg-emerald-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">✓</span>
                Safe to Take
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-600">
                {sortedSafe.length}
              </p>
              <p className="text-sm text-gray-600">medications</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">✕</span>
                Cannot Take
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {sortedAvoid.length}
              </p>
              <p className="text-sm text-gray-600">medications</p>
            </CardContent>
          </Card>
        </div>

        {/* Safe Medications */}
        <section className="mb-8 print:mb-6">
          <div className="mb-4 pb-2 border-b-2 border-emerald-500">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              Safe to Take
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 print:gap-1">
            {sortedSafe.map((med: Medication, index: number) => {
              const namesAreSame =
                med.name.toLowerCase() === med.activeIngredient.toLowerCase();

              return (
                <Card
                  key={index}
                  className="border-l-4 border-l-emerald-500 print:shadow-none print:border"
                >
                  <CardContent className="py-3 print:py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">
                          {namesAreSame
                            ? "MEDICATION / ACTIVE INGREDIENT"
                            : "ACTIVE INGREDIENT"}
                        </p>
                        <p className="font-bold text-gray-900 capitalize text-base print:text-sm">
                          {med.activeIngredient}
                          {!namesAreSame &&
                            med.name !== med.activeIngredient && (
                              <span className="font-normal text-gray-600">
                                {" "}
                                ({med.name})
                              </span>
                            )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">
                          COMMON BRANDS
                        </p>
                        <p className="text-gray-700 text-sm print:text-xs">
                          {med.commonBrands?.join(", ") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Page break before avoid section when printing */}
        <div className="print:break-before-page"></div>

        {/* Cannot Take Medications */}
        <section className="mb-8">
          <div className="mb-4 pb-2 border-b-2 border-red-500">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-red-500">✕</span>
              Cannot Take
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 print:gap-1">
            {sortedAvoid.map((med: Medication, index: number) => {
              const namesAreSame =
                med.name.toLowerCase() === med.activeIngredient.toLowerCase();

              return (
                <Card
                  key={index}
                  className="border-l-4 border-l-red-500 print:shadow-none print:border"
                >
                  <CardContent className="py-3 print:py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">
                          {namesAreSame
                            ? "MEDICATION / ACTIVE INGREDIENT"
                            : "ACTIVE INGREDIENT"}
                        </p>
                        <p className="font-bold text-gray-900 capitalize text-base print:text-sm">
                          {med.activeIngredient}
                          {!namesAreSame &&
                            med.name !== med.activeIngredient && (
                              <span className="font-normal text-gray-600">
                                {" "}
                                ({med.name})
                              </span>
                            )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">
                          COMMON BRANDS
                        </p>
                        <p className="text-gray-700 text-sm print:text-xs">
                          {med.commonBrands?.join(", ") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500 print:mt-4 print:pt-3">
          <p className="font-semibold mb-1">⚠️ Important Medical Disclaimer</p>
          <p>
            Always consult with your healthcare provider or pharmacist before
            taking any medication. This list is for reference purposes only.
          </p>
        </div>
      </div>
    </main>
  );
}
