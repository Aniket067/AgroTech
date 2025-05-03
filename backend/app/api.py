from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field
from typing import List
import pandas as pd
import pickle
import uvicorn


# Initialize FastAPI app
app = FastAPI(
    title="Crop Yield Prediction API",
    description="API for predicting crop yield based on various factors",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow Next.js frontend to make requests
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# Load the model
try:
    model, model_columns = pickle.load(open("models/yield_model.pkl", "rb"))
except Exception as e:
    raise Exception(f"Model loading failed: {e}")

# Load feature names
feature_names = model_columns

# Define the keywords
crop_keywords = [
    "Arhar/Tur", "Bajra", "Banana", "Barley", "Black pepper",
    "Cardamom", "Castor seed", "Coconut", "Coriander", "Cotton(lint)",
    "Dry ginger", "Garlic", "Groundnut", "Horse-gram", "Jute",
    "Linseed", "Maize", "Moong(Green Gram)", "Niger seed", "Onion",
    "Other Kharif pulses", "Potato", "Rapeseed &Mustard", "Rice",
    "Safflower", "Sesamum", "Small millets", "Soyabean", "Sugarcane",
    "Sunflower", "Sweet potato", "Tapioca", "Tobacco", "Turmeric",
    "Urad", "Wheat"
]

state_keywords = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

season_keywords = ["Kharif", "Rabi", "Summer", "Winter", "Whole Year"]

# Strip and extract matching features
def clean_feature_options(keywords):
    return [col.strip() for col in feature_names if any(keyword.lower() in col.lower() for keyword in keywords)]

crop_options = clean_feature_options(crop_keywords)
state_options = clean_feature_options(state_keywords)
season_options = clean_feature_options(season_keywords)

# Request and Response Models
class PredictionRequest(BaseModel):
    area: float = Field(..., gt=0, description="Area in hectares")
    rainfall: float = Field(..., ge=0, description="Annual rainfall in mm")
    fertilizer: float = Field(..., ge=0, description="Fertilizer used in tonnes")
    pesticide: float = Field(..., ge=0, description="Pesticide used in tonnes")
    crop: str = Field(..., description="Selected crop type")
    state: str = Field(..., description="Selected state")
    season: str = Field(..., description="Selected season")

class PredictionResponse(BaseModel):
    predicted_yield: float = Field(..., description="Predicted yield in tonnes per hectare")
    crop: str = Field(..., description="Crop type used for prediction")
    state: str = Field(..., description="State used for prediction")
    season: str = Field(..., description="Season used for prediction")

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Crop Yield Prediction API"}

# Options endpoint
@app.get("/options", response_model=dict)
async def get_options():
    return {
        "crop_options": crop_options,
        "state_options": state_options,
        "season_options": season_options
    }

# Prediction endpoint
@app.post("/predict", response_model=PredictionResponse)
async def predict_yield(request: PredictionRequest):
    # Strip input
    crop = request.crop.strip()
    state = request.state.strip()
    season = request.season.strip()

    # Validate
    if crop not in crop_options:
        raise HTTPException(status_code=400, detail=f"Invalid crop selection. Choose from: {crop_options}")
    if state not in state_options:
        raise HTTPException(status_code=400, detail=f"Invalid state selection. Choose from: {state_options}")
    if season not in season_options:
        raise HTTPException(status_code=400, detail=f"Invalid season selection. Choose from: {season_options}")

    # Prepare input
    input_data = {
        "Area": request.area,
        "Annual_Rainfall": request.rainfall,
        "Fertilizer": request.fertilizer,
        "Pesticide": request.pesticide,
    }

    for c in crop_options:
        input_data[c] = 1 if c == crop else 0
    for s in state_options:
        input_data[s] = 1 if s == state else 0
    for s in season_options:
        input_data[s] = 1 if s == season else 0

    input_df = pd.DataFrame([input_data])

    # Ensure all expected features are present
    for feat in feature_names:
        if feat not in input_df.columns:
            input_df[feat] = 0
    input_df = input_df[feature_names]

    try:
        prediction = model.predict(input_df)[0]
        return PredictionResponse(
            predicted_yield=float(prediction),
            crop=crop,
            state=state,
            season=season
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# Run the app
if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8080, reload=True)
