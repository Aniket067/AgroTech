# AgroTech - Machine Learning Powered Web App

AgroTech is a comprehensive agricultural solution built to provide crop recommendations, disease predictions, and crop yield predictions, leveraging machine learning and web technologies. The app is designed to help farmers make better decisions and improve crop productivity through advanced data analytics. AgroTech also integrates GroqAI for providing expert advice on crop cultivation and disease management.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Model Overview](#model-overview)
- [Features & Use Cases](#features--use-cases)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Crop Recommendation**:
   - **NPK and Temperature Conditions**: Suggests crops based on available NPK (Nitrogen, Phosphorus, Potassium) values and temperature conditions.
   - **Alternative**: If NPK data is unavailable, the system recommends crops based on season, state, and city.
   
2. **Disease Prediction**:
   - **Potato**: Detects Blight disease in potato crops.
   - **Tomato**: Detects Blight and Bacterial Spot diseases in tomatoes.
   
3. **Crop Yield Prediction**:
   - Predicts crop yields based on various environmental and crop-specific data using machine learning algorithms.

4. **GroqAI Integration**:
   - Provides AI-generated recommendations for crop cultivation, growth steps, and disease management.
   - Helps farmers understand how to grow crops effectively and cure crop diseases.

5. **Crop News**:
   - Displays the latest news and updates about crops, farming technologies, and industry developments.

6. **Interactive Web App**:
   - Built with **Next.js**, the app offers a user-friendly, interactive interface.
   - Allows users to input crop data and receive personalized recommendations and predictions.

7. **FastAPI Backend**:
   - The backend is built using **FastAPI**, providing high performance and seamless communication with the frontend.
   - Hosts the machine learning models and serves data to the frontend.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: FastAPI (Python)
- **Machine Learning Models**: Scikit-learn, RandomForestRegressor
- **AI Integration**: GroqAI
- **Data**: Crop-specific datasets for prediction and recommendations

## Installation

Follow the steps below to set up AgroTech locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/agrotech.git
cd agrotech
```
### 2. Install Backend Dependencies
Navigate to the `backend` folder and install the required dependencies using `pip`:

```bash
cd backend
pip install -r requirements.txt
```
### 3. Start the FastAPI/Flask Backend
To run the backend locally:

```bash
uvicorn main:app --reload
```
### 4. Install Frontend Dependencies
To run the frontend locally:

```bash
cd frontend
npm i
```
### 4. Run the Next.js Website
Start the frontend server

```bash
npm run dev
```
This will start the Next.js app at http://localhost:3000.

### 6. Access the Application

Once both the frontend and backend are running, open your browser and go to `http://localhost:3000` to access the interactive web app.

## Model Overview

- **Crop Recommendation Model**: Uses a Random Forest Regressor to predict crop recommendations based on NPK values, temperature conditions, or season, state, and city data.
- **Disease Prediction Model**: Classifies potato and tomato disease types (blight and bacterial spot) based on visual or environmental data.
- **Crop Yield Prediction Model**: Predicts the yield of crops using historical data and environmental features with a RandomForestRegressor.

### Model Files

- `yield_model.pkl`: Contains the trained Random Forest model for crop yield prediction.
- `crop_recommendation_model.pkl`: Contains the trained model for crop recommendation based on environmental conditions.
- `disease_prediction_model.pkl`: Contains the trained models for potato and tomato disease prediction.

## Features & Use Cases

### 1. Crop Recommendation

- **Input**: NPK values and temperature (or season, state, and city if NPK is unavailable).
- **Output**: Crop suggestions tailored to your environmental conditions.

### 2. Disease Prediction

- **Input**: Crop type and condition (either visual data or environmental indicators).
- **Output**: Disease diagnosis (Potato Blight, Tomato Blight, Tomato Bacterial Spot).

### 3. Crop Yield Prediction

- **Input**: Environmental and crop-specific data.
- **Output**: Predicted crop yield for specific farming conditions.

### 4. GroqAI Recommendations

- **Input**: Crop type and disease information.
- **Output**: AI-powered advice on crop cultivation, disease management, and steps for improving crop health.

### 5. Latest Crop News

- Stay up-to-date with the latest news and trends in agriculture.

## Future Enhancements

- Integration with IoT devices for real-time crop monitoring.
- Mobile app development for broader accessibility.
- Support for additional crop types and diseases.

## Contributing

We welcome contributions to improve AgroTech. If you'd like to help, feel free to open an issue or submit a pull request.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push them to your forked repository.
4. Open a pull request from your branch to the main repository.


