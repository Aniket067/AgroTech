// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { Leaf, Droplet, Thermometer, Wind, Beaker } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { recommendCrop } from '../lib/api';
// import { getGrowingInstructions } from '../lib/groqapi';

// interface FormData {
//   N: number;
//   P: number;
//   K: number;
//   temperature: number;
//   humidity: number;
//   ph: number;
//   rainfall: number;
// }

// const inputFields = [
//   { name: 'N', label: 'Nitrogen', icon: Leaf },
//   { name: 'P', label: 'Phosphorus', icon: Leaf },
//   { name: 'K', label: 'Potassium', icon: Leaf },
//   { name: 'temperature', label: 'Temperature', icon: Thermometer, min: 10, max: 50 },
//   { name: 'humidity', label: 'Humidity', icon: Wind, min: 10, max: 90 },
//   { name: 'ph', label: 'pH', icon: Beaker, min: 3, max: 9 },
//   { name: 'rainfall', label: 'Rainfall', icon: Droplet, min: 2, max: 500 },
// ];

// export default function CropRecommendationForm() {
//   const [formData, setFormData] = useState<Partial<FormData>>({});
//   const [result, setResult] = useState<string | null>(null);
//   const [instructions, setInstructions] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetchingInstructions, setIsFetchingInstructions] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: parseFloat(value),
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await recommendCrop(formData as FormData);
//       const capitalizedResult =
//         response.predicted_crop.charAt(0).toUpperCase() + response.predicted_crop.slice(1);
//       setResult(capitalizedResult);

//       if (response.predicted_crop) {
//         setIsFetchingInstructions(true);
//         const growthInfo = await getGrowingInstructions(response.predicted_crop);
//         setInstructions(growthInfo.instruction || 'No instructions available.');
//         setIsFetchingInstructions(false);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   function renderInstructions(instructions: string): React.ReactNode {
//     const sections = instructions.split(/\*\*(.*?)\*\*/g); // Split by bold sections

//     return sections.map((section, index) => {
//       if (section.match(/^\d+\.\s/)) {
//         return (
//           <div key={index} className="mt-6">
//             <h3 className="text-xl font-bold text-green-700 mb-2">{section}</h3>
//           </div>
//         );
//       } else if (section.includes('*')) {
//         const items = section
//           .split('*')
//           .filter((item) => item.trim())
//           .map((item, i) => (
//             <li key={i} className="text-gray-700 list-disc ml-6 mb-1">
//               {item.trim()}
//             </li>
//           ));
//         return <ul key={index}>{items}</ul>;
//       } else if (section.trim()) {
//         return (
//           <p key={index} className="text-gray-800 mb-4 leading-relaxed">
//             {section.trim()}
//           </p>
//         );
//       }
//       return null;
//     });
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto">
//         <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
//             <CardTitle className="text-3xl font-bold text-center">Crop Recommendation</CardTitle>
//           </CardHeader>
//           <CardContent className="p-6">
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {inputFields.map(({ name, label, icon: Icon, min, max }) => (
//                 <div key={name} className="flex flex-col space-y-2">
//                   <Label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center">
//                     <Icon className="w-4 h-4 mr-2" />
//                     {label}
//                   </Label>
//                   <Input
//                     type="number"
//                     id={name}
//                     name={name}
//                     value={formData[name as keyof FormData] || ''}
//                     onChange={handleChange}
//                     placeholder={`Enter ${label}`}
//                     className="rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
//                     min={min}
//                     max={max}
//                     step={name === 'ph' ? '0.1' : '1'}
//                     required
//                   />
//                 </div>
//               ))}
//               <div className="md:col-span-2 flex justify-center mt-6">
//                 <Button
//                   type="submit"
//                   className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Analyzing...' : 'Get Recommendation'}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>

//         {result && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mt-8"
//           >
//             <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
//               <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
//                 <CardTitle className="text-2xl font-bold text-center">Recommended Crop</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="relative aspect-video rounded-lg overflow-hidden">
//                   <Image
//                     src={`/crops/${result.toLowerCase()}.jpg`}
//                     alt={result}
//                     fill
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                     style={{ objectFit: 'cover' }}
//                     className="rounded-lg"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                     <h3 className="text-4xl font-bold text-white">{result}</h3>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}

//         {isFetchingInstructions ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mt-8"
//           >
//             <Card className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
//               <CardContent className="p-6 text-center">
//                 <p className="text-lg text-gray-600">Loading instructions...</p>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ) : instructions && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mt-8"
//           >
//             <Card className="w-full mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
//               <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
//                 <CardTitle className="text-2xl font-bold text-center">Growing Instructions</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="space-y-4 leading-relaxed text-base">
//                   {renderInstructions(instructions)}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Leaf, Droplet, Thermometer, Wind, Beaker, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { recommendCrop } from '../lib/api';
import { getGrowingInstructions } from '../lib/groqapi';

interface FormData {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

const inputFields = [
  { name: 'N', label: 'Nitrogen', icon: Leaf, color: 'text-emerald-600', min: 0, max: 140 },
  { name: 'P', label: 'Phosphorus', icon: Leaf, color: 'text-green-600', min: 5, max: 145 },
  { name: 'K', label: 'Potassium', icon: Leaf, color: 'text-lime-600', min: 5, max: 205 },
  { name: 'temperature', label: 'Temperature', icon: Thermometer, color: 'text-amber-600', min: 10, max: 50 },
  { name: 'humidity', label: 'Humidity', icon: Wind, color: 'text-blue-600', min: 10, max: 90 },
  { name: 'ph', label: 'pH', icon: Beaker, color: 'text-purple-600', min: 3, max: 9 },
  { name: 'rainfall', label: 'Rainfall', icon: Droplet, color: 'text-sky-600', min: 2, max: 500 },
];

export default function CropRecommendationForm() {
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [result, setResult] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingInstructions, setIsFetchingInstructions] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await recommendCrop(formData as FormData);
      const capitalizedResult =
        response.predicted_crop.charAt(0).toUpperCase() + response.predicted_crop.slice(1);
      setResult(capitalizedResult);

      if (response.predicted_crop) {
        setIsFetchingInstructions(true);
        const growthInfo = await getGrowingInstructions(response.predicted_crop);
        setInstructions(growthInfo.instruction || 'No instructions available.');
        setIsFetchingInstructions(false);
        setActiveTab('result');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function renderInstructions(instructions: string): React.ReactNode {
    const sections = instructions.split(/\*\*(.*?)\*\*/g); // Split by bold sections

    return sections.map((section, index) => {
      if (section.match(/^\d+\.\s/)) {
        return (
          <div key={index} className="mt-6">
            <h3 className="text-xl font-bold text-emerald-700 mb-2">{section}</h3>
          </div>
        );
      } else if (section.includes('*')) {
        const items = section
          .split('*')
          .filter((item) => item.trim())
          .map((item, i) => (
            <li key={i} className="text-gray-600 list-disc ml-6 mb-1">
              {item.trim()}
            </li>
          ));
        return <ul key={index}>{items}</ul>;
      } else if (section.trim()) {
        return (
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {section.trim()}
          </p>
        );
      }
      return null;
    });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center justify-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-1 mb-4">
            <Leaf className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Smart Agriculture</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">Crop Recommendation</h1>
          <p className="text-lg text-gray-600 max-w-md text-center">
            Get personalized crop suggestions based on your soil and weather conditions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="form" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">Input Parameters</TabsTrigger>
            <TabsTrigger value="result" disabled={!result} className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">Recommendation</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card className="border-none shadow-lg rounded-xl overflow-hidden bg-white">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inputFields.map(({ name, label, icon: Icon, color, min, max }) => (
                      <div key={name} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                        <div className="relative bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow transition-all duration-300">
                          <Label htmlFor={name} className={`flex items-center ${color} mb-2 font-medium`}>
                            <Icon className="w-4 h-4 mr-2" strokeWidth={2.5} />
                            {label}
                          </Label>
                          <Input
                            type="number"
                            id={name}
                            name={name}
                            value={formData[name as keyof FormData] || ''}
                            onChange={handleChange}
                            placeholder={`Enter ${label}`}
                            className="mt-1 rounded-md border-gray-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                            min={min}
                            max={max}
                            step={name === 'ph' ? '0.1' : '1'}
                            required
                          />
                          <div className="mt-1 text-xs text-gray-500 flex justify-between">
                            <span>{min}</span>
                            <span>{max}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-8">
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-8 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 flex items-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Skeleton className="h-5 w-5 rounded-full animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Recommendation</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="result">
            {result && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-none shadow-lg rounded-xl overflow-hidden bg-white relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-green-500" />
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative aspect-square rounded-xl overflow-hidden w-full md:w-1/3 shadow-lg">
                          <Image
                            src={`/crops/${result.toLowerCase()}.jpg`}
                            alt={result}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="inline-flex items-center justify-center bg-emerald-100 text-emerald-800 rounded-full px-3 py-1 mb-3">
                            <span className="text-sm font-medium">Recommended</span>
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-4">{result}</h2>
                          {isFetchingInstructions ? (
                            <div className="space-y-3">
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-2/3" />
                              <Skeleton className="h-4 w-5/6" />
                            </div>
                          ) : (
                            <div className="prose prose-emerald max-w-none text-gray-700">
                              {instructions && renderInstructions(instructions.split('.')[0] + '.')}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {instructions && !isFetchingInstructions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="border-none shadow-lg rounded-xl overflow-hidden bg-white">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-green-500" />
                      <CardHeader className="pb-0 pt-8 px-8">
                        <CardTitle className="text-2xl font-bold text-gray-900">Growing Guide</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 pt-4">
                        <div className="prose prose-emerald max-w-none">
                          {renderInstructions(instructions)}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
                
                <div className="flex justify-center mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('form')}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Back to Form
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}