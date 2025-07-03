import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Square, Triangle, Circle } from 'lucide-react';

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    'ESP32 DUAL-CORE', 'WIFI & BLUETOOTH', 'USB TYPE-C', 'ONBOARD IMU', 
    'COMPACT PCB', 'VERSION A & B', 'STARTUP READY', 'FUTURE TECH'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-black"></div>
          ))}
        </div>
      </div>

      {/* Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-16 h-16 border-4 border-orange-500 rotate-45"></div>
        <div className="absolute top-40 right-32 w-12 h-12 border-4 border-black"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 border-4 border-gray-400"></div>
        <motion.div
          className="absolute top-32 right-20 w-8 h-8 bg-orange-500 border-2 border-black"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter"
            >
              <span className="text-black">ESP32</span>
              <br />
              <span className="text-orange-500">FLIGHT</span>
              <br />
              <span className="text-black">CONTROLLER</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-black"
            >
              NEXT-GEN AVIATION BOARD
            </motion.div>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 border-4 border-black font-bold text-sm tracking-wider"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>IN DEVELOPMENT</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-mono"
          >
            REVOLUTIONARY ESP32-BASED FLIGHT CONTROLLER. TWO VERSIONS IN DEVELOPMENT. INNOVATION MEETS SIMPLICITY.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.a
              href="/controller-board"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-8 py-4 border-4 border-black font-bold text-lg tracking-wide hover:bg-orange-600 transition-all duration-200 flex items-center space-x-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <span>VIEW THE CONTROLLER BOARD</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="/simulation-demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 border-4 border-black font-bold text-lg tracking-wide hover:bg-gray-100 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              CHECKOUT THE SIMULATION
            </motion.a>
          </motion.div>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center space-x-8 pt-12">
            <motion.div
              className="p-4 border-4 border-black bg-white"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Square className="w-8 h-8 text-orange-500" />
            </motion.div>
            <motion.div
              className="p-4 border-4 border-black bg-orange-500"
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Triangle className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              className="p-4 border-4 border-black bg-white"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Circle className="w-8 h-8 text-black" />
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-16 pb-8"
        >
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-600 mb-8 tracking-wider">KEY SPECIFICATIONS:</h3>
            <div className="flex items-center justify-center space-x-2 text-2xl font-bold">
              <span className="text-gray-500">{'>'}</span>
              <motion.span
                key={currentFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-orange-500 tracking-wider"
              >
                {features[currentFeature]}
              </motion.span>
              <span className="text-gray-500">_</span>
            </div>
            <div className="mt-4 text-sm text-gray-500 font-mono">
              {features.length} CORE FEATURES AVAILABLE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;