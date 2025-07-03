import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CrypticText = ({ children, className = "" }: { children: string; className?: string }) => {
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
      setDisplayText((prev: string) => 
        children
          .split("")
          .map((letter: string, index: number) => {
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
    { name: 'FLIGHT SIMULATOR', url: '#simulation', description: 'DRONE SIMULATION' },
    { name: 'VERSION A SPECS', url: '#controller-board', description: 'STANDARD EDITION' },
    { name: 'VERSION B SPECS', url: '#controller-board', description: 'PROFESSIONAL EDITION' },
    { name: 'DEVELOPMENT DOCS', url: '#faq', description: 'TECH SPECS & FAQ' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 border-2 border-black flex items-center justify-center">
                <span className="text-white font-bold text-sm">FC</span>
              </div>
              <span className="text-xl font-bold text-black tracking-wider">FLIGHTCONTROL</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('controller-board')}
              className="text-black hover:text-orange-500 transition-colors duration-200 cursor-pointer font-bold tracking-wide"
            >
              <CrypticText>THE CONTROLLER</CrypticText>
            </button>
            <button 
              onClick={() => scrollToSection('simulation')}
              className="text-black hover:text-orange-500 transition-colors duration-200 cursor-pointer font-bold tracking-wide"
            >
              <CrypticText>SIMULATION</CrypticText>
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="text-black hover:text-orange-500 transition-colors duration-200 cursor-pointer font-bold tracking-wide"
            >
              <CrypticText>TEAM</CrypticText>
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-black hover:text-orange-500 transition-colors duration-200 cursor-pointer font-bold tracking-wide"
            >
              <CrypticText>FAQ</CrypticText>
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-black hover:text-orange-500 transition-colors duration-200 cursor-pointer font-bold tracking-wide"
            >
              <CrypticText>UPDATES</CrypticText>
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Ecosystem Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsEcosystemOpen(!isEcosystemOpen)}
                className="flex items-center space-x-2 text-black hover:text-orange-500 transition-colors duration-200 font-bold tracking-wide"
              >
                <CrypticText>ECOSYSTEM</CrypticText>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isEcosystemOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isEcosystemOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                  >
                    <div className="p-4 space-y-2">
                      {ecosystemItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.url}
                          className="flex items-center justify-between p-3 border-2 border-gray-300 hover:border-black hover:bg-gray-100 transition-all duration-200 group"
                        >
                          <div>
                            <div className="font-bold text-black tracking-wide">{item.name}</div>
                            <div className="text-sm text-gray-600 font-mono">{item.description}</div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" />
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
            className="lg:hidden p-2 border-2 border-black hover:bg-gray-100 transition-colors duration-200"
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
            className="lg:hidden bg-white border-t-4 border-black"
          >
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('controller-board')}
                className="block text-black hover:text-orange-500 transition-colors duration-200 font-bold tracking-wide"
              >
                THE CONTROLLER
              </button>
              <button 
                onClick={() => scrollToSection('simulation')}
                className="block text-black hover:text-orange-500 transition-colors duration-200 font-bold tracking-wide"
              >
                SIMULATION
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="block text-black hover:text-orange-500 transition-colors duration-200 font-bold tracking-wide"
              >
                TEAM
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="block text-black hover:text-orange-500 transition-colors duration-200 font-bold tracking-wide"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="block text-black hover:text-orange-500 transition-colors duration-200 font-bold tracking-wide"
              >
                UPDATES
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;