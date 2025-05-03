


'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Leaf, LineChart, BarChart } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  const features = [
    {
      icon: <Sprout className="h-12 w-12 mb-4 text-green-600" />,
      title: 'Crop Recommendation',
      description: 'Enter soil properties and receive tailored crop recommendations along with detailed growing instructions.',
      color: 'from-green-600 to-green-500'
    },
    {
      icon: <Leaf className="h-12 w-12 mb-4 text-green-600" />,
      title: 'Disease Prediction',
      description: 'Upload images of plant leaves and get instant AI-powered disease predictions and treatment suggestions.',
      color: 'from-green-600 to-green-500'
    },
    {
      icon: <LineChart className="h-12 w-12 mb-4 text-amber-600" />,
      title: 'Crop Prediction',
      description: 'Use climate data and advanced AI to predict which crops will thrive in upcoming seasons with accuracy.',
      color: 'from-amber-600 to-amber-500'
    },
    {
      icon: <BarChart className="h-12 w-12 mb-4 text-amber-600" />,
      title: 'Yield Prediction',
      description: 'Calculate potential crop yields based on environmental factors, farming practices, and historical data.',
      color: 'from-amber-600 to-amber-500'
    },
  ];

  if (!clientRendered) return null;

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-amber-50 to-green-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-green-50 to-transparent opacity-70" />
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-green-200 opacity-20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-amber-200 opacity-20 blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-16">
          {/* Decorative element */}
          <div className="inline-block mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-amber-500 rounded-full mx-auto" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-green-700 to-green-600">
            Cultivate Success with Our Features
          </h2>
          
          <p className="text-lg text-green-700/80 max-w-2xl mx-auto font-light">
            Discover how AgroTech's intelligent solutions can transform your farming practices for better yields and sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="transform transition-all duration-300 hover:-translate-y-1">
              <Card className="h-full bg-white shadow-md border-0 overflow-hidden rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="h-2 w-full bg-gradient-to-r border-none rounded-t-none outline-none" style={{ backgroundImage: `linear-gradient(to right, #166534, #16a34a)` }} />
                <CardHeader className="pt-8 pb-2">
                  <div className="flex justify-center items-center mb-2">
                    <div className="p-3 rounded-full bg-gradient-to-br from-green-50 to-amber-50 shadow-sm">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl font-semibold text-green-900 mt-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-green-700/70 px-6 py-6 text-base">
                  {feature.description}
                </CardContent>
                <div className="px-6 pb-6 text-center">
                
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
       

          
        
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;