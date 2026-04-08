"""
test_preprocessing.py
=====================
Unit tests for the data preprocessing logic used in Preprocessing.ipynb.
Tests the key functions:
  - convert_spending_to_numeric : spending range → numeric midpoint
  - clean_column_names          : strip newlines / whitespace from column headers
  - handle_missing_values       : fill NaN in object & feedback columns
  - normalize_text              : lowercase + strip whitespace on string columns
  - remove_duplicates           : drop exact duplicate rows

Run with:
    pip install pytest pandas
    pytest testing/python/test_preprocessing.py -v
"""

import pytest
import pandas as pd
import numpy as np


# ─────────────────────────────────────────────────────────
#  Helper function replicated from the notebook
# ─────────────────────────────────────────────────────────

def convert_spending_to_numeric(x):
    """Converts spending range strings to numeric midpoints (₹)."""
    if pd.isna(x):
        return None
    x = str(x).lower()
    if "below" in x:
        return 2500
    elif "5000-10000" in x or "5,000-10,000" in x:
        return 7500
    elif "10000-15000" in x or "10,000-15,000" in x:
        return 12500
    elif "15000-20000" in x or "15,000-20,000" in x:
        return 17500
    elif "20000" in x or "20,000" in x:
        return 22000
    else:
        try:
            val = float(x)
            return min(val, 200000)
        except Exception:
            return None


def clean_column_names(df: pd.DataFrame) -> pd.DataFrame:
    """Remove newline characters and strip whitespace from column names."""
    df.columns = df.columns.str.replace("\n", " ").str.strip()
    return df


def handle_missing_values(df: pd.DataFrame, feedback_col: str) -> pd.DataFrame:
    """Fill NaN in feedback column with '' and categorical columns with mode."""
    df[feedback_col] = df[feedback_col].fillna("")
    for col in df.select_dtypes(include="object").columns:
        if df[col].isnull().sum() > 0:
            df[col] = df[col].fillna(df[col].mode()[0])
    return df


def normalize_text(df: pd.DataFrame) -> pd.DataFrame:
    """Lowercase + strip whitespace on all string columns."""
    for col in df.select_dtypes(include="object").columns:
        df[col] = df[col].str.strip().str.lower()
    return df


def remove_duplicates(df: pd.DataFrame) -> pd.DataFrame:
    """Drop exact duplicate rows."""
    return df.drop_duplicates()


# ─────────────────────────────────────────────────────────
#  Tests: convert_spending_to_numeric
# ─────────────────────────────────────────────────────────

class TestConvertSpendingToNumeric:

    def test_below_returns_2500(self):
        assert convert_spending_to_numeric("below ₹5000") == 2500

    def test_below_case_insensitive(self):
        assert convert_spending_to_numeric("BELOW 5000") == 2500

    def test_range_5000_10000(self):
        assert convert_spending_to_numeric("5000-10000") == 7500

    def test_range_5000_10000_with_commas(self):
        assert convert_spending_to_numeric("5,000-10,000") == 7500

    def test_range_10000_15000(self):
        assert convert_spending_to_numeric("10000-15000") == 12500

    def test_range_10000_15000_with_commas(self):
        assert convert_spending_to_numeric("10,000-15,000") == 12500

    def test_range_15000_20000(self):
        assert convert_spending_to_numeric("15000-20000") == 17500

    def test_range_15000_20000_with_commas(self):
        assert convert_spending_to_numeric("15,000-20,000") == 17500

    def test_above_20000(self):
        assert convert_spending_to_numeric("20000 and above") == 22000

    def test_numeric_string_passthrough(self):
        assert convert_spending_to_numeric("16499") == 16499.0

    def test_clips_extreme_outlier_to_200000(self):
        assert convert_spending_to_numeric("999999") == 200000

    def test_invalid_string_returns_none(self):
        assert convert_spending_to_numeric("unknown value") is None

    def test_nan_returns_none(self):
        assert convert_spending_to_numeric(float("nan")) is None


# ─────────────────────────────────────────────────────────
#  Tests: clean_column_names
# ─────────────────────────────────────────────────────────

class TestCleanColumnNames:

    def _make_df(self, cols):
        return pd.DataFrame(columns=cols)

    def test_removes_newlines(self):
        # Exact column name found in the notebook survey data
        col = "What is your average spending ?\n(per year)\n"
        df = self._make_df([col])
        df = clean_column_names(df)
        assert col not in df.columns
        assert "What is your average spending ? (per year)" in df.columns

    def test_strips_leading_trailing_whitespace(self):
        df = self._make_df(["  Gender  "])
        df = clean_column_names(df)
        assert "Gender" in df.columns

    def test_preserves_normal_column_name(self):
        df = self._make_df(["Shopping Method"])
        df = clean_column_names(df)
        assert "Shopping Method" in df.columns

    def test_multiple_columns(self):
        df = self._make_df(["  Col A\n", "Col B  ", "Col C"])
        df = clean_column_names(df)
        assert list(df.columns) == ["Col A", "Col B", "Col C"]


# ─────────────────────────────────────────────────────────
#  Tests: handle_missing_values
# ─────────────────────────────────────────────────────────

class TestHandleMissingValues:

    def _make_sample_df(self):
        return pd.DataFrame({
            "Gender": ["Female", "Male", None, "Female"],
            "Shopping Method": ["Online", None, "Both", "Offline"],
            "Feedback": [None, None, "nice quality", None],
        })

    def test_feedback_nan_filled_with_empty_string(self):
        df = self._make_sample_df()
        df = handle_missing_values(df, "Feedback")
        assert df["Feedback"].isnull().sum() == 0
        assert df.loc[0, "Feedback"] == ""

    def test_categorical_nan_filled_with_mode(self):
        df = self._make_sample_df()
        df = handle_missing_values(df, "Feedback")
        assert df["Gender"].isnull().sum() == 0
        # Mode of ["Female", "Male", None, "Female"] is "Female"
        assert df.loc[2, "Gender"] == "Female"

    def test_no_nulls_remain_after_handling(self):
        df = self._make_sample_df()
        df = handle_missing_values(df, "Feedback")
        assert df.isnull().sum().sum() == 0


# ─────────────────────────────────────────────────────────
#  Tests: normalize_text
# ─────────────────────────────────────────────────────────

class TestNormalizeText:

    def test_lowercases_all_strings(self):
        df = pd.DataFrame({"Gender": ["Female", "MALE", "Female"]})
        df = normalize_text(df)
        assert list(df["Gender"]) == ["female", "male", "female"]

    def test_strips_whitespace(self):
        df = pd.DataFrame({"Method": ["  Online ", " Offline", "Both  "]})
        df = normalize_text(df)
        assert list(df["Method"]) == ["online", "offline", "both"]

    def test_preserves_numeric_columns(self):
        df = pd.DataFrame({
            "Spending": [5000, 10000, 20000],
            "Gender": ["Female", "Male", "Female"],
        })
        df = normalize_text(df)
        assert list(df["Spending"]) == [5000, 10000, 20000]  # untouched


# ─────────────────────────────────────────────────────────
#  Tests: remove_duplicates
# ─────────────────────────────────────────────────────────

class TestRemoveDuplicates:

    def test_removes_exact_duplicates(self):
        df = pd.DataFrame({
            "Gender": ["Female", "Female", "Male"],
            "Method": ["Online", "Online", "Offline"],
        })
        result = remove_duplicates(df)
        assert len(result) == 2

    def test_keeps_unique_rows(self):
        df = pd.DataFrame({
            "Gender": ["Female", "Male"],
            "Method": ["Online", "Offline"],
        })
        result = remove_duplicates(df)
        assert len(result) == 2

    def test_duplicate_count_is_zero_after_removal(self):
        df = pd.DataFrame({
            "A": ["x", "x", "y"],
            "B": [1, 1, 2],
        })
        result = remove_duplicates(df)
        assert result.duplicated().sum() == 0


# ─────────────────────────────────────────────────────────
#  Integration Test: Full preprocessing pipeline
# ─────────────────────────────────────────────────────────

class TestFullPreprocessingPipeline:
    """End-to-end test simulating the notebook pipeline steps."""

    def _make_raw_df(self):
        return pd.DataFrame({
            "Timestamp": pd.to_datetime(["2025-12-19 07:40:29", "2025-12-19 07:40:29"]),
            "Gender": ["Female", "Female"],  # duplicate row
            "Which shopping method do you prefer?": ["  Both  ", "  Both  "],
            "What is your average spending ?\n(per year)\n": ["16499", "16499"],
            "Feedback col": [None, None],
        })

    def test_pipeline_reduces_duplicates(self):
        df = self._make_raw_df()
        df = clean_column_names(df)
        df.drop(columns=["Timestamp"], inplace=True)
        feedback_col = [c for c in df.columns if "Feedback" in c][0]
        df = handle_missing_values(df, feedback_col)
        df = normalize_text(df)
        df = remove_duplicates(df)
        assert len(df) == 1

    def test_pipeline_column_names_are_clean(self):
        df = self._make_raw_df()
        df = clean_column_names(df)
        for col in df.columns:
            assert "\n" not in col
            assert col == col.strip()
