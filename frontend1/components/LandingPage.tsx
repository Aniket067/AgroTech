'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { 
  Menu,
  X,
  Leaf,
  Sprout,
  ScanSearch,
  ChevronRight,
  ArrowDown,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Add Google Fonts
const GoogleFonts = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap');
    
    body {
      font-family: 'Poppins', sans-serif;
    }
    h1, h2, h3, .font-heading {
      font-family: 'Merriweather', serif;
    }
  `}</style>
)

const stepVariants: Variants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f0f7f0]">
      <GoogleFonts />
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-2xl font-semibold text-green-600 font-heading">AgroTech 🌱</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Crop Recommendation', 'Disease Prediction', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                  className="text-gray-600 hover:text-green-600 transition-colors relative group"
                >
                  {item}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-4">
                  {['Home', 'Crop Recommendation', 'Disease Prediction', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                      className="text-gray-600 hover:text-green-600 transition-colors text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-heading">
                Smart Farming for a{' '}
                <span className="text-green-600">Sustainable Future 🌍</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                Transform your agricultural practices with AI-powered recommendations
                and real-time monitoring for optimal crop yields. 🚜🌾
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full">
                Get Started 🚀
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
<img
  src="https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D"
  alt="Smart Farming"
  className="rounded-2xl shadow-2xl"
  style={{ width: '800px' }} // Set the width to 800px
/>

              <div className="absolute -bottom-12 -left-12 text-green-600/20">
                <Leaf className="h-24 w-24" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Crop Recommendation Section */}
      <section id="crop-recommendation" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">Crop Recommendation 🌱</h2>
            <p className="text-xl text-gray-600">Get AI-powered suggestions for optimal crop selection</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sprout className="h-12 w-12" />,
                title: "Soil Analysis",
                description: "Analyze soil composition for ideal crop matching"
              },
              {
                icon: <ScanSearch className="h-12 w-12" />,
                title: "Climate Consideration",
                description: "Factor in local climate data for best crop choices"
              },
              {
                icon: <ChevronRight className="h-12 w-12" />,
                title: "Yield Prediction",
                description: "Estimate potential crop yields based on conditions"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="relative overflow-hidden border-none bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="mb-4 transition-transform group-hover:scale-110 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-heading">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disease Prediction Section */}
      <section id="disease-prediction" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">Disease Prediction 🔬</h2>
            <p className="text-xl text-gray-600">Early detection for healthier crops</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-8 font-heading">How It Works</h3>
              {[
                { number: 1, text: "Upload images of your crops", direction: 'left' },
                { number: 2, text: "Our AI analyzes the images for signs of disease", direction: 'right' },
                { number: 3, text: "Receive detailed reports and treatment recommendations", direction: 'left' },
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  custom={step.direction}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.8 }}
                  variants={stepVariants}
                  className="flex items-start mb-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mr-4">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Step {step.number}</h4>
                    <p className="text-gray-600">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}    
              className="relative"
            >
              <img
                src="https://media.istockphoto.com/id/1373227608/photo/shot-young-scientist-using-a-digital-tablet-while-working-with-crops-on-a-farm.webp?a=1&b=1&s=612x612&w=0&k=20&c=CKZmChL44yPgKwlnvOi8fnup50JzV1DUYt4y-5GBvKc="
                alt="Disease Prediction"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">Contact Us 📬</h2>
            <p className="text-xl text-gray-600">Get in touch with our team of experts</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-green-800 font-heading">AgroTech 🌱</span>
              </div>
              <p className="text-gray-600 mb-4">Turen, Malang East Java, Indonesia</p>
              <p className="text-gray-600">Empowering farmers with smart technology for sustainable agriculture. 🚜🌾</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><button onClick={() => scrollTo('home')} className="text-gray-600 hover:text-green-600 transition-colors">Home 🏠</button></li>
                <li><button onClick={() => scrollTo('crop-recommendation')} className="text-gray-600 hover:text-green-600 transition-colors">Crop Recommendation 🌱</button></li>
                <li><button onClick={() => scrollTo('disease-prediction')} className="text-gray-600 hover:text-green-600 transition-colors">Disease Prediction 🔬</button></li>
                <li><button onClick={() => scrollTo('contact')} className="text-gray-600 hover:text-green-600 transition-colors">Contact 📬</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-6">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-6">Connect</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>Copyright © 2024 AgroTech. All rights reserved. 🌿</p>
          </div>
        </div>
      </footer>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 right-8"
      >
        <button
          onClick={() => scrollTo('home')}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <ArrowDown className="h-6 w-6 transform rotate-180" />
        </button>
      </motion.div>
    </div>
  )
}