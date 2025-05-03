// // lib/api.ts
// import axios from 'axios';

// const FLASK_BASE_URL = 'http://127.0.0.1:5000';

// interface CropData {
//   N: number;
//   P: number;
//   K: number;
//   temperature: number;
//   humidity: number;
//   ph: number;
//   rainfall: number;
// }

// export async function recommendCrop(data: CropData) {
//   try {
//     const response = await axios.post(`${FLASK_BASE_URL}/api/recommend_crop`, data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error recommending crop:", error);
//     throw error;
//   }
// }

// export async function predictDisease(imageFile: File) {
//   const formData = new FormData();
//   formData.append('image', imageFile);

//   try {
//     const response = await axios.post(`${FLASK_BASE_URL}/api/predict_disease`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error predicting disease:", error);
//     throw error;
//   }
// }

// interface CropPredictionData {
//   State_Name: string;
//   District_Name: string;
//   Season: string;
// }

// export async function recommendCrop2(data: CropPredictionData) {
//   try {
//     const response = await axios.post(`${FLASK_BASE_URL}/api/predict_crop_region`, data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error recommending crop:", error);
//     throw error;
//   }
// }

import axios from 'axios';

const FLASK_BASE_URL = 'http://127.0.0.1:5000';

// Interfaces for various API requests

interface CropData {
  area: number;
  rainfall: number;
  fertilizer: number;
  pesticide: number;
  crop: string;
  state: string;
  season: string;
}

export async function recommendCrop(data: CropData) {
  try {
    const response = await axios.post(`${FLASK_BASE_URL}/api/recommend_crop`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error recommending crop:", error);
    throw error;
  }
}

export async function predictDisease(imageFile: File) {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post(`${FLASK_BASE_URL}/api/predict_disease`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error predicting disease:", error);
    throw error;
  }
}

interface CropPredictionData {
  State_Name: string;
  District_Name: string;
  Season: string;
}

export async function recommendCrop2(data: CropPredictionData) {
  try {
    const response = await axios.post(`${FLASK_BASE_URL}/api/predict_crop_region`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error recommending crop based on region:", error);
    throw error;
  }
}

// Interface for crop yield prediction data
interface YieldPredictionData {
  area: number;
  rainfall: number;
  fertilizer: number;
  pesticide: number;
  crop: string;
  state: string;
  season: string;
}

export async function predictYield(data: YieldPredictionData) {
  try {
    const response = await axios.post(`${FLASK_BASE_URL}/api/predict_yield`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error predicting yield:", error);
    throw error;
  }
}
