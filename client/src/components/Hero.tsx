import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Square, Triangle, Circle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const heroRef = useScrollAnimation();

  const features = [
    'BEGINNER FRIENDLY', 'EASY CONFIG', 'OPEN SOURCE', 'MODULAR DESIGN', 
    'REAL-TIME', 'PLUG & PLAY', 'STABLE FLIGHT', 'CUSTOM FIRMWARE'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section 
      ref={heroRef as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 pt-16 scroll-animate"
    >
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-16 h-full">
          {Array.from({ length: 256 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="border border-emerald-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: i * 0.002, duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-16 h-16 border-4 border-emerald-400 rotate-45"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.div 
          className="absolute top-40 right-32 w-12 h-12 border-4 border-emerald-300"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-32 left-32 w-20 h-20 border-4 border-emerald-500"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
        <motion.div
          className="absolute top-32 right-20 w-8 h-8 bg-emerald-400 border-2 border-emerald-300 shadow-lg shadow-emerald-400/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-6 h-6 bg-emerald-500 border-2 border-emerald-300 rounded-full shadow-lg shadow-emerald-500/25"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter"
            >
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text">FLIGHT</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-emerald-300 to-emerald-200 bg-clip-text">CONTROL</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-emerald-400"
            >
              CONTROLLERS
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl sm:text-2xl text-emerald-200 max-w-4xl mx-auto leading-relaxed font-mono"
          >
            HARDWARE FLIGHT CONTROLLERS FOR BEGINNERS. EASY CONFIGURATION. STABLE FLIGHT.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.a
              href="#programs"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-900 px-8 py-4 border-4 border-emerald-300 font-bold text-lg tracking-wide hover:from-emerald-400 hover:to-emerald-300 transition-all duration-300 flex items-center space-x-2 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/40"
            >
              <span>VIEW CONTROLLERS</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-800 text-emerald-400 px-8 py-4 border-4 border-emerald-500 font-bold text-lg tracking-wide hover:bg-slate-700 hover:border-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-400/20"
            >
              BROWSE PRODUCTS
            </motion.a>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            className="flex items-center justify-center space-x-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              className="p-4 border-4 border-emerald-500 bg-slate-800 shadow-lg shadow-emerald-500/25"
              whileHover={{ rotate: 15, scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Square className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <motion.div
              className="p-4 border-4 border-emerald-300 bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/40"
              whileHover={{ rotate: -15, scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Triangle className="w-8 h-8 text-slate-900" />
            </motion.div>
            <motion.div
              className="p-4 border-4 border-emerald-500 bg-slate-800 shadow-lg shadow-emerald-500/25"
              whileHover={{ rotate: 15, scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Circle className="w-8 h-8 text-emerald-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="pt-16 pb-8"
        >
          <div className="text-center">
            <h3 className="text-lg font-bold text-emerald-300 mb-8 tracking-wider">CURRENT FOCUS:</h3>
            <div className="flex items-center justify-center space-x-2 text-2xl font-bold">
              <span className="text-emerald-400">{'>'}</span>
              <motion.span
                key={currentFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text tracking-wider"
              >
                {features[currentFeature]}
              </motion.span>
              <span className="text-green-400">_</span>
            </div>
            <div className="mt-4 text-sm text-green-400 font-mono">
              {features.length} CORE FEATURES AVAILABLE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;