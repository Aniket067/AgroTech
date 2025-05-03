'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'

export default function Footer() {
  // Prevent hydration mismatch with client-side rendering for animations
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const currentYear = new Date().getFullYear()
  
  if (!isClient) {
    // Simple SSR version to prevent hydration mismatch
    return (
      <footer className="bg-gradient-to-b from-green-50 to-green-100 text-green-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-green-600" />
              <span className="text-2xl font-bold text-green-700">AgroTech</span>
            </div>
            <p className="text-sm text-center text-green-600">
              © {currentYear} AgroTech. Nurturing innovation in every seed.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="relative bg-gradient-to-b from-green-50 to-green-100 text-green-800 py-10 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array(12).fill(0).map((_, i) => (
            <div key={i} className="h-full w-px bg-green-300 opacity-30"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            className="flex items-center gap-3 mb-5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-green-100 p-2 rounded-full shadow-sm border border-green-200">
              <Sprout className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              AgroTech
            </span>
          </motion.div>
          
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-60 mb-5"></div>
          
          <p className="text-sm text-center text-green-600">
            © {currentYear} AgroTech. Nurturing innovation in every seed.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}