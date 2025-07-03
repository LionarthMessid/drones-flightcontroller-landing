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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b-4 border-emerald-500 shadow-xl shadow-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-400 border-2 border-emerald-300 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <span className="text-slate-900 font-bold text-sm">AQ</span>
              </div>
              <span className="text-xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text tracking-wider">AEROQUE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('programs')}
              className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 cursor-pointer font-bold tracking-wide hover:scale-105 relative group"
            >
              <span className="relative z-10"><CrypticText>CONTROLLERS</CrypticText></span>
              <div className="absolute inset-0 bg-emerald-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></div>
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 cursor-pointer font-bold tracking-wide hover:scale-105 relative group"
            >
              <span className="relative z-10"><CrypticText>PRODUCTS</CrypticText></span>
              <div className="absolute inset-0 bg-emerald-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></div>
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 cursor-pointer font-bold tracking-wide hover:scale-105 relative group"
            >
              <span className="relative z-10"><CrypticText>FAQ</CrypticText></span>
              <div className="absolute inset-0 bg-emerald-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></div>
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Ecosystem Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsEcosystemOpen(!isEcosystemOpen)}
                className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-all duration-300 font-bold tracking-wide hover:scale-105 relative group px-3 py-1"
              >
                <span className="relative z-10"><CrypticText>BOARDS</CrypticText></span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isEcosystemOpen ? 'rotate-180' : ''}`} />
                <div className="absolute inset-0 bg-emerald-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></div>
              </button>

              <AnimatePresence>
                {isEcosystemOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl border-4 border-emerald-500 shadow-2xl shadow-emerald-500/25 overflow-hidden rounded-lg"
                  >
                    <div className="p-4 space-y-2">
                      {ecosystemItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.url}
                          className="flex items-center justify-between p-3 border-2 border-slate-600 hover:border-emerald-400 hover:bg-slate-700/50 transition-all duration-300 group rounded"
                        >
                          <div>
                            <div className="font-bold text-emerald-400 tracking-wide group-hover:text-emerald-300">{item.name}</div>
                            <div className="text-sm text-emerald-200 font-mono">{item.description}</div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
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