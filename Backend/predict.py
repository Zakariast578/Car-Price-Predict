import pandas as pd
import numpy as np

import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

data = pd.read_csv('dataset/cleaned_car_l3_dataset.csv')
df = pd.DataFrame(data)

# Features and target variable
# CORRECTION: We must drop the log-transformed columns as well,
# since they are not true features but transformations of our target.
X = df.drop(columns=['Price','Odometer_km', 'LogPrice', 'LogOdometer'])
y = df['Price']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Models 
# Linear Regression
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
n_samples = len(X_test)

for z in range(3):
    i = int(input(f"Enter the index of the test Car (0 to {n_samples-1}): "))
    
    if i < 0 or i >= n_samples:
        print(f"❌ Invalid index! Please enter between 0 and {n_samples-1}.")
        continue
    
    X_one_test = X_test.iloc[[i]]
    y_one_test = y_test.iloc[[i]]

    # Predictions
    y_pred_lr_array = lr.predict(X_one_test)
    y_pred_rf_array = rf.predict(X_one_test)

    # Print results
    print(f"\nCar {i}:")
    print(f"  Actual Price: {float(y_one_test.values[0]):.2f}")
    print(f"  Linear Regression Prediction: {y_pred_lr_array[0]:.2f}")
    print(f"  Random Forest Prediction: {y_pred_rf_array[0]:.2f}\n")

# ----------------------------------------------------------------------------------
# Function to get user input and predict the price
# ----------------------------------------------------------------------------------
# def predict_new_car_price(lr_model, rf_model, X_train_cols):
#     """
#     Prompts the user to input car features and predicts the price based on two options.
#     """
#     print("\nSelect the set of features you want to use for prediction:")
#     print("1. Doors, Accidents, Location, Car_Age")
#     print("2. Doors, New_One, Best_Car")

#     choice = input("Enter your choice (1 or 2): ")

#     if choice == '1':
#         required_cols = ['Doors', 'Accidents', 'Car_Age']
#         input_data = {}

#         # Get integer input for Doors, validating for 2 or 4
#         while True:
#             try:
#                 value = int(input(f"Enter a value for Doors (2 or 4): "))
#                 if value in [2, 4]:
#                     input_data['Doors'] = float(value)
#                     break
#                 else:
#                     print("❌ Invalid input. Please enter 2 or 4.")
#             except ValueError:
#                 print("❌ Invalid input. Please enter an integer.")
        
#         # Get integer input for Accidents
#         while True:
#             try:
#                 value = int(input(f"Enter a value for Accidents (e.g., 0, 1, 2): "))
#                 if value >= 0:
#                     input_data['Accidents'] = float(value)
#                     break
#                 else:
#                     print("❌ Invalid input. Please enter a non-negative integer.")
#             except ValueError:
#                 print("❌ Invalid input. Please enter an integer.")

#         # Get integer input for Car_Age
#         while True:
#             try:
#                 value = int(input(f"Enter a value for Car_Age (e.g., 5, 10, 15): "))
#                 if value >= 0:
#                     input_data['Car_Age'] = float(value)
#                     break
#                 else:
#                     print("❌ Invalid input. Please enter a non-negative integer.")
#             except ValueError:
#                 print("❌ Invalid input. Please enter an integer.")

#         # Get input for the location and set one-hot encoded columns
#         while True:
#             loc_choice = input("Enter the location type (city, rural, or suburb): ").lower()
#             if loc_choice == 'city':
#                 input_data['Loc_city'] = 1.0
#                 input_data['Loc_rural'] = 0.0
#                 input_data['Loc_suburb'] = 0.0
#                 break
#             elif loc_choice == 'rural':
#                 input_data['Loc_city'] = 0.0
#                 input_data['Loc_rural'] = 1.0
#                 input_data['Loc_suburb'] = 0.0
#                 break
#             elif loc_choice == 'suburb':
#                 input_data['Loc_city'] = 0.0
#                 input_data['Loc_rural'] = 0.0
#                 input_data['Loc_suburb'] = 1.0
#                 break
#             else:
#                 print("❌ Invalid location choice. Please enter 'city', 'rural', or 'suburb'.")

#     elif choice == '2':
#         required_cols = ['Doors', 'New_One', 'Best_Car']
#         input_data = {}

#         # Get integer input for Doors, validating for 2 or 4
#         while True:
#             try:
#                 value = int(input(f"Enter a value for Doors (2 or 4): "))
#                 if value in [2, 4]:
#                     input_data['Doors'] = float(value)
#                     break
#                 else:
#                     print("❌ Invalid input. Please enter 2 or 4.")
#             except ValueError:
#                 print("❌ Invalid input. Please enter an integer.")

#         # Get and validate boolean input for New_One
#         while True:
#             try:
#                 value = int(input(f"Enter a value for New_One (0 for no, 1 for yes): "))
#                 if value in [0, 1]:
#                     input_data['New_One'] = float(value)
#                     break
#                 else:
#                     print("❌ Invalid input. Please enter 0 or 1.")
#             except ValueError:
#                 print("❌ Invalid input. Please enter an integer (0 or 1).")

#         # Get and validate boolean input for Best_Car
#         while True:
#             try:
#                 value = int(input(f"Enter a value for Best_Car (0 for no, 1 for yes): "))
#                 if value in [0, 1]:
#                     input_data['Best_Car'] = float(value)
#                     break
#                 else:
#                     print("❌ Invalid input. Please enter 0 or 1.")
#             except ValueError:
#                 print("❌ Invalid input. Please enter an integer (0 or 1).")

#     else:
#         print("❌ Invalid choice. Please enter 1 or 2.")
#         return

#     # Create a DataFrame from the user's input and ensure all columns from X_train are present
#     user_df = pd.DataFrame([input_data])
    
#     # Add any missing columns from X_train and fill with 0
#     missing_cols = set(X_train_cols) - set(user_df.columns)
#     for c in missing_cols:
#         user_df[c] = 0.0

#     # Reorder columns to match the training data
#     user_df = user_df[X_train_cols]

#     # Make predictions
#     lr_pred = lr_model.predict(user_df)
#     rf_pred = rf_model.predict(user_df)

#     # Print the results
#     print("\n⭐ Prediction Results:")
#     print(f"Linear Regression Predicted Price: ${lr_pred[0]:.2f}")
#     print(f"Random Forest Predicted Price: ${rf_pred[0]:.2f}")

# # Call the function to run the prediction
# predict_new_car_price(lr, rf, X_train.columns)

if not os.path.exists('models'):
    os.makedirs('models')
# Save Linear Regression model
joblib.dump(lr, 'models/linear_regression_model.pkl')

# Save Random Forest model
joblib.dump(rf, 'models/random_forest_model.pkl')
# Columns training
feature_cols = X_train.columns.tolist()
joblib.dump(feature_cols, 'models/feature_columns.pkl')

print("✅ Models saved successfully in 'models/' folder.")
