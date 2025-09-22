import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

data = pd.read_csv('dataset/cleaned_car_l3_dataset.csv')
df = pd.DataFrame(data)

# Features and target variable
X = df.drop(columns=['Price', 'Odometer_km'])
y = df[['Price', 'Odometer_km']]

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)

# Train the Models  
#Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)
y_pred_lr = lr.predict(X_test)

# Random Forest Regressor
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)

# Evaluate the Models For Matrix Func
def Evaluate_model(model_name, y_true, y_pred):
    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_true, y_pred)
    print(f"{model_name} Performance:")
    print(f"Mean Absolute Error (MAE): {mae:.2f}")
    print(f"Mean Squared Error (MSE): {mse:.2f}")
    print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
    print(f"R-squared (R2 ): {r2:.2f}")
    print("-" * 30)

# Sanity Check
i = int(input("Enter the index of the test sample: "))  # Index of the test sample
X_one_test = X_test.iloc[[i]]
y_one_test = y_test.iloc[[i]]  # just for reference

# Get predictions (multi-target)
y_pred_lr_array = lr.predict(X_one_test).ravel()
y_pred_rf_array = rf.predict(X_one_test).ravel()

# Target columns
target_cols = y_test.columns.tolist()  # ['Price', 'Odometer_km']

# Convert predictions to dictionary
# Convert predictions to dictionary with standard floats
y_pred_lr_one = {col: float(val) for col, val in zip(target_cols, y_pred_lr_array)}
y_pred_rf_one = {col: float(val) for col, val in zip(target_cols, y_pred_rf_array)}

# Print results
print("Test Sample Features:", y_one_test.to_dict(orient='records')[0])
print("Linear Regression Prediction:", {k: f"{v:.2f}" for k, v in y_pred_lr_one.items()})
print("Random Forest Prediction:", {k: f"{v:.2f}" for k, v in y_pred_rf_one.items()})

