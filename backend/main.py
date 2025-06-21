from fastapi import FastAPI, UploadFile, File, Body
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import json
import io
import os

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model components once at startup
base_dir = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(base_dir, "models", "rf_pca_model.pkl"))
scaler = joblib.load(os.path.join(base_dir, "models", "scaler.pkl"))
pca = joblib.load(os.path.join(base_dir, "models", "pca_transform.pkl"))

# Load expected feature names
with open(os.path.join(base_dir, "models", "feature_names.json"), "r") as f:
    feature_names = json.load(f)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        # Fill missing features
        for col in feature_names:
            if col not in df.columns:
                df[col] = 0
        df = df[feature_names]

        # Preprocess
        df.replace([float('inf'), -float('inf')], 0, inplace=True)
        df.fillna(0, inplace=True)

        # Scale + PCA
        X_scaled = scaler.transform(df)
        X_pca = pca.transform(X_scaled)

        # Predict
        predictions = model.predict(X_pca)
        result = [{"Index": i, "Prediction": int(p)} for i, p in enumerate(predictions)]

        return {"predictions": result}

    except Exception as e:
        return {"error": str(e)}


@app.post("/predict_single")
async def predict_single(data: dict = Body(...)):
    try:
        # Convert dict to DataFrame
        df = pd.DataFrame([data])

        # Keep only expected features, fill missing
        for col in feature_names:
            if col not in df.columns:
                df[col] = 0
        df = df[feature_names]

        # Clean & scale
        df.replace([float('inf'), -float('inf')], 0, inplace=True)
        df.fillna(0, inplace=True)

        X_scaled = scaler.transform(df)
        X_pca = pca.transform(X_scaled)

        prediction = model.predict(X_pca)[0]

        return {"prediction": int(prediction)}

    except Exception as e:
        return {"error": str(e)}
