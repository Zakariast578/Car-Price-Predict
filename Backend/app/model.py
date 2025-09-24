import os
import joblib

# Models folder
MODEL_DIR = os.path.join(os.path.dirname(__file__), '..', 'models')

# Load models
lr_model = joblib.load(os.path.join(MODEL_DIR, 'linear_regression_model.pkl'))
rf_model = joblib.load(os.path.join(MODEL_DIR, 'random_forest_model.pkl'))

