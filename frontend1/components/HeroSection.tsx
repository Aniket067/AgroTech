'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 to-amber-50">
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0">
        <div className="grid-background" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/10 via-transparent to-amber-50/20" />

      {/* Sun effect */}
      <div
        className="absolute rounded-full bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-200 blur-3xl opacity-60"
        style={{
          width: '40rem',
          height: '40rem',
          top: '-15rem',
          right: '-5rem',
        }}
      />

      {/* Main content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-green-600 to-amber-500 rounded-full mb-10" />

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-green-600 to-green-700 relative"
          style={{
            textShadow: '0 1px 0 rgba(0,0,0,0.1)',
          }}
        >
          Grow Smarter with AgroTech
        </h1>

        <p className="mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl text-green-700 max-w-4xl mx-auto leading-relaxed font-light">
          Revolutionize your farming with AI-powered crop recommendations and intelligent disease prediction.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <Button
            size="lg"
            className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-200/50 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform group-hover:skew-x-12 group-hover:translate-x-full transition-all duration-500"></span>
            <span className="relative z-10 flex items-center">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Button>
        
        </div>
      </div>

      {/* Background grid animation styles */}
      <style jsx>{`
        .grid-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(16, 145, 85, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 145, 85, 0.1) 1px, transparent 1px);
          animation: grid-pulse 15s infinite linear;
        }

        @keyframes grid-pulse {
          0% {
            opacity: 0.5;
            background-size: 50px 50px;
          }
          50% {
            opacity: 0.8;
            background-size: 55px 55px;
          }
          100% {
            opacity: 0.5;
            background-size: 50px 50px;
          }
        }

        @media (max-width: 768px) {
          .grid-background {
            background-size: 30px 30px;
          }
          @keyframes grid-pulse {
            0% {
              opacity: 0.7;
              background-size: 30px 30px;
            }
            50% {
              opacity: 1;
              background-size: 35px 35px;
            }
            100% {
              opacity: 0.7;
              background-size: 30px 30px;
            }
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
