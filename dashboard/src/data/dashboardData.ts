// All data extracted from the notebook analysis of 5,006 student survey responses

export const TOTAL_SAMPLES = 5006;
export const TOTAL_COLUMNS = 18;

export const genderData = [
  { name: "Female", value: 3277, color: "hsl(280, 60%, 55%)" },
  { name: "Male", value: 1729, color: "hsl(174, 72%, 50%)" },
];

export const studyLevelData = [
  { name: "B.Tech / B.E", value: 1752 },
  { name: "M.Tech / M.E", value: 1001 },
  { name: "MBA", value: 751 },
  { name: "MBBS / Medical", value: 601 },
  { name: "Diploma", value: 501 },
  { name: "Post-Graduate", value: 400 },
];

export const clothingPreferenceData = [
  { name: "Casual Wear", value: 3001, fill: "hsl(174, 72%, 50%)" },
  { name: "Formal Wear", value: 826, fill: "hsl(38, 92%, 60%)" },
  { name: "Ethnic Wear", value: 807, fill: "hsl(280, 60%, 55%)" },
  { name: "Sports Wear", value: 368, fill: "hsl(200, 80%, 55%)" },
  { name: "Street Wear", value: 4, fill: "hsl(340, 70%, 55%)" },
];

export const shoppingMethodData = [
  { name: "Online", value: 1960, fill: "hsl(280, 60%, 55%)" },
  { name: "Offline", value: 1028, fill: "hsl(38, 92%, 60%)" },
  { name: "Both", value: 2018, fill: "hsl(174, 72%, 50%)" },
];

export const priceRangeData = [
  { name: "Below ₹500", value: 1223 },
  { name: "₹500 – ₹1000", value: 1254 },
  { name: "₹1000 – ₹2000", value: 1292 },
  { name: "Above ₹2000", value: 1237 },
];

export const purchaseFrequencyData = [
  { name: "1-2 Months", value: 3504 },
  { name: "On Festival", value: 1001 },
  { name: "2-3 Weeks", value: 501 },
];

export const discountImportanceData = [
  { name: "Yes", value: 3802, fill: "hsl(174, 72%, 50%)" },
  { name: "Sometimes", value: 711, fill: "hsl(38, 92%, 60%)" },
  { name: "No", value: 493, fill: "hsl(340, 70%, 55%)" },
];

export const confidenceData = [
  { name: "Very Confident", value: 2150 },
  { name: "Somewhat Confident", value: 1845 },
  { name: "Neutral", value: 710 },
  { name: "Not Confident", value: 301 },
];

export const regretReasonsData = [
  { name: "Quality Issues", value: 1024 },
  { name: "Different from Images", value: 1022 },
  { name: "Price Not Worth It", value: 1014 },
  { name: "No Regret", value: 1011 },
  { name: "Poor Fit", value: 935 },
];

export const opinionSourceData = [
  { name: "Friends", value: 2106 },
  { name: "Family", value: 1450 },
  { name: "Social Media", value: 950 },
  { name: "Independent", value: 500 },
];

export const brandTrustData = [
  { name: "Reviews", value: 3282 },
  { name: "Quality Assurance", value: 1724 },
];

export const brandLoyaltyData = [
  { name: "Better Prices", value: 3282 },
  { name: "Better Quality", value: 1724 },
];

export const modelPerformanceData = [
  { name: "SVM (Linear)", accuracy: 86.51, f1: 85.5, color: "hsl(280, 60%, 55%)" },
  { name: "Naive Bayes", accuracy: 86.41, f1: 85.2, color: "hsl(38, 92%, 60%)" },
  { name: "Logistic Regression", accuracy: 86.01, f1: 84.8, color: "hsl(200, 80%, 55%)" },
  { name: "Gradient Boosting", accuracy: 86.01, f1: 84.5, color: "hsl(174, 72%, 50%)" },
  { name: "Random Forest", accuracy: 85.01, f1: 83.2, color: "hsl(340, 70%, 55%)" },
];

export const spendingDistribution = [
  { range: "5K-15K", count: 734 },
  { range: "15K-30K", count: 3969 },
  { range: "30K+", count: 303 },
];

export const collegeWearData = [
  { name: "Casual Wear", value: 2540 },
  { name: "Mixed", value: 952 },
  { name: "Jeans & T-shirts", value: 915 },
  { name: "Formals", value: 599 },
];

export const uniformPolicyData = [
  { name: "No", value: 2837 },
  { name: "Yes", value: 2169 },
];

export const shoppingReasonData = [
  { name: "Better Prices", value: 3044 },
  { name: "Try Before Buying", value: 3043 },
  { name: "More Variety", value: 1963 },
  { name: "Convenience", value: 1961 },
];

export const businessInsights = [
  {
    title: "Female-Led Fashion Growth",
    description: "65% of respondent base is Female, showing significantly higher engagement and transaction frequency. Marketing efforts must prioritize Female-centric design and influencer-led social campaigns.",
    icon: "shopping-cart",
    metric: "65%",
    metricLabel: "Female dominance",
  },
  {
    title: "Mid-Tier Spending Dominance",
    description: "The majority of students (3969) have an average spending of 15K-30K per year. Targeted 'Value-Chic' lines should be marketed specifically to this massive segment.",
    icon: "indian-rupee",
    metric: "79%",
    metricLabel: "Spend 15K-30K/Year",
  },
  {
    title: "Product Quality Concerns",
    description: "Quality issues and differences from images are the top regret reasons. Retailers should improve quality control, provide detailed descriptions, and use accurate product images/videos to reduce returns.",
    icon: "alert-triangle",
    metric: "#1",
    metricLabel: "regret: Quality/Images",
  },
  {
    title: "Reviews Drive Trust",
    description: "Students rely heavily on reviews and ratings over advertising. Businesses should encourage authentic customer reviews and user-generated content to build trust.",
    icon: "star",
    metric: "Reviews",
    metricLabel: "top trust factor",
  },
  {
    title: "Predictive ML Insights",
    description: "SVM (Linear) achieved 86.5% accuracy predicting shopping preferences — best among 5 models. This helps retailers anticipate customer channel preference for targeted marketing.",
    icon: "brain",
    metric: "86.5%",
    metricLabel: "best model accuracy",
  },
  {
    title: "Customer Segmentation",
    description: "K-Means clustering identified 4 distinct student segments based on spending and preferences. Enables targeted promotions, personalized product recommendations, and segment-specific campaigns.",
    icon: "users",
    metric: "4",
    metricLabel: "distinct segments",
  },
];

export const textMiningKeywords = [
  "quality", "fit", "price", "comfort", "style", "brand", "variety", "trendy",
  "affordable", "confidence", "satisfaction", "return", "size", "color", "fabric",
  "modest", "cost", "better", "emergency", "outfit",
];
