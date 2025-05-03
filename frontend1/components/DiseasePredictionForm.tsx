
// 'use client'

// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { toast, Toaster } from 'sonner'
// import { Upload, Leaf, Loader2, X, AlertCircle, ZapIcon, ScrollText, TabletSmartphone, BadgeCheck } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { predictDisease } from '../lib/api'
// import { getCureFromGroq } from '../lib/groqapi2'

// export default function DiseasePredictionForm() {
//   const [image, setImage] = useState<File | null>(null)
//   const [prediction, setPrediction] = useState<{
//     disease: string | null;
//     cure: string | null;
//     isLoading: boolean;
//   }>({
//     disease: null,
//     cure: null,
//     isLoading: false
//   })
//   const [imageUrl, setImageUrl] = useState<string | null>(null)
//   const [isDragging, setIsDragging] = useState(false)
//   const [activeTab, setActiveTab] = useState("diagnosis")

//   interface PredictionState {
//     disease: string | null;
//     cure: string | null;
//     isLoading: boolean;
//   }

//   const handleImage = (file: File) => {
//     if (file && file.type.startsWith('image/')) {
//       setImage(file)
//       setImageUrl(URL.createObjectURL(file))
//       // Reset results when new image is added
//       setPrediction((prev: PredictionState) => ({ ...prev, disease: null, cure: null }))
//     } else {
//       toast.error("Please select a valid image file")
//     }
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) handleImage(e.target.files[0] as File)
//   }

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     setIsDragging(false)
//     if (e.dataTransfer.files?.[0]) handleImage(e.dataTransfer.files[0] as File)
//   }

//   const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation()
//     setImage(null)
//     setImageUrl(null)
//     setPrediction({ disease: null, cure: null, isLoading: false })
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault()

//     if (!image) {
//       toast.error("Please select an image first")
//       return
//     }

//     setPrediction((prev: PredictionState) => ({ ...prev, isLoading: true }))

//     try {
//       // First API call - disease prediction
//       const response: { predicted_disease: string; error?: string } = await predictDisease(image)

//       if (response.error?.includes("Invalid or non-plant image")) {
//         toast.error("Please upload a clear plant image")
//         setPrediction((prev: PredictionState) => ({ ...prev, isLoading: false }))
//         return
//       }

//       const predictedDisease: string = response.predicted_disease
//       setPrediction((prev: PredictionState) => ({ ...prev, disease: predictedDisease }))
      
//       // Second API call - cure information
//       const cureResponse: string = await getCureFromGroq(predictedDisease)
//       setPrediction((prev: PredictionState) => ({ ...prev, cure: cureResponse, isLoading: false }))
      
//       toast.success("Analysis complete!")
//       // Keep the diagnosis tab active initially
//       setActiveTab("diagnosis")
//     } catch (error: unknown) {
//       console.error("Error:", error)
//       toast.error("Analysis failed. Please try again.")
//       setPrediction((prev: PredictionState) => ({ ...prev, isLoading: false }))
//     }
//   }

//   // Function to format cure instructions with better structure
//   const formatCureInstructions = (cureText: string): JSX.Element => {
//     // Split by newlines or periods followed by spaces
//     const paragraphs = cureText.split(/(?:\.\s+|\n+)/).filter(p => p.trim().length > 0);
    
//     return (
//       <div className="space-y-4">
//         {paragraphs.map((paragraph, index) => {
//           // Check if this looks like a heading (short and ends with :)
//           if (paragraph.length < 60 && paragraph.trim().endsWith(':')) {
//             return <h5 key={index} className="text-emerald-800 font-semibold mt-4">{paragraph}</h5>;
//           }
          
//           // For numbered items
//           if (/^\d+\./.test(paragraph)) {
//             return (
//               <div key={index} className="flex gap-2">
//                 <BadgeCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
//                 <p className="text-emerald-700">{paragraph}</p>
//               </div>
//             );
//           }
          
//           // Regular paragraph
//           return <p key={index} className="text-emerald-700">{paragraph}.</p>;
//         })}
//       </div>
//     );
//   };

//   // Animation variants
//   const resultVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-400 via-green-100 to-lime-200 p-4">
//       <Toaster position="top-center" richColors expand={false} />
      
//       <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-xl rounded-xl border-0">
//         <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-t-xl">
//           <CardTitle className="text-2xl font-medium flex items-center justify-center gap-2">
//             <Leaf className="h-6 w-6" strokeWidth={2.5} />
//             Plant Health Diagnosis
//           </CardTitle>
//           <p className="text-center text-emerald-50 text-sm mt-1">
//             Upload a leaf photo for instant disease detection
//           </p>
//         </CardHeader>
        
//         <CardContent className="p-6 space-y-6">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Upload Area */}
//             <div 
//               className={`relative flex justify-center rounded-lg border-2 border-dashed transition-colors duration-200 ease-in-out h-56
//                 ${isDragging ? 'border-emerald-500 bg-emerald-50' : imageUrl ? 'border-emerald-300' : 'border-gray-200 hover:border-emerald-300'}
//                 ${prediction.isLoading ? 'opacity-75' : 'opacity-100'}`}
//               onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
//               onDragLeave={() => setIsDragging(false)}
//               onDrop={handleDrop}
//             >
//               <label 
//                 htmlFor="file-upload" 
//                 className="relative cursor-pointer w-full h-full flex items-center justify-center"
//               >
//                 {imageUrl ? (
//                   <div className="relative w-full h-full rounded-lg overflow-hidden">
//                     <img 
//                       src={imageUrl} 
//                       alt="Plant preview" 
//                       className="w-full h-full object-cover" 
//                     />
//                     <button
//                       type="button"
//                       onClick={handleRemoveImage}
//                       className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors duration-200"
//                       aria-label="Remove image"
//                     >
//                       <X className="h-4 w-4 text-gray-700" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="text-center px-4">
//                     <Upload className="mx-auto h-10 w-10 text-emerald-400 mb-2" strokeWidth={1.5} />
//                     <p className="text-sm font-medium text-gray-700">
//                       Drag and drop or click to upload
//                     </p>
//                     <p className="mt-1 text-xs text-gray-500">
//                       JPG, PNG or GIF (max 10MB)
//                     </p>
//                   </div>
//                 )}
//                 <input
//                   id="file-upload"
//                   name="file-upload"
//                   type="file"
//                   className="sr-only"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   disabled={prediction.isLoading}
//                 />
//               </label>
//             </div>

//             {/* Submit Button */}
//             <Button 
//               type="submit" 
//               className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
//               disabled={!image || prediction.isLoading}
//             >
//               {prediction.isLoading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <span>Analyzing...</span>
//                 </div>
//               ) : (
//                 'Diagnose Plant'
//               )}
//             </Button>
//           </form>

//           {/* Results Section with Tabs */}
//           {prediction.disease && (
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={resultVariants}
//               className="mt-6"
//             >
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                 <TabsList className="grid grid-cols-2 mb-4">
//                   <TabsTrigger value="diagnosis" className="flex items-center gap-1">
//                     <AlertCircle className="h-4 w-4" />
//                     <span>Diagnosis</span>
//                   </TabsTrigger>
//                   <TabsTrigger value="treatment" className="flex items-center gap-1">
//                     <ZapIcon className="h-4 w-4" />
//                     <span>Treatment</span>
//                   </TabsTrigger>
//                 </TabsList>
                
//                 <TabsContent value="diagnosis" className="mt-0">
//                   <Card className="border border-emerald-100 shadow-sm">
//                     <CardContent className="p-4">
//                       <div className="flex items-start gap-3">
//                         <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
//                           <AlertCircle className="h-5 w-5 text-emerald-700" />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-medium text-emerald-800">Detected Condition</h3>
//                           <div className="mt-1 text-lg font-semibold text-emerald-700">
//                             {prediction.disease}
//                           </div>
                          
//                           <div className="mt-4 flex items-center">
//                             <Button 
//                               variant="outline" 
//                               size="sm" 
//                               onClick={() => setActiveTab("treatment")}
//                               className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
//                             >
//                               <ScrollText className="mr-1 h-4 w-4" />
//                               View Treatment Plan
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
                
//                 <TabsContent value="treatment" className="mt-0">
//                   <Card className="border border-emerald-100 shadow-sm">
//                     <CardContent className="p-4">
//                       <div className="flex items-center gap-2 mb-3">
//                         <TabletSmartphone className="h-5 w-5 text-emerald-600" />
//                         <h3 className="text-lg font-medium text-emerald-800">Treatment Plan</h3>
//                       </div>
                      
//                       <div className="bg-emerald-50 p-4 rounded-lg">
//                         <div className="flex items-center mb-2 pb-2 border-b border-emerald-100">
//                           <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
//                             <Leaf className="h-3 w-3 text-emerald-700" />
//                           </div>
//                           <h4 className="font-medium text-emerald-800">For: {prediction.disease}</h4>
//                         </div>
                        
//                         <div className="prose prose-sm max-w-none text-emerald-800 mt-2">
//                           {prediction.cure && formatCureInstructions(prediction.cure)}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//             </motion.div>
//           )}
//         </CardContent>

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import { Upload, Leaf, Loader2, X, AlertCircle, ZapIcon, ScrollText, TabletSmartphone, BadgeCheck, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { predictDisease } from '../lib/api'
import { getCureFromGroq } from '../lib/groqapi2'

export default function DiseasePredictionForm() {
  const [image, setImage] = useState<File | null>(null)
  const [prediction, setPrediction] = useState<{
    disease: string | null;
    cure: string | null;
    isLoading: boolean;
  }>({
    disease: null,
    cure: null,
    isLoading: false
  })
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState("diagnosis")

  interface PredictionState {
    disease: string | null;
    cure: string | null;
    isLoading: boolean;
  }

  const handleImage = (file: File): void => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      // Reset results when new image is added
      setPrediction((prev: PredictionState) => ({ ...prev, disease: null, cure: null }));
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) handleImage(e.target.files[0])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.[0]) handleImage(e.dataTransfer.files[0])
  }

  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setImage(null)
    setImageUrl(null)
    setPrediction({ disease: null, cure: null, isLoading: false })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      toast.error("Please select an image first")
      return
    }

    setPrediction((prev) => ({ ...prev, isLoading: true }))

    try {
      // First API call - disease prediction
      const response = await predictDisease(image)

      if (response.error?.includes("Invalid or non-plant image")) {
        toast.error("Please upload a clear plant image")
        setPrediction((prev) => ({ ...prev, isLoading: false }))
        return
      }

      const predictedDisease = response.predicted_disease
      setPrediction((prev) => ({ ...prev, disease: predictedDisease }))
      
      // Second API call - cure information
      const cureResponse = await getCureFromGroq(predictedDisease)
      setPrediction((prev) => ({ ...prev, cure: cureResponse, isLoading: false }))
      
      toast.success("Analysis complete!")
      // Keep the diagnosis tab active initially
      setActiveTab("diagnosis")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Analysis failed. Please try again.")
      setPrediction((prev) => ({ ...prev, isLoading: false }))
    }
  }

  // Function to format cure instructions with better structure
  const formatCureInstructions = (cureText) => {
    if (!cureText) return null;
    
    // Split by newlines or periods followed by spaces
    const paragraphs = cureText.split(/(?:\.\s+|\n+)/).filter(p => p.trim().length > 0);
    
    // Group paragraphs by type
    const sections = [];
    let currentSection = { title: null, items: [] };
    
    paragraphs.forEach((paragraph, index) => {
      // Check if this looks like a heading (short and ends with :)
      if (paragraph.length < 60 && paragraph.trim().endsWith(':')) {
        if (currentSection.items.length > 0 || currentSection.title) {
          sections.push({...currentSection});
        }
        currentSection = { title: paragraph, items: [] };
      } else {
        currentSection.items.push(paragraph);
      }
    });
    
    // Add the last section
    if (currentSection.items.length > 0 || currentSection.title) {
      sections.push(currentSection);
    }
    
    return (
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-lg p-5 shadow-sm border border-emerald-100">
            {section.title && (
              <h4 className="text-lg font-semibold text-emerald-800 mb-4 pb-2 border-b border-emerald-100">
                {section.title}
              </h4>
            )}
            
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => {
                // For numbered items
                if (/^\d+\./.test(item)) {
                  return (
                    <div key={itemIndex} className="flex gap-3 items-start">
                      <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                        <BadgeCheck className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="text-emerald-700 flex-1">{item}.</p>
                    </div>
                  );
                }
                
                // Regular paragraph
                return (
                  <div key={itemIndex} className="flex gap-3 items-start">
                    <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                      <Leaf className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="text-emerald-700 flex-1">{item}.</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Animation variants for content transitions
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.2 } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 md:p-8">
      <Toaster position="top-center" richColors expand={false} />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-3">
            <Leaf className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800">Plant Health Diagnosis</h1>
          <p className="mt-2 text-emerald-600 max-w-lg mx-auto">
            Upload a leaf photo for AI-powered disease detection and personalized treatment recommendations
          </p>
        </div>
        
        {/* Main Content - Centered Upload UI */}
        <div className="flex flex-col items-center">
          {/* Upload Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="w-full max-w-md mb-8"
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 py-4 px-6">
                <h2 className="text-xl font-medium text-white flex items-center justify-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Plant Image
                </h2>
              </div>
              
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Upload Area */}
                  <div 
                    className={`relative flex justify-center rounded-lg border-2 border-dashed transition-colors duration-200 ease-in-out h-64
                      ${isDragging ? 'border-emerald-500 bg-emerald-50' : imageUrl ? 'border-emerald-300' : 'border-gray-200 hover:border-emerald-300'}
                      ${prediction.isLoading ? 'opacity-75' : 'opacity-100'}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <label 
                      htmlFor="file-upload" 
                      className="relative cursor-pointer w-full h-full flex items-center justify-center"
                    >
                      {imageUrl ? (
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <img 
                            src={imageUrl} 
                            alt="Plant preview" 
                            className="w-full h-full object-cover" 
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors duration-200"
                            aria-label="Remove image"
                          >
                            <X className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center px-4">
                          <Upload className="mx-auto h-12 w-12 text-emerald-400 mb-3" strokeWidth={1.5} />
                          <p className="text-sm font-medium text-gray-700">
                            Drag and drop or click to upload
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            JPG, PNG or GIF (max 10MB)
                          </p>
                        </div>
                      )}
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/*"
                        disabled={prediction.isLoading}
                      />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
                    disabled={!image || prediction.isLoading}
                  >
                    {prediction.isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Analyzing Plant...</span>
                      </div>
                    ) : (
                      'Diagnose Plant'
                    )}
                  </Button>
                </form>
                
                {/* Instructions */}
                {!prediction.disease && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">For best results:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Take close-up photos of affected leaves</li>
                          <li>Ensure good lighting conditions</li>
                          <li>Include multiple affected areas if possible</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section - Full Width */}
          {prediction.disease && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={resultVariants}
              className="w-full"
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 py-4 px-6">
                  <h2 className="text-xl font-medium text-white flex items-center justify-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Diagnosis Results
                  </h2>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div>
                        <p className="text-sm text-emerald-600 font-medium">Detected Condition</p>
                        <h3 className="text-xl font-bold text-emerald-800">{prediction.disease}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="diagnosis" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6 w-full max-w-md mx-auto">
                      <TabsTrigger value="diagnosis" className="flex items-center justify-center gap-2 py-3">
                        <AlertCircle className="h-4 w-4" />
                        <span>About This Disease</span>
                      </TabsTrigger>
                      <TabsTrigger value="treatment" className="flex items-center justify-center gap-2 py-3">
                        <ZapIcon className="h-4 w-4" />
                        <span>Treatment Plan</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="diagnosis" className="mt-0">
                      <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 max-w-3xl mx-auto">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <Info className="h-5 w-5 text-emerald-700" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-emerald-800 mb-3">About {prediction.disease}</h4>
                            
                            <div className="prose prose-emerald prose-sm max-w-none">
                              <p className="text-emerald-700">
                                This condition affects plant health by damaging leaf tissue and disrupting photosynthesis. 
                                Early detection is crucial to prevent spreading to healthy parts of the plant.
                              </p>
                              
                              <h5 className="font-medium text-emerald-800 mt-4">Common Symptoms:</h5>
                              <ul className="mt-2 space-y-2">
                                <li className="flex items-start gap-2">
                                  <BadgeCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span>Discoloration and spots on leaves</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <BadgeCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span>Wilting or curling of affected leaves</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <BadgeCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span>Stunted growth and reduced yield</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="mt-6">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setActiveTab("treatment")}
                                className="text-emerald-600 border-emerald-200 bg-white hover:bg-emerald-50 hover:text-emerald-700"
                              >
                                <ScrollText className="mr-2 h-4 w-4" />
                                View Treatment Plan
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="treatment" className="mt-0">
                      <div className="bg-gradient-to-b from-emerald-50 to-white rounded-xl p-6 border border-emerald-100">
                        <div className="flex items-center justify-center gap-3 mb-6 pb-4 border-b border-emerald-200">
                          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                            <ZapIcon className="h-6 w-6 text-emerald-700" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-emerald-600 font-medium">Treatment Plan For</p>
                            <h4 className="text-xl font-semibold text-emerald-800">{prediction.disease}</h4>
                          </div>
                        </div>
                        
                        <div className="prose prose-sm max-w-none">
                          {prediction.cure && formatCureInstructions(prediction.cure)}
                        </div>
                        
                        <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100 max-w-3xl mx-auto">
                          <h5 className="flex items-center text-emerald-800 font-medium gap-2 mb-3">
                            <TabletSmartphone className="h-4 w-4 text-emerald-600" />
                            Monitoring Tips
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <div className="flex items-start gap-2">
                                <BadgeCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0" />
                                <span className="text-emerald-700">Check plants weekly for signs of disease recurrence</span>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <div className="flex items-start gap-2">
                                <BadgeCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0" />
                                <span className="text-emerald-700">Take preventive measures during high humidity periods</span>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <div className="flex items-start gap-2">
                                <BadgeCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0" />
                                <span className="text-emerald-700">Consider uploading follow-up images in 14 days to track recovery</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-emerald-600 text-sm opacity-80">
          Powered by AI-based plant pathology detection • Always consult with a professional for serious issues
        </div>
      </div>
    </div>
  )
}
//       </Card>
//     </div>
//   )
// }