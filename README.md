# Return Risk Predictor and Smart Substitute Recommender

This project aims to reduce product return rates and improve customer satisfaction by predicting the likelihood of returns for each product and recommending lower-risk alternatives at the point of purchase. Designed for the Walmart Sparkathon 2025, this solution leverages machine learning and data-driven decision-making to improve user experience and optimize Walmart's retail efficiency.

**Live Demo:** [Deployed URL here]

---

## Problem Statement

Product returns represent a major challenge for Walmart, leading to increased logistics costs, inventory inefficiencies, and reduced customer trust. Many returns are preventable, driven by issues such as inconsistent sizing, misleading product descriptions, or quality concerns.

This project focuses on addressing this challenge by:

- Identifying products with a high probability of being returned before purchase.
- Recommending lower-risk, better-reviewed alternatives.
- Explaining risk factors to help users make informed decisions.

---

## Key Features

- Return risk score generated using machine learning models.
- Real-time product evaluation during checkout.
- Automated product substitution engine based on risk and quality metrics.
- Explanation module highlighting probable return reasons.
- Simulated Walmart product catalog with cart functionality.

---

## Architecture Overview

- **Frontend:** React (TypeScript)
- **Backend:** FastAPI (Python)
- **Machine Learning:** scikit-learn, XGBoost (for return prediction)
- **Data Layer:** Simulated product and review datasets (CSV or Firebase)
- **Deployment:** [Insert deployment platform, e.g., Vercel, Render]

---

## How It Works

1. A user selects a product and adds it to their cart.
2. The backend model computes the return probability based on:
    - Average product rating
    - Review volume
    - Category and price
    - NLP-based sentiment from reviews
    - Historical return rates (simulated)
3. If the return probability exceeds a defined threshold:
    - A warning message is displayed
    - Alternative products with better satisfaction metrics are suggested
4. The user can choose a substitute or proceed with their original selection.




