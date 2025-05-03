


'use client';

import { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Features', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { name: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-gradient-to-r from-green-50/90 to-amber-50/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(167, 243, 208, 0.2)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-2 group"
          >
            {/* Logo icon */}
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-500 rounded-lg shadow-lg transform group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
            
            {/* Logo text */}
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-green-600 to-green-700 tracking-tight">
                AgroTech
              </span>
              <span className="text-xs text-amber-700 font-medium -mt-1">Farming Smarter</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className={`relative px-4 py-2 mx-1 rounded-full font-medium transition-all duration-300 group }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.name);
                }}
              >
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span>{item.name}</span>
                </div>
                
             
        
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  activeItem === item.name ? 'opacity-0' : 'opacity-100'
                }`}></span>
              </a>
            ))}
            
      
          
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-green-700 hover:text-green-900 hover:bg-green-100/70 focus:outline-none transition-colors duration-300"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute block w-6 h-0.5 bg-green-700 transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                <span 
                  className={`absolute block w-6 h-0.5 bg-green-700 transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute block w-6 h-0.5 bg-green-700 transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-gradient-to-b from-green-50/95 to-amber-50/95 backdrop-blur-md border-t border-green-100">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.name.toLowerCase()}`}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeItem === item.name
                  ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-l-4 border-green-500 pl-3'
                  : 'text-green-700 hover:bg-green-100/50'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem(item.name);
                setIsMenuOpen(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span>{item.name}</span>
            </a>
          ))}
          
          {/* Mobile CTA */}
          <div className="mt-4 pt-4 border-t border-green-100">
            <a
              href="#get-started"
              className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;