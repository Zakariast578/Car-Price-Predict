# Car Price Prediction API

This project provides a RESTful API for predicting car prices using machine learning. The backend is built with FastAPI and serves two models: Linear Regression and a Random Forest Regressor.

## Project Structure

- **`Preprocess.py`**: A script to clean and preprocess the raw car data. It handles missing values, removes outliers, performs feature engineering, and saves a cleaned dataset.
- **`predict.py`**: This script loads the cleaned data, trains the machine learning models, and saves them as `.pkl` files in the `models/` directory.
- **`app/`**: The main application folder.
  - **`main.py`**: Contains the FastAPI application, defines the API endpoints, and handles prediction requests.
  - **`model.py`**: Loads the trained machine learning models.
- **`models/`**: Directory where the trained models and feature column information are stored.
- **`dataset/`**: Contains the raw and cleaned datasets.
- **`Requirements.txt`**: A list of project dependencies.

## Workflow

1.  **Data Preprocessing**: The `Preprocess.py` script takes the raw `car_l3_dataset.csv`, cleans it, creates new features, and saves the result as `cleaned_car_l3_dataset.csv`.
2.  **Model Training**: The `predict.py` script trains a Linear Regression and a Random Forest model on the cleaned data and saves the model objects.
3.  **API Serving**: The FastAPI application in `app/main.py` loads the trained models and exposes a `/predict` endpoint to serve predictions.

## How to Run

1.  **Install Dependencies**:
    ```bash
    pip install -r Requirements.txt
    ```

2.  **Preprocess Data**:
    Run the preprocessing script to generate the cleaned dataset.
    ```bash
    python Preprocess.py
    ```

3.  **Train Models**:
    Run the training script to generate the model files.
    ```bash
    python predict.py
    ```

4.  **Run the API Server**:
    Use uvicorn to run the FastAPI application.
    ```bash
    uvicorn app.main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`.

## API Endpoint

### `POST /predict`

Accepts a JSON object with car features and returns price predictions from both models.

**Example Request:**

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/predict' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "Doors": 4,
  "Accidents": 0,
  "Car_Age": 5,
  "Loc_city": 1,
  "Loc_rural": 0,
  "Loc_suburb": 0,
  "New_One": 0,
  "Best_Car": 1
}'
```

**Example Response:**

```json
{
  "Linear_Regression_Prediction": 8500.00,
  "Random_Forest_Prediction": 8750.50
}
```

## Author

Zakaria
