

'use client';

import { useState } from 'react';
import { Leaf, Cloud, Droplet, Map, Sun, BarChart, Loader, AlertCircle } from 'lucide-react';

interface PredictionResult {
  predicted_yield: number;
  crop: string;
  state: string;
  season: string;
}

interface FieldError {
  area?: string;
  rainfall?: string;
  fertilizer?: string;
  pesticide?: string;
  crop?: string;
  state?: string;
  season?: string;
}

export default function YieldPrediction() {
  const [formData, setFormData] = useState({
    area: '',
    rainfall: '',
    fertilizer: '',
    pesticide: '',
    crop: '',
    state: '',
    season: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Validation constraints
  const constraints = {
    area: { min: 0.1, max: 1000 },
    rainfall: { min: 0, max: 5000 },
    fertilizer: { min: 0, max: 100 },
    pesticide: { min: 0, max: 50 },
  };

  const validateField = (name: string, value: string): string | undefined => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (['area', 'rainfall', 'fertilizer', 'pesticide'].includes(name)) {
      const numValue = parseFloat(value);
      
      if (isNaN(numValue)) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} must be a number`;
      }
      
      const constraint = constraints[name as keyof typeof constraints];
      if (numValue < constraint.min) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${constraint.min}`;
      }
      
      if (numValue > constraint.max) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} cannot exceed ${constraint.max}`;
      }
    }

    if (['crop', 'state', 'season'].includes(name) && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate on change and clear error if field becomes valid
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FieldError = {};
    let isValid = true;

    // Validate each field
    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof typeof formData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    // Clear previous results and errors
    setResult(null);
    setError('');
    
    // Validate form before submission
    if (!validateForm()) {
      setError('Please correct the errors in the form');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          area: parseFloat(formData.area),
          rainfall: parseFloat(formData.rainfall),
          fertilizer: parseFloat(formData.fertilizer),
          pesticide: parseFloat(formData.pesticide),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);
      setResult(data);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header with farm background */}
        <div className="relative h-48 bg-gradient-to-r from-green-600 to-green-400 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" 
               style={{backgroundImage: "url('/api/placeholder/1200/800')"}}></div>
          <div className="z-10 text-center px-6">
            <h1 className="text-3xl font-bold text-white mb-2">Crop Yield Predictor</h1>
            <p className="text-green-50">Optimize your harvest with precision agriculture</p>
          </div>
        </div>
        
        <div className="p-8">
          {/* Input Form */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              {/* Area Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Area (ha)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map size={18} className="text-green-600" />
                  </div>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Enter field area (0.1-1000)"
                    className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.area ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {fieldErrors.area && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {fieldErrors.area}
                  </p>
                )}
              </div>

              {/* Rainfall Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall (mm)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Cloud size={18} className="text-blue-600" />
                  </div>
                  <input
                    type="text"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    placeholder="Enter rainfall amount (0-5000)"
                    className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.rainfall ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {fieldErrors.rainfall && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {fieldErrors.rainfall}
                  </p>
                )}
              </div>

              {/* Fertilizer Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer (t)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Droplet size={18} className="text-amber-600" />
                  </div>
                  <input
                    type="text"
                    name="fertilizer"
                    value={formData.fertilizer}
                    onChange={handleChange}
                    placeholder="Enter fertilizer amount (0-100)"
                    className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.fertilizer ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {fieldErrors.fertilizer && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {fieldErrors.fertilizer}
                  </p>
                )}
              </div>

              {/* Pesticide Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesticide (t)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Leaf size={18} className="text-green-600" />
                  </div>
                  <input
                    type="text"
                    name="pesticide"
                    value={formData.pesticide}
                    onChange={handleChange}
                    placeholder="Enter pesticide amount (0-50)"
                    className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.pesticide ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {fieldErrors.pesticide && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {fieldErrors.pesticide}
                  </p>
                )}
              </div>

              {/* Crop Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Leaf size={18} className="text-green-700" />
                  </div>
                  <input
                    type="text"
                    name="crop"
                    value={formData.crop}
                    onChange={handleChange}
                    placeholder="Crop (copy from /options)"
                    className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.crop ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {fieldErrors.crop && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {fieldErrors.crop}
                  </p>
                )}
              </div>

              {/* State Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map size={18} className="text-indigo-600" />
                  </div>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.state ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {fieldErrors.state && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {fieldErrors.state}
                  </p>
                )}
              </div>

              {/* Season Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Sun size={18} className="text-yellow-600" />
                  </div>
                  <input
                    type="text"
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    placeholder="Enter season"
                    className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      fieldErrors.season ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {fieldErrors.season && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {fieldErrors.season}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-600 transition duration-300 flex items-center justify-center space-x-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <BarChart size={20} />
                  <span>Predict Yield</span>
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl shadow-inner">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <BarChart className="mr-2" size={20} />
                Prediction Results
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Predicted Yield</p>
                  <p className="text-2xl font-bold text-green-700">{result.predicted_yield.toFixed(2)} t/ha</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Crop</p>
                  <p className="text-lg font-semibold text-gray-800">{result.crop}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">State</p>
                  <p className="text-lg font-semibold text-gray-800">{result.state}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Season</p>
                  <p className="text-lg font-semibold text-gray-800">{result.season}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}