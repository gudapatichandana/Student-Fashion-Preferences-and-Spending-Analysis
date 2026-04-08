# 👗 Student Fashion Preferences & Spending Analysis

[![Python](https://img.shields.io/badge/Python-3.x-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-orange?style=flat-square&logo=jupyter)](https://jupyter.org/)
[![Tableau](https://img.shields.io/badge/Tableau-Visualization-e97627?style=flat-square&logo=tableau)](https://www.tableau.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-green?style=flat-square&logo=scikit-learn)](https://scikit-learn.org/)

A comprehensive Business Analytics project exploring student fashion preferences, shopping behavior, and spending patterns through survey data analysis, exploratory data analysis (EDA), NLP-based text mining, and machine learning classification.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Repository Structure](#-repository-structure)
- [Dataset Description](#-dataset-description)
- [Methodology](#-methodology)
- [Key Findings](#-key-findings)
- [Tableau Dashboard](#-tableau-dashboard)
- [Technologies Used](#-technologies-used)
- [How to Run](#-how-to-run)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Project Overview

This project investigates **how students make fashion-related decisions** — including what they wear, where they shop, how much they spend, and what factors influence their trust in fashion brands.

The analysis pipeline covers:
- **Data Preprocessing** – Cleaning, normalizing, and encoding survey data.
- **Exploratory Data Analysis (EDA)** – Visual insights into student behavior.
- **NLP & Text Mining** – Analyzing open-ended student feedback using TF-IDF and Word Cloud.
- **Machine Learning** – Classifying preferred shopping method using Multinomial Naive Bayes.
- **Visual Analytics** – Interactive dashboards created in **Tableau**.

---

## 📁 Repository Structure

```text
├── BA_Preprocessing_Project_final.ipynb                    # Main Jupyter Notebook
├── Student Fashion Preferences and Spending
│   Analysis (Responses).xlsx                               # Raw survey dataset
├── tableau/                                                 # Tableau Workbooks & Assets
│   └── Student_Fashion_and_SpendingAnalysis_BA_Tableau.twbx
├── dataset/                                                 # Data storage
├── dashboard/                                               # Web-based dashboard assets
└── README.md                                                # Project documentation
```

---

## 📊 Dataset Description

| Property | Details |
|---|---|
| **Source** | Google Forms Survey |
| **Total Responses** | 5,006 |
| **File Format** | Excel (`.xlsx`) |
| **Total Columns** | 18 |

### Survey Columns

| # | Column | Type | Description |
|---|--------|------|-------------|
| 1 | Timestamp | `datetime` | Date & time of submission |
| 2 | Gender | `object` | Male / Female |
| 3 | Level of Study | `object` | B.Tech, MBA, Diploma, MBBS, etc. |
| 4 | Clothing Preference | `object` | Most preferred clothing type |
| 5 | College Wear | `object` | What they prefer to wear for college |
| 6 | Uniform Policy | `object` | Whether college enforces uniform |
| 7 | Purchase Frequency | `object` | How often clothes are bought |
| 8 | Shopping Method | `object` | Online / Offline / Both |
| 9 | Shopping Preference Reason | `object` | Reason for chosen shopping method |
| 10 | Price Range | `object` | Preferred price per clothing item |
| 11 | Average Spending | `float64` | Annual clothing expenditure (₹) |
| 12 | Discount Importance | `object` | Whether discounts influence decisions |
| 13 | Shopping Confidence | `object` | Confidence in choosing without help |
| 14 | Regret Reason | `object` | Main reason for post-purchase regret |
| 15 | Opinion Source | `object` | Whose opinion they seek before buying |
| 16 | Brand Trust Factor | `object` | What builds trust in a brand |
| 17 | Brand Loyalty Factor | `object` | What increases brand purchase frequency |
| 18 | Open Feedback | `object` | Free-text fashion/shopping experience |

---

## 🧪 Methodology

### 1. Data Preprocessing
- Loaded raw dataset from Excel using `pandas`.
- Cleaned column names — removed newline characters and extra whitespace.
- Dropped `Timestamp` column (not needed for analysis).
- Filled missing values in the open-text feedback column with empty strings.
- Standardized all string columns: **lowercased + stripped whitespace**.
- Converted average spending from text bands (e.g., `"5000–10000"`) to numeric midpoints.

### 2. Exploratory Data Analysis (EDA)
Produced the following visualizations using `matplotlib` and `seaborn`:

| Plot | Insight |
|------|---------|
| Gender Distribution | Count of male vs. female respondents |
| Education Level | Breakdown by academic program |
| Clothing Type Preference | Most favoured fashion style |
| Shopping Method | Online vs. Offline vs. Both |
| Purchase Frequency | How often students buy clothes |
| Price Range Preference | Budget preferences per item |
| Discount Importance | Attitude toward promotional offers |
| Spending Distribution | Histogram of annual clothing spend |
| Spending by Gender | Box plot comparing gender spending |
| Spending vs. Price Range | Box plot analysis |
| Shopping Method vs. Gender | Crosstab heatmap |
| Feature Correlation Heatmap | Correlation across all encoded features |

### 3. Text Mining & NLP
Applied on the open-ended feedback column:
- **Text cleaning:** Lowercasing → special character removal → stopword filtering → lemmatization (`NLTK`).
- **TF-IDF Vectorization:** Extracted up to 500 features using unigrams and bigrams.
- **Top Keywords Bar Chart:** Top 15 most significant terms in feedback.
- **Word Cloud:** Visual summary of common themes in student responses.

### 4. Machine Learning — Shopping Method Classifier
| Step | Details |
|------|---------|
| **Target Variable** | Shopping method (Online / Offline / Both) |
| **Feature Input** | TF-IDF vectors of cleaned text feedback |
| **Algorithm** | Multinomial Naive Bayes (`MultinomialNB`) |
| **Split** | 80% Train / 20% Test (`random_state=42`) |
| **Evaluation** | Accuracy, Confusion Matrix, Classification Report |

---

## 📌 Key Findings

> Based on analysis of **5,006 survey responses** from students across multiple academic programs.

- 👕 **Casual wear** is the most preferred clothing type among students.
- 🛒 **Combined Online + Offline shopping** is the most dominant shopping mode.
- 💸 Most students spend **₹5,000 – ₹15,000 per year** on clothing.
- 🏷️ **Discounts and offers** significantly influence purchase decisions.
- ⭐ **Reviews and brand reputation** are the top trust-building factors.
- 😟 Top post-purchase regrets: **poor fit**, **quality issues**, and **product looks different from images**.
- 📝 Text analysis highlights: **price, quality, and fit** are the most frequently raised challenges in student feedback.

---

## 📊 Tableau Dashboard
The analysis is complemented by an interactive Tableau dashboard located in the `tableau/` directory. It provides visual insights into:
- Student demographics and shopping preferences.
- Spending distribution across different education levels.
- Correlation between brand trust factors and purchase frequency.

---

## 🛠️ Technologies Used

| Library | Version | Purpose |
|---------|---------|---------|
| `pandas` | Latest | Data loading, manipulation, encoding |
| `numpy` | Latest | Numerical computations |
| `matplotlib` | Latest | Plotting and visualization |
| `seaborn` | Latest | Statistical charts and heatmaps |
| `nltk` | Latest | Stopword removal, lemmatization |
| `scikit-learn` | Latest | TF-IDF, Naive Bayes, train-test split, metrics |
| `wordcloud` | Latest | Word cloud generation |
| `openpyxl` | Latest | Reading Excel files |
| `Tableau` | Latest | Interactive Dashboarding |

---

## ⚙️ How to Run

### Prerequisites
Make sure you have **Python 3.x** and **Jupyter Notebook** installed.

### Step 1 — Clone the Repository
```bash
git clone https://github.com/creatingMYworld/Student-Fashion-Preferences-and-Spending-Analysis.git
cd Student-Fashion-Preferences-and-Spending-Analysis
```

### Step 2 — Install Dependencies
```bash
pip install pandas numpy matplotlib seaborn scikit-learn nltk wordcloud openpyxl
```

### Step 3 — Download NLTK Resources *(first-time only)*
```python
import nltk
nltk.download('stopwords')
nltk.download('wordnet')
```

### Step 4 — Launch the Notebook
```bash
jupyter notebook BA_Preprocessing_Project_final.ipynb
```

### Step 5 — Run All Cells
Run all cells from top to bottom in order.

> ⚠️ **Important:** Update the file path in `pd.read_excel(...)` to match your local system path for the dataset file.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. **Fork** the repository.
2. **Create a feature branch.**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes.**
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push to the branch.**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Submit a Pull Request.**
