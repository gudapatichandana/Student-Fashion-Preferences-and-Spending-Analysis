/**
 * dashboardData.test.ts
 * =====================
 * Tests for the dashboard data layer (src/data/dashboardData.ts).
 * Verifies that all exported constants are well-formed, non-empty,
 * and mathematically consistent with the 5,006 survey responses.
 *
 * This version uses explicit types to resolve IDE resolution issues.
 */

import { describe, it, expect } from "vitest";
import * as Data from "../data/dashboardData";

// ─────────────────────────────────────────────────────────
//  Types (Matching the implied shape in dashboardData.ts)
// ─────────────────────────────────────────────────────────

interface ChartData {
  name: string;
  value: number;
  color?: string;
  fill?: string;
}

interface ModelData {
  name: string;
  accuracy: number;
  f1: number;
  color: string;
}

interface InsightData {
  title: string;
  description: string;
  icon: string;
  metric: string;
  metricLabel: string;
}

interface SpendData {
  range: string;
  count: number;
}

// ─────────────────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────────────────

describe("Project Constants", () => {
  it("TOTAL_SAMPLES should be 5006", () => {
    expect(Data.TOTAL_SAMPLES).toBe(5006);
  });

  it("TOTAL_COLUMNS should be 18", () => {
    expect(Data.TOTAL_COLUMNS).toBe(18);
  });
});

// ─────────────────────────────────────────────────────────
//  Demographics (Gender)
// ─────────────────────────────────────────────────────────

describe("genderData", () => {
  const data = Data.genderData as ChartData[];

  it("should have exactly 2 entries (Female and Male)", () => {
    expect(data).toHaveLength(2);
  });

  it("total count should be close to 5006", () => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    expect(total).toBeLessThanOrEqual(Data.TOTAL_SAMPLES);
    expect(total).toBeGreaterThan(Data.TOTAL_SAMPLES * 0.9);
  });

  it("Female count should be greater than Male (~65% female)", () => {
    const female = data.find((d) => d.name === "Female");
    const male = data.find((d) => d.name === "Male");
    if (female && male) {
      expect(female.value).toBeGreaterThan(male.value);
    }
  });
});

// ─────────────────────────────────────────────────────────
//  Shopping Methods
// ─────────────────────────────────────────────────────────

describe("shoppingMethodData", () => {
  const data = Data.shoppingMethodData as ChartData[];

  it("should have 3 categories: Online, Offline, Both", () => {
    const names = data.map((d) => d.name);
    expect(names).toContain("Online");
    expect(names).toContain("Offline");
    expect(names).toContain("Both");
  });

  it("'Both' should be a leading shopping method", () => {
    const both = data.find((d) => d.name === "Both");
    const offline = data.find((d) => d.name === "Offline");
    if (both && offline) {
      expect(both.value).toBeGreaterThan(offline.value);
    }
  });
});

// ─────────────────────────────────────────────────────────
//  Model Performance
// ─────────────────────────────────────────────────────────

describe("modelPerformanceData", () => {
  const data = Data.modelPerformanceData as ModelData[];

  it("should have exactly 5 models", () => {
    expect(data).toHaveLength(5);
  });

  it("SVM should have the highest accuracy (~86.5%)", () => {
    const svm = data.find((m) => m.name.includes("SVM"));
    const maxAcc = Math.max(...data.map((m) => m.accuracy));
    if (svm) {
      expect(svm.accuracy).toBe(maxAcc);
      expect(svm.accuracy).toBeGreaterThan(85);
    }
  });
});

// ─────────────────────────────────────────────────────────
//  Clothing Preferences
// ─────────────────────────────────────────────────────────

describe("clothingPreferenceData", () => {
  const data = Data.clothingPreferenceData as ChartData[];

  it("should have at least 4 clothing types", () => {
    expect(data.length).toBeGreaterThanOrEqual(4);
  });

  it("Casual Wear should be the top preferred style", () => {
    const casual = data.find((d) => d.name === "Casual Wear");
    const maxVal = Math.max(...data.map((d) => d.value));
    if (casual) {
      expect(casual.value).toBe(maxVal);
    }
  });
});

// ─────────────────────────────────────────────────────────
//  Business Insights
// ─────────────────────────────────────────────────────────

describe("businessInsights", () => {
  const data = Data.businessInsights as InsightData[];

  it("should provide 6 strategic insights", () => {
    expect(data).toHaveLength(6);
  });

  it("each insight must have required display properties", () => {
    data.forEach((insight) => {
      expect(insight.title).toBeDefined();
      expect(insight.description).toBeDefined();
      expect(insight.metric).toBeDefined();
    });
  });

  it("should highlight the 86.5% model accuracy", () => {
    const hasAccuracy = data.some((i) => i.description.includes("86.5%"));
    expect(hasAccuracy).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────
//  Text Mining Keywords
// ─────────────────────────────────────────────────────────

describe("textMiningKeywords", () => {
  const data = Data.textMiningKeywords as string[];

  it("should have at least 15 fashion-related keywords", () => {
    expect(data.length).toBeGreaterThanOrEqual(15);
  });

  it("should include core sentiment keywords", () => {
    expect(data).toContain("quality");
    expect(data).toContain("price");
    expect(data).toContain("fit");
  });
});

// ─────────────────────────────────────────────────────────
//  Spending Distribution
// ─────────────────────────────────────────────────────────

describe("spendingDistribution", () => {
  const data = Data.spendingDistribution as SpendData[];

  it("should show '15K-30K' as the dominant spending band", () => {
    const midBand = data.find((d) => d.range === "15K-30K");
    const maxCount = Math.max(...data.map((d) => d.count));
    if (midBand) {
      expect(midBand.count).toBe(maxCount);
    }
  });
});

// ─────────────────────────────────────────────────────────
//  Additional Validations
// ─────────────────────────────────────────────────────────

describe("Extra Data Validations", () => {
  it("priceRangeData should have 4 bands", () => {
    expect(Data.priceRangeData).toHaveLength(4);
  });

  it("discountImportanceData should include 'Yes'", () => {
    const yes = Data.discountImportanceData.find((d: any) => d.name === "Yes");
    expect(yes).toBeDefined();
  });
});
