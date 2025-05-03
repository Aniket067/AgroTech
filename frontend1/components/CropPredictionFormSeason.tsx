// // components/CropPredictionForm.tsx
// 'use client';

// import { useState } from 'react';
// import { recommendCrop2 } from '@/lib/api';

// export default function CropPredictionForm() {
//   const [formData, setFormData] = useState({
//     State_Name: '',
//     District_Name: '',
//     Season: '',
//   });

//   const [result, setResult] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     try {
//       const response = await recommendCrop2(formData);
//       setResult(response.predicted_crop);
//     } catch (err) {
//       setError('Failed to predict crop. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Predict Crop Based on Region</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">State Name</label>
//           <input
//             type="text"
//             name="State_Name"
//             value={formData.State_Name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">District Name</label>
//           <input
//             type="text"
//             name="District_Name"
//             value={formData.District_Name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Season</label>
//           <select
//             name="Season"
//             value={formData.Season}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">Select a Season</option>
//             <option value="Kharif">Kharif</option>
//             <option value="Rabi">Rabi</option>
//             <option value="Summer">Summer</option>
//             <option value="Winter">Winter</option>
//             <option value="Whole Year">Whole Year</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
//         >
//           {loading ? 'Predicting...' : 'Predict Crop'}
//         </button>
//       </form>

//       {result && (
//         <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
//           <strong>Recommended Crop:</strong> {result}
//         </div>
//       )}

//       {error && (
//         <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }
