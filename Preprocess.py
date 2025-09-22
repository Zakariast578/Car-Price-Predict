import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Load the dataset
data = pd.read_csv('dataset/car_l3_dataset.csv')
# print(data.head())
df = pd.DataFrame(data)
# print(df.head())

# Display basic information about the dataset
# print(df.info())
# print(df.describe())
# print(df.isnull().sum())
# print(df.nunique())
# print(df.columns)
# print(df.shape)
# print(df["Price"].value_counts())

# Data Cleaning
df["Price"] = df["Price"].str.replace(r"[\$,]", "", regex=True).astype(float)
# print(df["Price"])

#now we have null values in the dataset so before handling we fix the values in the dataset
# print(df["Location"].value_counts())
# Replacing incorrect values in 'Location' column
df["Location"] = df["Location"].str.strip().str.lower()
df["Location"] = (
    df["Location"]
    .str.replace("subrb", "suburb", regex=False)
    .str.replace(r"\?\?", "", regex=True)  # replace ?? with empty string
)

# print(df["Location"].value_counts())

# Handling missing values imputation
# Impute missing values in 'Odometer_km' column with the Median value
df["Odometer_km"] = df["Odometer_km"].fillna(df["Odometer_km"].median())
# Impute missing values in 'Doors' column with the Median value
df["Doors"] = df["Doors"].fillna(df["Doors"].median())
# Impute missing values in 'Location' column with the most frequent value
loc_imputer = SimpleImputer(strategy="most_frequent")
df["Location"] = loc_imputer.fit_transform(df[["Location"]]).ravel()
print(df.isnull().sum())

# Remove duplicates
df = df.drop_duplicates()
# print(df.duplicated().sum())

#IQR method to remove outliers
def Iqr_outlier_removal(series, k= 1.5):
    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - k * IQR
    upper_bound = Q3 + k * IQR
    return lower_bound, upper_bound
# Remove outliers in 'Price' column
price_lower, price_upper = Iqr_outlier_removal(df["Price"])
#remove outliers in 'Odometer_km' column
odometer_lower, odometer_upper = Iqr_outlier_removal(df["Odometer_km"])

# Filter the DataFrame to remove outliers using  Clipping
df["Price"] = df["Price"].clip(lower=price_lower, upper=price_upper)
df["Odometer_km"] = df["Odometer_km"].clip(lower=odometer_lower, upper=odometer_upper)

print(df["Price"].max(), df["Price"].min(), df["Odometer_km"].max(), df["Odometer_km"].min())

# one-hot encoding for categorical variables
df = pd.get_dummies(df, columns=["Location"], prefix="Loc", drop_first=False, dtype="int")
df = df.drop(columns=["Loc_"])

# Feature Engineering
# Extracting 'Year' from 'Model' column
df["Car_Age"] = 2025 - df["Year"]
df["Car_Age"] = df["Car_Age"].apply(lambda x: x if x >= 0 else 0)  # Ensure no negative ages
df = df.drop(columns=["Year"])
#New one has no accidents and age <=5 years
df["New_One"] = ((df["Accidents"] == 0) & (df["Car_Age"] <= 5)).astype(int)
# best car age is between 0 to 5 years and Odometer_km should be less than 100000
df["Best_Car"] = ((df["Car_Age"].between(0, 5)) & (df["Odometer_km"] < 100000)).astype(int)
#price log
df["LogPrice"] = np.log1p(df["Price"]).round(2)
# Log of Odometer_km
df["LogOdometer"] = np.log1p(df["Odometer_km"]).round(2)
####### ****** Display Feature DataFrame ******* #######
# print(df[["Car_Age", "New_One","Best_Car","LogPrice","LogOdometer"]].head())


#Feature Scaling  (X only; keep targets & dummies unscaled)
dont_scale = ["Price", "LogPrice","LogOdometer","Odometer_km"] + [col for col in df.columns if col.startswith("Loc_")]
features_to_scale = [col for col in df.columns if col not in dont_scale]

scaler = StandardScaler()
df[features_to_scale] = scaler.fit_transform(df[features_to_scale])
# Alternative: Min-Max Scaling
min_max_scaler = MinMaxScaler()
df[features_to_scale] = min_max_scaler.fit_transform(df[features_to_scale])

# Save the cleaned and processed dataset
df.to_csv('dataset/cleaned_car_l3_dataset.csv', index=False)