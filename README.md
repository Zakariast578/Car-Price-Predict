# Car Price & Odometer Prediction Project

This project predicts car prices using machine learning models based on a dataset of car features. The workflow includes data cleaning, preprocessing, feature engineering, and model training/evaluation. The project is implemented in Python using pandas, scikit-learn, and numpy.

## Project Structure

- `Preprocess.py`: Cleans and preprocesses the raw dataset, handles missing values, encodes categorical variables, removes outliers, and performs feature engineering. The processed data is saved as `cleaned_car_l3_dataset.csv`.
- `model.py`: Loads the cleaned dataset, splits it into training and testing sets, trains two regression models (Linear Regression and Random Forest Regressor), evaluates their performance, and allows for single-sample prediction.
- `dataset/car_l3_dataset.csv`: The original raw dataset.
- `dataset/cleaned_car_l3_dataset.csv`: The cleaned and processed dataset ready for modeling.

## Data Preprocessing

- Cleans price and location fields, handles missing values using imputation, and removes duplicates.
- Removes outliers in `Price` and `Odometer_km` using the IQR method and clipping.
- One-hot encodes the `Location` column.
- Feature engineering includes:
  - Calculating car age from the year.
  - Creating binary features for new cars and best cars.
  - Log-transforming price and odometer values.
- Scales features using StandardScaler and MinMaxScaler.

## Model Training & Evaluation

- Splits the data into training and testing sets (80/20 split).
- Trains two models:
  - Linear Regression
  - Random Forest Regressor
- Evaluates models using MAE, MSE, RMSE, and R² metrics.
- Allows the user to select a test sample and outputs predictions for both models.

## How to Run

1. Run `Preprocess.py` to clean and preprocess the data. This will generate `cleaned_car_l3_dataset.csv`.
2. Run `model.py` to train models and make predictions. You will be prompted to enter the index of a test sample for prediction.

## Requirements

See `Requirements.txt` for the list of dependencies.

## Author

Zakaria
