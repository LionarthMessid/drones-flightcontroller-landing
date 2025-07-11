import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Monitor, Zap, Eye } from 'lucide-react';

const Simulation = () => {
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      title: 'BASIC FLIGHT',
      description: 'Test basic flight controls and stability',
      duration: 8,
      features: ['TAKEOFF', 'HOVER', 'LANDING', 'STABILITY TEST']
    },
    {
      title: 'ADVANCED MANEUVERS',
      description: 'Complex flight patterns and autonomous modes',
      duration: 12,
      features: ['AUTONOMOUS FLIGHT', 'WAYPOINT NAVIGATION', 'RETURN HOME', 'OBSTACLE AVOIDANCE']
    },
    {
      title: 'ESP32 PERFORMANCE',
      description: 'Test ESP32 processing power and response times',
      duration: 6,
      features: ['DUAL-CORE USAGE', 'WIFI CONNECTIVITY', 'REAL-TIME PROCESSING', 'SENSOR FUSION']
    }
  ];

  const specs = [
    { label: 'PROCESSOR', value: 'ESP32-S3 240MHz' },
    { label: 'MEMORY', value: '512KB SRAM' },
    { label: 'CONNECTIVITY', value: 'Wi-Fi + Bluetooth' },
    { label: 'SENSORS', value: 'IMU + GPS' },
    { label: 'FLIGHT TIME', value: '~20 Minutes' },
    { label: 'CONTROL RANGE', value: '500m WiFi' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimRunning) {
      interval = setInterval(() => {
        setSimProgress(prev => {
          if (prev >= 100) {
            setIsSimRunning(false);
            return 0;
          }
          return prev + (100 / (demos[activeDemo].duration * 10));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSimRunning, activeDemo]);

  const toggleSimulation = () => {
    setIsSimRunning(!isSimRunning);
    if (!isSimRunning) {
      setSimProgress(0);
    }
  };

  const resetSimulation = () => {
    setIsSimRunning(false);
    setSimProgress(0);
  };

  return (
    <section id="simulation" className="py-20 bg-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-orange-500"
          >
            <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
            <span className="text-sm font-bold uppercase tracking-wider">INTERACTIVE DEMO</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-black tracking-tight"
          >
            FLIGHT SIMULATION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-mono"
          >
            EXPERIENCE THE POWER OF OUR ESP32 FLIGHT CONTROLLER. TEST FLIGHT PATTERNS, PERFORMANCE, AND FEATURES BEFORE HARDWARE RELEASE.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Demo Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-black tracking-wide">DEMO MODES</h3>
              {demos.map((demo, index) => (
                <motion.div
                  key={demo.title}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 border-4 cursor-pointer transition-all duration-200 ${
                    activeDemo === index 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-black bg-white hover:border-gray-600'
                  }`}
                  onClick={() => setActiveDemo(index)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-black tracking-wide">{demo.title}</h4>
                      <div className="text-sm text-gray-600 font-mono">{demo.duration}s</div>
                    </div>
                    <p className="text-sm text-gray-600 font-mono">{demo.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {demo.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-200 border border-black text-xs font-bold tracking-wide"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Specs Panel */}
            <div className="bg-gray-100 border-4 border-black p-6 space-y-4">
              <h4 className="text-lg font-bold text-black tracking-wide">CONTROLLER SPECS</h4>
              <div className="space-y-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm">
                    <span className="font-bold text-gray-600 tracking-wide">{spec.label}:</span>
                    <span className="text-black font-mono">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Simulation Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Simulation Screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-video bg-gray-900 border-4 border-black relative overflow-hidden"
            >
              {/* Simulation Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 border-4 border-orange-500 mx-auto relative">
                    <motion.div
                      animate={{
                        rotate: isSimRunning ? 360 : 0,
                        scale: isSimRunning ? [1, 1.1, 1] : 1
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                      className="w-full h-full bg-orange-500 border-2 border-black flex items-center justify-center"
                    >
                      <Zap className="w-16 h-16 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="text-white font-mono">
                    <div className="text-2xl font-bold mb-2">{demos[activeDemo].title}</div>
                    <div className="text-sm text-gray-400">{demos[activeDemo].description}</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800">
                <motion.div
                  className="h-full bg-orange-500"
                  style={{ width: `${simProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Status Indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                <div className="flex items-center space-x-2 text-white text-sm font-mono">
                  <div className={`w-2 h-2 rounded-full ${isSimRunning ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span>{isSimRunning ? 'RUNNING' : 'READY'}</span>
                </div>
                <div className="text-white text-sm font-mono">
                  ESP32: {isSimRunning ? 'ACTIVE' : 'STANDBY'}
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSimulation}
                className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 border-4 border-black font-bold tracking-wide hover:bg-orange-600 transition-all duration-200"
              >
                {isSimRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isSimRunning ? 'PAUSE' : 'START'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetSimulation}
                className="flex items-center space-x-2 bg-white text-black px-6 py-3 border-4 border-black font-bold tracking-wide hover:bg-gray-100 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                <span>RESET</span>
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4">
              {demos[activeDemo].features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-gray-100 border-2 border-black"
                >
                  <div className="w-8 h-8 bg-orange-500 border-2 border-black flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-black tracking-wide">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 space-y-6"
        >
          <h3 className="text-2xl font-bold text-black tracking-wide">
            READY TO EXPERIENCE THE FUTURE?
          </h3>
          <p className="text-gray-600 font-mono max-w-2xl mx-auto">
            OUR ESP32 FLIGHT CONTROLLER IS CURRENTLY IN DEVELOPMENT. JOIN OUR JOURNEY AND BE THE FIRST TO EXPERIENCE NEXT-GEN DRONE CONTROL.
          </p>
          <motion.a
            href="#controller-board"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 border-4 border-black font-bold text-lg tracking-wide hover:bg-gray-800 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(255,165,0,1)]"
          >
            <Eye className="w-5 h-5" />
            <span>VIEW CONTROLLER SPECS</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Simulation;