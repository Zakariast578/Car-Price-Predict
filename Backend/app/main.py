from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import os
import joblib
from app.model import MODEL_DIR, lr_model, rf_model
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI(title="Car Price Prediction API")

# Basic logging
logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# CORS (allow frontend dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the saved feature columns (used during training)
FEATURES_PATH = os.path.join(MODEL_DIR, 'feature_columns.pkl')
feature_cols = joblib.load(FEATURES_PATH)

# Define the Pydantic input model
class CarFeatures(BaseModel):
    Doors: int
    Accidents: int = 0       # Optional for feature set 1
    Car_Age: int = 0         # Optional for feature set 1
    Loc_city: int = 0        # One-hot encoding for feature set 1
    Loc_rural: int = 0
    Loc_suburb: int = 0
    New_One: int = 0         # Optional for feature set 2
    Best_Car: int = 0

@app.get("/")
def read_root():
    return {"message": "Welcome to the Car Price Prediction API. Use the /predict endpoint to get predictions."}

@app.post("/predict")
def predict_car_price(features: CarFeatures):
    try:
        payload = features.dict()
        logger.info(f"Incoming payload: {payload}")

        input_df = pd.DataFrame([payload])

        # Fill missing columns with 0 if any feature is missing
        for col in feature_cols:
            if col not in input_df.columns:
                input_df[col] = 0

        # Reorder columns to match training data
        input_df = input_df[feature_cols]

        lr_pred = lr_model.predict(input_df)
        rf_pred = rf_model.predict(input_df)

        response = {
            "Linear_Regression_Prediction": float(lr_pred[0]),
            "Random_Forest_Prediction": float(rf_pred[0])
        }
        logger.info(f"Prediction response: {response}")
        return response
    except Exception as e:
        logger.exception("Prediction failed")
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
