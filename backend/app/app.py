



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import pandas as pd
# import numpy as np
# import cv2
# from tensorflow.keras.models import load_model
# import os

# # ------------------------
# # 🧠 Custom Decision Tree Classes
# # ------------------------

# class Question:
#     def __init__(self, column, value):
#         self.column = column
#         self.value = value

#     def match(self, example):
#         val = example[self.column]
#         return val == self.value

# class Decision_Node:
#     def __init__(self, question=None, true_branch=None, false_branch=None, predictions=None):
#         self.question = question
#         self.true_branch = true_branch
#         self.false_branch = false_branch
#         self.predictions = predictions

# class Leaf:
#     def __init__(self, predictions):
#         self.predictions = predictions

# # ------------------------
# # 🚀 Initialize Flask App
# # ------------------------

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Load models and scalers
# crop_model = joblib.load('models/best_crop_recommendation_model.pkl')
# scaler = joblib.load('models/scaler.pkl')
# label_encoder = joblib.load('models/label_encoder.pkl')
# disease_model = load_model('models/final_plant_disease_model.keras')
# decision_tree_model = joblib.load('models/decision_tree_model.pkl')  # Custom decision tree model

# # Load class names for disease prediction
# with open('models/class_names.pkl', 'rb') as f:
#     class_names = joblib.load(f)

# # ------------------------
# # 🌿 Plant Image Check Utility
# # ------------------------

# def is_plant_image(img):
#     hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
#     lower_green = np.array([35, 40, 40])
#     upper_green = np.array([85, 255, 255])
#     mask = cv2.inRange(hsv_img, lower_green, upper_green)
#     green_pixels = cv2.countNonZero(mask)
#     total_pixels = img.shape[0] * img.shape[1]
#     green_ratio = green_pixels / total_pixels
#     return green_ratio > 0.2

# # ------------------------
# # 📊 Decision Tree Helpers
# # ------------------------

# def print_leaf(counts, top_n=4):
#     total = sum(counts.values()) * 1.0
#     probs = {}
    
#     # Calculate the percentage for each crop
#     for lbl in counts.keys():
#         probs[lbl] = counts[lbl] / total * 100
    
#     # Sort the crops by percentage (descending order) and select the top N
#     sorted_probs = sorted(probs.items(), key=lambda x: x[1], reverse=True)[:top_n]
    
#     # Extract only the crop names (without percentages)
#     top_crops = [crop for crop, _ in sorted_probs]
    
#     return top_crops


# def classify(row, node):
#     if hasattr(node, 'predictions'):
#         return node.predictions
#     if node.question.match(row):
#         return classify(row, node.true_branch)
#     else:
#         return classify(row, node.false_branch)

# # ------------------------
# # 🚜 Crop Recommendation by Soil + Weather
# # ------------------------

# @app.route('/api/recommend_crop', methods=['POST'])
# def recommend_crop():
#     try:
#         data = request.json
#         if not data:
#             return jsonify({'error': 'No input data provided'}), 400

#         input_data = pd.DataFrame([data])
#         expected_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
#         input_data = input_data.reindex(columns=expected_columns, fill_value=0)

#         input_scaled = scaler.transform(input_data)
#         predicted_label_encoded = crop_model.predict(input_scaled)
#         predicted_label = label_encoder.inverse_transform(predicted_label_encoded)
#         predicted_crop = predicted_label[0].lower()

#         return jsonify({'predicted_crop': predicted_crop})
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# # ------------------------
# # 🌱 Plant Disease Detection from Image
# # ------------------------

# @app.route('/api/predict_disease', methods=['POST'])
# def predict_disease():
#     try:
#         if 'image' not in request.files:
#             return jsonify({'error': 'No image file provided'}), 400

#         file = request.files['image']
#         image_path = 'temp.jpg'
#         file.save(image_path)

#         img = cv2.imread(image_path)
#         if img is None:
#             os.remove(image_path)
#             return jsonify({'error': 'The uploaded file is not a valid image.'}), 400
#         if not is_plant_image(img):
#             os.remove(image_path)
#             return jsonify({'error': 'The image is either not clear or not a plant image.'}), 400

#         img_resized = cv2.resize(img, (128, 128))
#         img_array = np.expand_dims(img_resized, axis=0) / 255.0
#         predictions = disease_model.predict(img_array)
#         predicted_class = np.argmax(predictions)
#         predicted_label = class_names[predicted_class]

#         os.remove(image_path)
#         return jsonify({'predicted_disease': predicted_label})
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# # ------------------------
# # 📍 Predict Crop Based on Region (State + District + Season)
# # ------------------------

# @app.route('/api/predict_crop_region', methods=['POST'])
# def predict_crop_region():
#     try:
#         data = request.json
#         if not data:
#             return jsonify({'error': 'No input data provided'}), 400

#         state = data.get('State_Name')
#         district = data.get('District_Name')
#         season = data.get('Season')

#         if not all([state, district, season]):
#             return jsonify({'error': 'Missing one or more required fields: State_Name, District_Name, Season'}), 400

#         test_row = [state, district, season, "Unknown"]
#         prediction = classify(test_row, decision_tree_model)
#         predicted_crop = print_leaf(prediction)

#         return jsonify({
#             'input': {
#                 'State_Name': state,
#                 'District_Name': district,
#                 'Season': season
#             },
#             'predicted_crop_distribution': predicted_crop
#         })
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


# # ------------------------
# # 🏁 Run the Server
# # ------------------------

# if __name__ == '__main__':
#     app.run(debug=True)




from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import os

# ------------------------
# 🧠 Custom Decision Tree Classes
# ------------------------

class Question:
    def __init__(self, column, value):
        self.column = column
        self.value = value

    def match(self, example):
        val = example[self.column]
        return val == self.value

class Decision_Node:
    def __init__(self, question=None, true_branch=None, false_branch=None, predictions=None):
        self.question = question
        self.true_branch = true_branch
        self.false_branch = false_branch
        self.predictions = predictions

class Leaf:
    def __init__(self, predictions):
        self.predictions = predictions

# ------------------------
# 🚀 Initialize Flask App
# ------------------------

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load models and scalers
crop_model = joblib.load('models/best_crop_recommendation_model.pkl')
scaler = joblib.load('models/scaler.pkl')
label_encoder = joblib.load('models/label_encoder.pkl')
disease_model = load_model('models/final_plant_disease_model.keras')
decision_tree_model = joblib.load('models/decision_tree_model.pkl')

# Load class names
with open('models/class_names.pkl', 'rb') as f:
    class_names = joblib.load(f)

# Load yield prediction model and columns
yield_model, yield_input_columns = joblib.load('models/yield_model.pkl')

# ------------------------
# 🌿 Plant Image Check Utility
# ------------------------

def is_plant_image(img):
    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    lower_green = np.array([35, 40, 40])
    upper_green = np.array([85, 255, 255])
    mask = cv2.inRange(hsv_img, lower_green, upper_green)
    green_pixels = cv2.countNonZero(mask)
    total_pixels = img.shape[0] * img.shape[1]
    green_ratio = green_pixels / total_pixels
    return green_ratio > 0.2

# ------------------------
# 📊 Decision Tree Helpers
# ------------------------

def print_leaf(counts, top_n=4):
    total = sum(counts.values()) * 1.0
    probs = {}
    for lbl in counts.keys():
        probs[lbl] = counts[lbl] / total * 100
    sorted_probs = sorted(probs.items(), key=lambda x: x[1], reverse=True)[:top_n]
    top_crops = [crop for crop, _ in sorted_probs]
    return top_crops

def classify(row, node):
    if hasattr(node, 'predictions'):
        return node.predictions
    if node.question.match(row):
        return classify(row, node.true_branch)
    else:
        return classify(row, node.false_branch)

# ------------------------
# 🚜 Crop Recommendation by Soil + Weather
# ------------------------

@app.route('/api/recommend_crop', methods=['POST'])
def recommend_crop():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        input_data = pd.DataFrame([data])
        expected_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        input_data = input_data.reindex(columns=expected_columns, fill_value=0)

        input_scaled = scaler.transform(input_data)
        predicted_label_encoded = crop_model.predict(input_scaled)
        predicted_label = label_encoder.inverse_transform(predicted_label_encoded)
        predicted_crop = predicted_label[0].lower()

        return jsonify({'predicted_crop': predicted_crop})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------------
# 🌱 Plant Disease Detection from Image
# ------------------------

@app.route('/api/predict_disease', methods=['POST'])
def predict_disease():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        file = request.files['image']
        image_path = 'temp.jpg'
        file.save(image_path)

        img = cv2.imread(image_path)
        if img is None:
            os.remove(image_path)
            return jsonify({'error': 'The uploaded file is not a valid image.'}), 400
        if not is_plant_image(img):
            os.remove(image_path)
            return jsonify({'error': 'The image is either not clear or not a plant image.'}), 400

        img_resized = cv2.resize(img, (128, 128))
        img_array = np.expand_dims(img_resized, axis=0) / 255.0
        predictions = disease_model.predict(img_array)
        predicted_class = np.argmax(predictions)
        predicted_label = class_names[predicted_class]

        os.remove(image_path)
        return jsonify({'predicted_disease': predicted_label})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------------
# 📍 Predict Crop Based on Region (State + District + Season)
# ------------------------

@app.route('/api/predict_crop_region', methods=['POST'])
def predict_crop_region():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        state = data.get('State_Name')
        district = data.get('District_Name')
        season = data.get('Season')

        if not all([state, district, season]):
            return jsonify({'error': 'Missing one or more required fields: State_Name, District_Name, Season'}), 400

        test_row = [state, district, season, "Unknown"]
        prediction = classify(test_row, decision_tree_model)
        predicted_crop = print_leaf(prediction)

        return jsonify({
            'input': {
                'State_Name': state,
                'District_Name': district,
                'Season': season
            },
            'predicted_crop_distribution': predicted_crop
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------------
# 🌾 Crop Yield Prediction
# ------------------------

@app.route('/api/predict_yield', methods=['POST'])
def predict_yield():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Construct input data frame
        input_df = pd.DataFrame([data])
        input_df = input_df.reindex(columns=yield_input_columns, fill_value=0)

        # Predict
        prediction = yield_model.predict(input_df)[0]
        return jsonify({
            'predicted_yield': round(prediction, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------------
# 🏁 Run the Server
# ------------------------

if __name__ == '__main__':
    app.run(debug=True)
