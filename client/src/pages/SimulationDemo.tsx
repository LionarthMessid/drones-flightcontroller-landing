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
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      
      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 border-4 border-orange-500 rotate-45"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-32 w-12 h-12 border-4 border-black"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-20 h-20 border-4 border-gray-400"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-32 right-20 w-8 h-8 bg-orange-500 border-2 border-black"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute bottom-20 right-40 w-6 h-6 bg-black"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-black"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <div className="simulation-container mb-8">
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
        </div>

        {/* Simulation Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="simulation-container rounded-lg border-2 border-black p-8 mb-8"
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
                <motion.div 
                  className="bg-gray-100 p-4 rounded border"
                  whileHover={{ scale: 1.02 }}
                  animate={{ 
                    backgroundColor: batteryLevel < 20 ? '#fee2e2' : '#f3f4f6'
                  }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <motion.div
                      animate={{ scale: batteryLevel < 20 ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: batteryLevel < 20 ? Infinity : 0 }}
                    >
                      <Zap className="w-4 h-4 text-orange-500" />
                    </motion.div>
                    <span className="font-bold text-sm">BATTERY</span>
                  </div>
                  <motion.div 
                    className="text-2xl font-bold font-mono"
                    animate={{ 
                      color: batteryLevel < 20 ? '#dc2626' : '#000'
                    }}
                  >
                    {batteryLevel.toFixed(1)}%
                  </motion.div>
                  <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                    <motion.div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ width: `${batteryLevel}%` }}
                      animate={{ 
                        backgroundColor: batteryLevel < 20 ? '#dc2626' : '#ff6b35'
                      }}
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-100 p-4 rounded border"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Settings className="w-4 h-4 text-orange-500" />
                    </motion.div>
                    <span className="font-bold text-sm">ALTITUDE</span>
                  </div>
                  <motion.div 
                    className="text-2xl font-bold font-mono"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    {altitude.toFixed(1)}m
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-100 p-4 rounded border"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Wifi className="w-4 h-4 text-orange-500" />
                    </motion.div>
                    <span className="font-bold text-sm">SPEED</span>
                  </div>
                  <motion.div 
                    className="text-2xl font-bold font-mono"
                    animate={{ 
                      scale: speed > 30 ? [1, 1.05, 1] : 1
                    }}
                    transition={{ duration: 0.3, repeat: speed > 30 ? Infinity : 0 }}
                  >
                    {speed.toFixed(1)} m/s
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-100 p-4 rounded border"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Cpu className="w-4 h-4 text-orange-500" />
                    </motion.div>
                    <span className="font-bold text-sm">CPU LOAD</span>
                  </div>
                  <motion.div 
                    className="text-2xl font-bold font-mono"
                    animate={{ 
                      color: (simulationStep % 50 + 25) > 75 ? '#dc2626' : '#000'
                    }}
                  >
                    {(simulationStep % 50 + 25).toFixed(0)}%
                  </motion.div>
                </motion.div>
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
          <motion.div 
            className="bg-white rounded-lg border-2 border-black p-6"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4"
              whileHover={{ rotate: 5 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            <h3 className="text-xl font-bold text-black mb-2">DUAL-CORE PROCESSING</h3>
            <p className="text-gray-600 font-mono text-sm">
              ESP32'S DUAL-CORE ARCHITECTURE ALLOWS SIMULTANEOUS FLIGHT CONTROL AND WIRELESS COMMUNICATION
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg border-2 border-black p-6"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4"
              whileHover={{ rotate: -5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Wifi className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            <h3 className="text-xl font-bold text-black mb-2">WIRELESS TELEMETRY</h3>
            <p className="text-gray-600 font-mono text-sm">
              REAL-TIME DATA TRANSMISSION AND REMOTE MONITORING THROUGH WI-FI CONNECTIVITY
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg border-2 border-black p-6"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4"
              whileHover={{ rotate: 5 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Settings className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            <h3 className="text-xl font-bold text-black mb-2">ADVANCED CONTROL</h3>
            <p className="text-gray-600 font-mono text-sm">
              SOPHISTICATED FLIGHT ALGORITHMS WITH CUSTOMIZABLE PARAMETERS AND SAFETY FEATURES
            </p>
          </motion.div>
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

        {/* Code Reference Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white border-4 border-black p-8 mt-[46px] mb-[46px]"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black font-mono mb-4">
              CODE REFERENCE
            </h2>
            <p className="text-gray-600 font-mono">
              Essential ESP32 flight controller programming concepts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-100 p-6 border-2 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">FLIGHT CONTROL</h3>
              <p className="text-gray-600 font-mono text-sm mb-3">
                Initialize sensors, configure PID controllers, and manage motor outputs
              </p>
              <div className="text-xs font-mono text-gray-500">
                FlightController.h • IMU calibration • Motor control
              </div>
            </div>
            <div className="bg-gray-100 p-6 border-2 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">WIFI TELEMETRY</h3>
              <p className="text-gray-600 font-mono text-sm mb-3">
                Stream real-time flight data via WebSocket connections
              </p>
              <div className="text-xs font-mono text-gray-500">
                WiFi.h • WebSocketsServer • JSON streaming
              </div>
            </div>
            <div className="bg-gray-100 p-6 border-2 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">AUTONOMOUS FLIGHT</h3>
              <p className="text-gray-600 font-mono text-sm mb-3">
                Implement waypoint navigation and automated flight patterns
              </p>
              <div className="text-xs font-mono text-gray-500">
                Waypoint structs • Navigation algorithms • GPS tracking
              </div>
            </div>
            <div className="bg-gray-100 p-6 border-2 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">SENSOR INTEGRATION</h3>
              <p className="text-gray-600 font-mono text-sm mb-3">
                Process IMU data and calculate orientation angles
              </p>
              <div className="text-xs font-mono text-gray-500">
                MPU6050.h • Accelerometer • Gyroscope data
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive IDE Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4 font-mono">
              INTERACTIVE IDE
            </h2>
            <p className="text-gray-600 font-mono">
              Test and compile your ESP32 flight controller code
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-lg overflow-hidden">
            {/* IDE Header */}
            <div className="bg-gray-800 text-white p-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="font-mono text-sm">flight_controller.ino</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-white px-4 py-1 rounded font-mono text-sm"
                >
                  COMPILE
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-4 py-1 rounded font-mono text-sm"
                >
                  UPLOAD
                </motion.button>
              </div>
            </div>

            {/* Code Editor Interface */}
            <div className="grid lg:grid-cols-2 h-96 border-2 border-gray-300 rounded overflow-hidden">
              <div className="bg-gray-900 text-green-400 p-4 overflow-hidden">
                <div className="font-mono text-sm">
                  <div className="text-gray-500 mb-2">// ESP32 Flight Controller Code</div>
                  <div className="text-blue-400">#include</div>
                  <div className="text-yellow-400 ml-4">"FlightController.h"</div>
                  <div className="mt-2 text-white">FlightController fc;</div>
                  <div className="mt-2 text-purple-400">void setup() {"{"}</div>
                  <div className="text-white ml-4">Serial.begin(115200);</div>
                  <div className="text-white ml-4">fc.init();</div>
                  <div className="text-white ml-4">fc.calibrateIMU();</div>
                  <div className="text-gray-500 ml-4">// Ready for flight</div>
                  <div className="text-purple-400">{"}"}</div>
                  <div className="mt-2 text-purple-400">void loop() {"{"}</div>
                  <div className="text-white ml-4">fc.updateSensors();</div>
                  <div className="text-white ml-4">fc.stabilize();</div>
                  <div className="text-white ml-4">fc.updateMotors();</div>
                  <div className="text-purple-400">{"}"}</div>
                </div>
              </div>

              {/* Output Console */}
              <div className="bg-black text-white p-4 overflow-hidden">
                <div className="font-mono text-sm">
                  <div className="text-orange-500 mb-2">COMPILATION OUTPUT:</div>
                  <div className="text-green-400 mb-1">✓ Sketch compiled successfully</div>
                  <div className="text-green-400 mb-1">✓ Flash memory usage: 64%</div>
                  <div className="text-green-400 mb-1">✓ Global variables: 12%</div>
                  <div className="text-white mb-4">Ready to upload to ESP32</div>
                  
                  <div className="text-orange-500 mb-2">SERIAL MONITOR:</div>
                  <div className="text-gray-400 mb-1">Flight Controller Ready</div>
                  <div className="text-gray-400 mb-1">Alt: 0.0 | Speed: 0.0 | Battery: 100%</div>
                  <div className="text-gray-400 mb-1">Alt: 0.5 | Speed: 2.1 | Battery: 99%</div>
                  <div className="text-gray-400 mb-1">Alt: 1.2 | Speed: 4.3 | Battery: 98%</div>
                  <div className="text-green-400 animate-pulse">█</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4 font-mono">
              ADVANCED FEATURES
            </h2>
            <p className="text-gray-600 font-mono">
              Explore advanced ESP32 flight controller capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Real-time Data Streaming */}
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-4">REAL-TIME DATA STREAMING</h3>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <span className="text-gray-600">GPS Coordinates:</span>
                    <div className="text-black">40.7128°N, 74.0060°W</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Orientation:</span>
                    <div className="text-black">Roll: 2.5°, Pitch: -1.2°</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Acceleration:</span>
                    <div className="text-black">X: 0.02g, Y: 0.01g, Z: 1.0g</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Signal Strength:</span>
                    <div className="text-black">WiFi: -45dBm, GPS: 8 sats</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 font-mono text-sm">
                Monitor live flight data with WebSocket connections and JSON telemetry streaming
              </p>
            </div>

            {/* Flight Path Planning */}
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-4">FLIGHT PATH PLANNING</h3>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <svg className="w-full h-32" viewBox="0 0 200 80">
                  <path 
                    d="M 10 60 Q 50 20 90 40 Q 130 60 170 30" 
                    stroke="#FF7120" 
                    strokeWidth="3" 
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <circle cx="10" cy="60" r="4" fill="#FF7120" />
                  <circle cx="90" cy="40" r="4" fill="#FF7120" />
                  <circle cx="170" cy="30" r="4" fill="#FF7120" />
                  <text x="10" y="75" className="text-xs font-mono" fill="#666">START</text>
                  <text x="80" y="55" className="text-xs font-mono" fill="#666">WAYPOINT</text>
                  <text x="160" y="45" className="text-xs font-mono" fill="#666">END</text>
                </svg>
              </div>
              <p className="text-gray-600 font-mono text-sm">
                Create complex flight paths with multiple waypoints and automatic navigation
              </p>
            </div>

            {/* Safety Systems */}
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-4">SAFETY SYSTEMS</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-mono text-sm">Failsafe Mode: ACTIVE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-mono text-sm">Geofencing: ENABLED</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-mono text-sm">Low Battery Return: SET</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-mono text-sm">Emergency Landing: READY</span>
                </div>
              </div>
              <p className="text-gray-600 font-mono text-sm">
                Comprehensive safety systems including failsafe modes and emergency procedures
              </p>
            </div>

            {/* Camera Control */}
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-4">CAMERA CONTROL</h3>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <span className="text-gray-600">Resolution:</span>
                    <div className="text-black">1920x1080 @ 30fps</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Gimbal Position:</span>
                    <div className="text-black">Pan: 0°, Tilt: -15°</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Recording:</span>
                    <div className="text-black">ACTIVE - 00:02:34</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Storage:</span>
                    <div className="text-black">15.2GB / 32GB</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 font-mono text-sm">
                Integrated camera controls with gimbal stabilization and video recording
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tutorials Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-20 bg-orange-50 border-2 border-orange-500 rounded-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-4 font-mono">
              STEP-BY-STEP TUTORIALS
            </h2>
            <p className="text-gray-600 font-mono">
              Learn ESP32 drone programming with guided tutorials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-lg font-bold text-black">BASIC SETUP</h3>
              </div>
              <ul className="space-y-2 text-sm font-mono">
                <li>• Install ESP32 development environment</li>
                <li>• Configure Arduino IDE for ESP32</li>
                <li>• Test basic GPIO operations</li>
                <li>• Establish WiFi connection</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-lg font-bold text-black">SENSOR INTEGRATION</h3>
              </div>
              <ul className="space-y-2 text-sm font-mono">
                <li>• Connect IMU sensor (MPU6050)</li>
                <li>• Read accelerometer data</li>
                <li>• Calculate orientation angles</li>
                <li>• Implement sensor fusion</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-lg font-bold text-black">FLIGHT CONTROL</h3>
              </div>
              <ul className="space-y-2 text-sm font-mono">
                <li>• Configure ESC and motors</li>
                <li>• Implement PID controllers</li>
                <li>• Add stabilization algorithms</li>
                <li>• Test manual flight control</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Programming Guide Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-white border-4 border-black p-8 mb-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-4 font-mono">
              PROGRAMMING CONCEPTS
            </h2>
            <p className="text-gray-600 font-mono">
              Essential concepts for ESP32 flight controller development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-100 p-6 border-2 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">FLIGHT CONTROL</h3>
              <p className="text-gray-600 font-mono text-sm">
                Initialize sensors, configure PID controllers, and manage motor outputs
              </p>
            </div>
            <div className="bg-gray-100 p-6 border-2 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">WIFI TELEMETRY</h3>
              <p className="text-gray-600 font-mono text-sm">
                Stream real-time flight data via WebSocket connections
              </p>
            </div>
            <div className="bg-gray-100 p-6 border-2 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">AUTONOMOUS FLIGHT</h3>
              <p className="text-gray-600 font-mono text-sm">
                Implement waypoint navigation and automated flight patterns
              </p>
            </div>
            <div className="bg-gray-100 p-6 border-2 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">SENSOR INTEGRATION</h3>
              <p className="text-gray-600 font-mono text-sm">
                Process IMU data and calculate orientation angles
              </p>
            </div>
          </div>
        </motion.div>

        {/* Simulation Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4 font-mono">
              SIMULATION FEATURES
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 border-2 border-black mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">REAL-TIME PHYSICS</h3>
              <p className="text-sm text-gray-600 font-mono">
                Accurate flight dynamics with gravity, wind, and inertial effects
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="w-12 h-12 bg-black border-2 border-black mx-auto mb-4 flex items-center justify-center">
                <Wifi className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">WIRELESS TESTING</h3>
              <p className="text-sm text-gray-600 font-mono">
                Test WiFi telemetry and remote control features
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="w-12 h-12 bg-gray-200 border-2 border-black mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">CODE VALIDATION</h3>
              <p className="text-sm text-gray-600 font-mono">
                Upload and test your flight control algorithms
              </p>
            </div>

            <div className="bg-white border-4 border-black p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 border-2 border-black mx-auto mb-4 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">PERFORMANCE ANALYSIS</h3>
              <p className="text-sm text-gray-600 font-mono">
                Monitor CPU usage, memory, and timing performance
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SimulationDemo;