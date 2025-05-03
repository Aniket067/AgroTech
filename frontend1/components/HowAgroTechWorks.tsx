'use client';

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sprout, Upload, Leaf, Zap, Droplet, Sun,
  BarChart, LineChart, TrendingUp, Calculator,
  Gauge, Loader, ChevronRight, CloudRain, Check
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Feature prediction modules
const features = [
  {
    id: "crop-recommendation",
    title: "Crop Recommendation",
    description: "Get AI-powered suggestions for crops that will thrive in your specific soil conditions and climate.",
    image: "/farm-background.jpg",
    color: "from-green-600 to-green-500", 
    bgColor: "bg-green-50",
    buttonText: "Get Recommendation",
    formPath: "/crop-recommendation-form",
    steps: [
      { icon: <Sprout className="text-green-600" />, text: "Analyze soil nutrients and pH levels" },
      { icon: <CloudRain className="text-green-600" />, text: "Factor in local climate conditions" },
      { icon: <Check className="text-green-600" />, text: "Receive personalized crop suggestions" }
    ]
  },
  {
    id: "disease-prediction",
    title: "Disease Prediction",
    description: "Identify potential plant diseases early before they damage your crops using computer vision technology.",
    image: "/disease.png",
    color: "from-amber-600 to-amber-500",
    bgColor: "bg-amber-50",
    buttonText: "Detect Diseases",
    formPath: "/disease-recommendation-form",
    steps: [
      { icon: <Zap className="text-amber-600" />, text: "Upload images of affected plants" },
      { icon: <Droplet className="text-amber-600" />, text: "AI analyzes visual symptoms" },
      { icon: <Sun className="text-amber-600" />, text: "Get treatment recommendations" }
    ]
  },
  {
    id: "crop-prediction",
    title: "Crop Prediction",
    description: "Forecast which crops will perform best in upcoming seasons based on historical data and weather patterns.",
    image: "/farm-background2.jpg",
    color: "from-green-700 to-green-600",
    bgColor: "bg-green-50",
    buttonText: "Predict Crop Success",
    formPath: "/crop-prediction",
    steps: [
      { icon: <BarChart className="text-green-700" />, text: "Analyze historical performance data" },
      { icon: <LineChart className="text-green-700" />, text: "Apply seasonal growth models" },
      { icon: <TrendingUp className="text-green-700" />, text: "Generate success probability scores" }
    ]
  },
  {
    id: "yield-prediction",
    title: "Yield Prediction",
    description: "Calculate expected harvest volumes to optimize planning, resource allocation and market preparation.",
    image: "/farm-background3.jpg",
    color: "from-amber-700 to-amber-600",
    bgColor: "bg-amber-50",
    buttonText: "Forecast Yield",
    formPath: "/crop-yield-prediction",
    steps: [
      { icon: <Calculator className="text-amber-700" />, text: "Input current growth metrics" },
      { icon: <Gauge className="text-amber-700" />, text: "Apply advanced yield models" },
      { icon: <TrendingUp className="text-amber-700" />, text: "Project harvest quantities" }
    ]
  }
];

const HowAgroTechWorks = () => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  interface LoadingState {
    [key: string]: boolean;
  }

  interface HandleNavigationParams {
    path: string;
    id: string;
  }

  const handleNavigation = (path: HandleNavigationParams["path"], id: HandleNavigationParams["id"]) => {
    setLoading((prev: LoadingState) => ({ ...prev, [id]: true }));
    setTimeout(() => router.push(path), 800);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-green-50 to-amber-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 -right-64 w-96 h-96 rounded-full bg-green-200 opacity-20 blur-3xl" />
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-amber-200 opacity-20 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 transform ${
                activeFeature === index
                  ? `bg-gradient-to-r ${feature.color} text-white shadow-md hover:shadow-lg scale-105`
                  : 'bg-white/80 backdrop-blur-sm text-green-800 hover:bg-white hover:shadow-md'
              }`}
            >
              {feature.title}
            </button>
          ))}
        </div>

        <div
          key={activeFeature}
          className={`rounded-2xl shadow-xl overflow-hidden ${features[activeFeature].bgColor} transition-all duration-500`}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full min-h-80 overflow-hidden">
              <Image
                src={features[activeFeature].image}
                alt={features[activeFeature].title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Decorative overlay pattern - keeping the subtle pattern but removing the color overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_transparent_20%,_#00000010_20%,_#00000010_21%,_transparent_21%,_transparent_34%,_#00000010_34%,_#00000010_35%,_transparent_35%)] bg-[length:24px_24px]"></div>
            </div>

            <div className="p-8 md:p-10 lg:p-12">
              <div className="space-y-6">
              
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-green-900">
                  {features[activeFeature].title}
                </h3>

                <p className="text-green-700/80 mb-8 leading-relaxed">
                  {features[activeFeature].description}
                </p>

                <div className="space-y-4 mb-8">
                  {features[activeFeature].steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow-sm transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                        {step.icon}
                      </div>
                      <p className="text-green-800 font-medium">{step.text}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <Button
                    className={`bg-gradient-to-r ${features[activeFeature].color} hover:opacity-90 text-white px-6 py-6 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-y-px`}
                    onClick={() => handleNavigation(features[activeFeature].formPath, features[activeFeature].id)}
                    disabled={loading[features[activeFeature].id]}
                  >
                    {loading[features[activeFeature].id] ? (
                      <Loader className="animate-spin mr-2" size={18} />
                    ) : null}
                    <span className="text-base">{features[activeFeature].buttonText}</span>
                    {!loading[features[activeFeature].id] && <ChevronRight size={18} />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {features.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveFeature(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeFeature === idx 
                  ? 'bg-green-600 w-8'
                  : 'bg-green-300 hover:bg-green-400'
              }`}
              aria-label={`Go to feature ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowAgroTechWorks;