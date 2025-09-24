# CarPricePro (Car Price Prediction Platform)

CarPricePro is a full‑stack car price prediction platform combining a FastAPI backend (machine learning inference) with a modern React + Vite + Tailwind + Shadcn UI frontend. Users can input structured vehicle features and instantly receive price estimates from two trained regression models (Linear Regression & Random Forest).

---
## 📸 Live Preview

Here's a sneak peek of the CarPricePro interface.

<p align="center">
  <img src="./Screenshots/with-premium.png" alt="with pro" width="700" />
</p>
## 🚀 Features

- Dual ML model inference (Linear Regression + Random Forest)
- Clean preprocessing pipeline: cleaning, imputation, outlier clipping, feature engineering
- FastAPI REST endpoint with structured Pydantic schema
- Frontend: Responsive, glass/gradient aesthetic, animated cards & form validation
- Location one‑hot encoding & engineered flags (New_One, Best_Car)
- Extensible architecture (easy to add models or endpoints)

---

## 🧱 Architecture Overview

```
Root
├── Backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app & /predict endpoint
│   │   └── model.py         # Loads serialized models
│   ├── Preprocess.py        # Raw → cleaned dataset pipeline
│   ├── predict.py           # Trains & saves models + feature columns
│   ├── dataset/
│   │   ├── car_l3_dataset.csv
│   │   └── cleaned_car_l3_dataset.csv
│   ├── models/              # *.pkl artifacts (after training)
│   └── Requirements.txt
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx      # Hero + prediction form + results
│   │   │   ├── Navbar.jsx    # Responsive navigation (sheet on mobile)
│   │   │   ├── About.jsx     # Feature value proposition grid
│   │   │   ├── HowItWork.jsx # Pipeline explanation steps
│   │   │   └── Footer.jsx    # Gradient footer w/ links & socials
│   │   └── ui/               # Shadcn-derived primitives (button, card, etc.)
│   ├── public/
│   └── package.json
└── README.md (this file)
```

---

## 🧪 Data Pipeline (Backend)

Steps performed in `Preprocess.py`:

1. Currency & symbol stripping from Price → float
2. Location normalization (trimming, typo fixes, removal of junk tokens)
3. Missing value handling:
   - Median impute: `Odometer_km`, `Doors`
   - Most frequent: `Location`
4. Duplicate removal
5. Outlier treatment (IQR bounds + clipping) on `Price` & `Odometer_km`
6. One‑hot encoding: `Location` → `Loc_city`, `Loc_rural`, `Loc_suburb`
7. Feature engineering:
   - `Car_Age` (2025 - Year)
   - `New_One` flag (no accidents & age ≤ 5)
   - `Best_Car` (age 0–5 & odometer < 100000)
   - Log transforms: `LogPrice`, `LogOdometer` (for exploration / optional modeling)
8. Persist cleaned dataset → `dataset/cleaned_car_l3_dataset.csv`

Model training (`predict.py`):

- Drops target & log transform columns from features
- Splits (80/20)
- Trains Linear Regression + RandomForestRegressor(n=100)
- Saves models + feature column order (`feature_columns.pkl`)

---

## 🧠 Inference API

Endpoint: `POST /predict`

Request body (Pydantic model):

```json
{
	"Doors": 4,
	"Accidents": 0,
	"Car_Age": 3,
	"Loc_city": 1,
	"Loc_rural": 0,
	"Loc_suburb": 0,
	"New_One": 1,
	"Best_Car": 0
}
```

Response:

```json
{
	"Linear_Regression_Prediction": 5181.14,
	"Random_Forest_Prediction": 5722.06
}
```

Flow inside `main.py`:

- Validate payload → dataframe
- Inject any missing columns → zero (align with saved `feature_columns.pkl`)
- Predict with both models → return floats
- CORS enabled for Vite dev origins

---

## 💻 Frontend UX Highlights

| Component | Purpose               | Notable Enhancements                                             |
| --------- | --------------------- | ---------------------------------------------------------------- |
| Navbar    | Navigation / identity | Gradient logo, blur, mobile sheet menu                           |
| Home      | Form & results        | Validation, numeric casting, loading state, animated result card |
| About     | Value props           | Responsive feature grid with gradient accents                    |
| HowItWork | Process transparency  | Step cards with hover effects & progress accent                  |
| Footer    | Links & attribution   | Gradient layers, social icons, semantic sections                 |

Prediction Form (Home):

- Validates: Doors (2/4), non‑negative numbers, location required
- Toggles: `New_One`, `Best_Car` via checkboxes
- Sends numeric payload to API; handles server error gracefully

---

## 🛠️ Local Development

### 1. Backend Setup

```bash
cd Backend
pip install -r Requirements.txt
python Preprocess.py      # build cleaned dataset
python predict.py         # train & serialize models
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API docs (Swagger): http://127.0.0.1:8000/docs

### 2. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Vite dev server: http://127.0.0.1:5173

Ensure backend is running before submitting a prediction.

---

## 📦 Backend Dependencies (key)

`fastapi`, `uvicorn`, `pandas`, `numpy`, `scikit-learn`, `joblib`

## 📦 Frontend Dependencies (key)

`react`, `vite`, `axios`, `tailwindcss`, `@radix-ui/*`, `lucide-react`, Shadcn UI primitives

---

## 🔍 Extensibility Ideas

- Add model performance endpoint (`/metrics` returning MAE/RMSE stored on train)
- Persist prediction logs (SQLite / PostgreSQL)
- Add authentication & user dashboards
- Introduce gradient boosting (XGBoost / LightGBM) ensemble
- Add CI pipeline for regression testing model drift

---

## 🖼️ Screenshots

_Place your UI screenshots in a `screenshots/` folder at repository root or `/Frontend/public/` then reference them here._

Example (replace when images available):

```md
![Home Prediction Form](screenshots/home_form.png)
![About Section](screenshots/about_section.png)
```

---

## ❓ Troubleshooting

| Issue                 | Cause              | Fix                                      |
| --------------------- | ------------------ | ---------------------------------------- |
| 500 Prediction error  | Missing models     | Run `python predict.py` again          |
| CORS error in browser | Origin blocked     | Confirm backend CORS list in `main.py` |
| NaN / wrong values    | Feature mismatch   | Delete `models/` & retrain             |
| Frontend form stuck   | Validation failing | Check red field hints                    |

---

## 📄 License

Currently unpublished license (private use). Add a LICENSE file if distributing.

---

## ✨ Author

Zakaria — Feel free to connect via LinkedIn or portfolio.

---

If you find this useful, star the repository and extend it with your own model experiments!
