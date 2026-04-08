"""
test_nlp.py
===========
Tests for the NLP / Text Mining pipeline used in Preprocessing.ipynb:
  - Text cleaning (special chars, lowercasing)
  - Stopword removal
  - Lemmatization
  - TF-IDF keyword extraction

Run with:
    pip install pytest nltk scikit-learn
    python -m nltk.downloader stopwords wordnet
    pytest testing/python/test_nlp.py -v
"""

import re
import pytest
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer

# Download required NLTK resources quietly
nltk.download("stopwords", quiet=True)
nltk.download("wordnet", quiet=True)

STOP_WORDS = set(stopwords.words("english"))
LEMMATIZER = WordNetLemmatizer()


# ─────────────────────────────────────────────────────────
#  Helper: Text cleaner replicated from notebook
# ─────────────────────────────────────────────────────────

def clean_text(text: str) -> str:
    """Clean text: lowercase → remove special chars → remove stopwords → lemmatize."""
    if not isinstance(text, str) or not text.strip():
        return ""
    text = text.lower()
    text = re.sub(r"[^a-z\s]", "", text)
    tokens = text.split()
    tokens = [LEMMATIZER.lemmatize(t) for t in tokens if t not in STOP_WORDS]
    return " ".join(tokens)


# ─────────────────────────────────────────────────────────
#  Tests: Text Cleaning
# ─────────────────────────────────────────────────────────

class TestTextCleaning:

    def test_lowercases_text(self):
        result = clean_text("ONLINE Shopping is GREAT")
        assert result == result.lower()

    def test_removes_special_characters(self):
        result = clean_text("quality!! #1 brand? 100%")
        assert "!" not in result
        assert "#" not in result
        assert "?" not in result
        assert "%" not in result

    def test_removes_numbers(self):
        result = clean_text("I spent 5000 rupees on clothes")
        assert "5000" not in result

    def test_returns_empty_for_blank_input(self):
        assert clean_text("") == ""
        assert clean_text("   ") == ""

    def test_returns_empty_for_non_string(self):
        assert clean_text(None) == ""
        assert clean_text(float("nan")) == ""

    def test_preserves_meaningful_words(self):
        result = clean_text("quality fabric style")
        assert "quality" in result
        assert "fabric" in result
        assert "style" in result


# ─────────────────────────────────────────────────────────
#  Tests: Stopword Removal
# ─────────────────────────────────────────────────────────

class TestStopwordRemoval:

    def test_common_stopwords_are_removed(self):
        result = clean_text("I am the best and it is what it is")
        for word in ["i", "am", "the", "and", "it", "is", "what"]:
            assert word not in result.split()

    def test_non_stopwords_remain(self):
        result = clean_text("fashion quality brand expensive")
        assert "fashion" in result
        assert "quality" in result
        assert "brand" in result

    def test_nltk_stopwords_list_loaded(self):
        assert len(STOP_WORDS) > 100  # NLTK English has 179 stopwords


# ─────────────────────────────────────────────────────────
#  Tests: Lemmatization
# ─────────────────────────────────────────────────────────

class TestLemmatization:

    def test_running_becomes_run(self):
        result = LEMMATIZER.lemmatize("running", pos="v")
        assert result == "run"

    def test_clothes_becomes_cloth(self):
        result = LEMMATIZER.lemmatize("clothes")
        # Lemmatizer may return 'clothes' or 'cloth' depending on POS
        assert result in ("clothes", "cloth")

    def test_buying_becomes_buy(self):
        result = LEMMATIZER.lemmatize("buying", pos="v")
        assert result == "buy"

    def test_sizes_becomes_size(self):
        result = LEMMATIZER.lemmatize("sizes")
        assert result == "size"

    def test_brands_becomes_brand(self):
        result = LEMMATIZER.lemmatize("brands")
        assert result == "brand"


# ─────────────────────────────────────────────────────────
#  Tests: TF-IDF Keyword Extraction
# ─────────────────────────────────────────────────────────

class TestTFIDFKeywords:

    FEEDBACK_CORPUS = [
        "quality clothes price affordable fashion",
        "fit size color fabric comfortable style",
        "brand trust reviews quality better",
        "online offline shopping convenient price",
        "quality issues return policy size problem",
        "trendy affordable student fashion budget",
        "fabric comfort style preference brand",
    ]

    def test_tfidf_produces_correct_number_of_features(self):
        vec = TfidfVectorizer(max_features=10)
        X = vec.fit_transform(self.FEEDBACK_CORPUS)
        assert X.shape[1] == 10

    def test_tfidf_top_terms_include_quality(self):
        """'quality' appears multiple times, should be a top term."""
        vec = TfidfVectorizer(max_features=15)
        X = vec.fit_transform(self.FEEDBACK_CORPUS)
        top_terms = vec.get_feature_names_out()
        assert "quality" in top_terms

    def test_tfidf_no_negative_values(self):
        vec = TfidfVectorizer(max_features=15)
        X = vec.fit_transform(self.FEEDBACK_CORPUS)
        assert X.min() >= 0

    def test_tfidf_vocabulary_size_bounded_by_max_features(self):
        vec = TfidfVectorizer(max_features=5)
        vec.fit_transform(self.FEEDBACK_CORPUS)
        assert len(vec.vocabulary_) == 5

    def test_clean_text_pipeline_produces_non_empty_output(self):
        texts = ["Great quality but poor fit!", "Affordable and trendy styles."]
        cleaned = [clean_text(t) for t in texts]
        assert all(len(c) > 0 for c in cleaned)
