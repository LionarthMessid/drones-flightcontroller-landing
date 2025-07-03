import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Play, Pause, RotateCcw, Settings, Zap, Wifi, Cpu } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SimulationDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);

  // Simulation logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSimulationStep(prev => (prev + 1) % 100);
        setBatteryLevel(prev => Math.max(0, prev - 0.1));
        setAltitude(prev => Math.sin(prev * 0.1) * 50 + 50);
        setSpeed(prev => Math.cos(prev * 0.05) * 20 + 25);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSimulationStep(0);
    setBatteryLevel(100);
    setAltitude(0);
    setSpeed(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
            ESP32 FLIGHT SIMULATION
          </h1>
          <div className="flex items-center justify-center space-x-2 text-orange-500 mb-6">
            <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
            <span className="text-sm font-bold uppercase tracking-wider">INTERACTIVE DEMO</span>
          </div>
          <p className="text-xl text-gray-600 font-mono max-w-3xl mx-auto">
            EXPERIENCE THE CAPABILITIES OF OUR ESP32 FLIGHT CONTROLLER THROUGH THIS INTERACTIVE SIMULATION
          </p>
        </motion.div>

        {/* Simulation Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border-2 border-black p-8 mb-8"
        >
          {/* Simulation Display */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Visual Simulation */}
            <div className="bg-gray-100 border-2 border-black rounded-lg p-6 h-80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-green-200">
                {/* Drone representation */}
                <motion.div
                  className="absolute w-8 h-8 bg-orange-500 rounded-full border-2 border-black"
                  animate={{
                    x: simulationStep * 4,
                    y: Math.sin(simulationStep * 0.1) * 30 + 120,
                    rotate: Math.sin(simulationStep * 0.05) * 10
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse"></div>
                </motion.div>
                
                {/* Flight path */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d={`M 0 ${150 + Math.sin(0) * 30} ${Array.from({length: 100}, (_, i) => 
                      `L ${i * 4} ${150 + Math.sin(i * 0.1) * 30}`
                    ).join(' ')}`}
                    stroke="#FF7120"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.5"
                  />
                </svg>
              </div>
              
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded text-sm font-mono">
                {isRunning ? 'FLIGHT ACTIVE' : 'STANDBY'}
              </div>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              {/* Control Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  disabled={isRunning}
                  className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded font-bold disabled:opacity-50"
                >
                  <Play className="w-5 h-5" />
                  <span>START</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePause}
                  disabled={!isRunning}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded font-bold disabled:opacity-50"
                >
                  <Pause className="w-5 h-5" />
                  <span>PAUSE</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded font-bold"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>RESET</span>
                </motion.button>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-sm">BATTERY</span>
                  </div>
                  <div className="text-2xl font-bold font-mono">{batteryLevel.toFixed(1)}%</div>
                  <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${batteryLevel}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Settings className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-sm">ALTITUDE</span>
                  </div>
                  <div className="text-2xl font-bold font-mono">{altitude.toFixed(1)}m</div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wifi className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-sm">SPEED</span>
                  </div>
                  <div className="text-2xl font-bold font-mono">{speed.toFixed(1)} m/s</div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cpu className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-sm">CPU LOAD</span>
                  </div>
                  <div className="text-2xl font-bold font-mono">{(simulationStep % 50 + 25).toFixed(0)}%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white rounded-lg border-2 border-black p-6">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">DUAL-CORE PROCESSING</h3>
            <p className="text-gray-600 font-mono text-sm">
              ESP32'S DUAL-CORE ARCHITECTURE ALLOWS SIMULTANEOUS FLIGHT CONTROL AND WIRELESS COMMUNICATION
            </p>
          </div>
          
          <div className="bg-white rounded-lg border-2 border-black p-6">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">WIRELESS TELEMETRY</h3>
            <p className="text-gray-600 font-mono text-sm">
              REAL-TIME DATA TRANSMISSION AND REMOTE MONITORING THROUGH WI-FI CONNECTIVITY
            </p>
          </div>
          
          <div className="bg-white rounded-lg border-2 border-black p-6">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">ADVANCED CONTROL</h3>
            <p className="text-gray-600 font-mono text-sm">
              SOPHISTICATED FLIGHT ALGORITHMS WITH CUSTOMIZABLE PARAMETERS AND SAFETY FEATURES
            </p>
          </div>
        </motion.div>

        {/* Technical Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-orange-50 border-2 border-orange-500 rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-black mb-4">SIMULATION FEATURES</h2>
          <p className="text-gray-700 font-mono mb-6">
            THIS SIMULATION DEMONSTRATES THE CORE CAPABILITIES OF OUR ESP32 FLIGHT CONTROLLER, 
            INCLUDING REAL-TIME PROCESSING, WIRELESS COMMUNICATION, AND FLIGHT DYNAMICS.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-bold text-black mb-2">SIMULATED FEATURES:</h3>
              <ul className="space-y-1 font-mono text-sm">
                <li>• REAL-TIME FLIGHT DYNAMICS</li>
                <li>• BATTERY MONITORING</li>
                <li>• ALTITUDE CONTROL</li>
                <li>• SPEED REGULATION</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">ESP32 CAPABILITIES:</h3>
              <ul className="space-y-1 font-mono text-sm">
                <li>• DUAL-CORE PROCESSING</li>
                <li>• WI-FI CONNECTIVITY</li>
                <li>• REAL-TIME TELEMETRY</li>
                <li>• SENSOR INTEGRATION</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SimulationDemo;