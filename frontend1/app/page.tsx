'use client';

import { useRef } from 'react';
import ContactForm from "@/components/ContactForm";

import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CropNews from "@/components/CropNews";
import FeaturesSection from '@/components/FeaturesSection';
import HowAgroTechWorks from '@/components/HowAgroTechWorks';



export default function Home() {
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    cropRecommendation: useRef<HTMLElement>(null),
    diseasePrediction: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const scrollTo = (id: 'home' | 'cropRecommendation' | 'diseasePrediction' | 'contact') => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <section ref={sectionRefs.home}>
        <HeroSection />
      </section>
      <FeaturesSection />
      <HowAgroTechWorks />


      <CropNews />
      <section ref={sectionRefs.contact}>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
