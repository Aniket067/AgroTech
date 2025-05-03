import { recommendCrop2 } from "@/lib/api";
import { useState } from "react";
import { Leaf, MapPin, Calendar, Search, AlertCircle, ChevronRight, ArrowRight } from "lucide-react";

interface CropPredictionFormProps {}

const CropPredictionForm: React.FC<CropPredictionFormProps> = () => {
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [predictedCrops, setPredictedCrops] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  const seasons = ["Kharif", "Rabi", "Whole Year", "Summer", "Winter"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const data = await recommendCrop2({ 
        State_Name: state, 
        District_Name: district, 
        Season: season 
      });
      setPredictedCrops(data.predicted_crop_distribution);
      setShowResults(true);
    } catch (error) {
      setError("Failed to fetch predictions. Please try again.");
      console.error("Error recommending crop:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setState("");
    setDistrict("");
    setSeason("");
    setPredictedCrops([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-green-100" />
              <h1 className="text-2xl font-bold">Recommended Crops</h1>
            </div>
            <button 
              onClick={resetForm}
              className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full flex items-center space-x-2 transition-all"
            >
              <span>New Search</span>
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>{state}, {district}</span>
            </div>
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{season} Season</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {predictedCrops.length > 0 ? (
            <div className="space-y-6">
              <div className="bg-green-100 p-5 rounded-xl border-l-4 border-green-500">
                <h2 className="text-lg font-semibold text-green-800 mb-1">Top Recommendation</h2>
                <div className="text-2xl font-bold text-green-700 flex items-center">
                  <Leaf className="h-6 w-6 mr-2 text-green-600" />
                  {predictedCrops[0]}
                </div>
                <p className="mt-2 text-green-600 text-sm">
                  Based on historical data, this crop has the highest success rate in your region during {season.toLowerCase()} season.
                </p>
              </div>
              
              {predictedCrops.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Alternative Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {predictedCrops.slice(1).map((crop, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <Leaf className="h-5 w-5 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-800">{crop}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Pro Tips
                </h3>
                <ul className="mt-2 text-sm text-blue-700 space-y-1">
                  <li>• Consider your soil type and local water availability before finalizing</li>
                  <li>• Consult with local agricultural extension services for specific advice</li>
                  <li>• Monitor weather forecasts for the upcoming season</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-yellow-50 inline-flex p-4 rounded-full mb-4">
                <AlertCircle className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No crops found</h3>
              <p className="text-gray-500 mt-2">Please try another location or season</p>
              <button
                onClick={resetForm}
                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Crop Recommendation</h1>
            <p className="text-green-100 text-sm mt-1">
              Discover the ideal crops for your location and season
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  placeholder="Enter your state"
                  className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                  placeholder="Enter your district"
                  className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Growing Season
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                required
                className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white"
              >
                <option value="" disabled>Select a growing season</option>
                {seasons.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-4 rounded-xl flex items-center justify-center space-x-3 ${
              isLoading 
                ? "bg-green-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-green-300"
            } text-white font-medium transition-all`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Finding Optimal Crops...</span>
              </>
            ) : (
              <>
                <span>Find Optimal Crops</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
          
          <div className="text-center text-sm text-gray-500 pt-2">
            Based on historical crop data and regional growing patterns
          </div>
        </form>
      </div>
    </div>
  );
};

export default CropPredictionForm;