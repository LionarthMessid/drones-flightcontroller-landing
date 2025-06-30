import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CrypticText = ({ children, className = "" }) => {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);

  const crypticChars = '01XNMZRT#$%&*@!';
  
  useEffect(() => {
    if (!isHovered) {
      setDisplayText(children);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        children
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return children[index];
            }
            return crypticChars[Math.floor(Math.random() * crypticChars.length)];
          })
          .join("")
      );

      if (iteration >= children.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, children]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);

  const ecosystemItems = [
    { name: 'FC-1 CONTROLLER', url: '#', description: 'BEGINNER BOARD' },
    { name: 'FC-PRO CONTROLLER', url: '#', description: 'ADVANCED BOARD' },
    { name: 'FC-MINI CONTROLLER', url: '#', description: 'COMPACT BOARD' },
    { name: 'DOCUMENTATION', url: '#', description: 'TECH SPECS' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 border-2 border-green-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">AQ</span>
              </div>
              <span className="text-xl font-bold text-green-500 tracking-wider">AEROQUE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('programs')}
              className="text-green-500 hover:text-green-300 transition-colors duration-200 cursor-pointer font-bold tracking-wide"
            >
              <CrypticText>CONTROLLERS</CrypticText>
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-green-500 hover:text-green-300 transition-colors duration-200 cursor-pointer font-bold tracking-wide"
            >
              <CrypticText>PRODUCTS</CrypticText>
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-green-500 hover:text-green-300 transition-colors duration-200 cursor-pointer font-bold tracking-wide"
            >
              <CrypticText>FAQ</CrypticText>
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Ecosystem Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsEcosystemOpen(!isEcosystemOpen)}
                className="flex items-center space-x-2 text-green-500 hover:text-green-300 transition-colors duration-200 font-bold tracking-wide"
              >
                <CrypticText>BOARDS</CrypticText>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isEcosystemOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isEcosystemOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-black border-4 border-green-500 shadow-[8px_8px_0px_0px_rgba(0,255,0,0.3)] overflow-hidden"
                  >
                    <div className="p-4 space-y-2">
                      {ecosystemItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.url}
                          className="flex items-center justify-between p-3 border-2 border-gray-700 hover:border-green-500 hover:bg-gray-900 transition-all duration-200 group"
                        >
                          <div>
                            <div className="font-bold text-green-500 tracking-wide">{item.name}</div>
                            <div className="text-sm text-green-300 font-mono">{item.description}</div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 border-2 border-green-500 text-green-500 hover:bg-gray-900 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="lg:hidden bg-black border-t-4 border-green-500"
          >
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('programs')}
                className="block text-green-500 hover:text-green-300 transition-colors duration-200 font-bold tracking-wide"
              >
                CONTROLLERS
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="block text-green-500 hover:text-green-300 transition-colors duration-200 font-bold tracking-wide"
              >
                PRODUCTS
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="block text-green-500 hover:text-green-300 transition-colors duration-200 font-bold tracking-wide"
              >
                FAQ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;