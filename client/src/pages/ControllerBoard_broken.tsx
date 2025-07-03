import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Cpu, Wifi, Usb, Bluetooth, Zap, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ControllerBoard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
            ESP32 FLIGHT CONTROLLER
          </h1>
          <div className="flex items-center justify-center space-x-2 text-orange-500 mb-6">
            <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
            <span className="text-sm font-bold uppercase tracking-wider">NEXT-GENERATION FLIGHT CONTROL</span>
          </div>
          <p className="text-xl text-gray-600 font-mono max-w-4xl mx-auto leading-relaxed">
            Revolutionary ESP32-based flight controllers featuring dual-core processing, wireless connectivity, 
            and onboard sensors. Designed for developers who demand precision, reliability, and innovation.
          </p>
        </motion.div>

        {/* Main Controller Board Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-white border-4 border-black p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 font-mono">
                CORE SPECIFICATIONS
              </h2>
              <p className="text-gray-600 font-mono">
                Built on the powerful ESP32-S3 platform with cutting-edge features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Core Features */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-black font-mono border-b-2 border-orange-500 pb-2">
                  PROCESSING POWER
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-gray-300">
                    <span className="font-bold text-black">PROCESSOR:</span>
                    <span className="font-mono text-gray-700">ESP32-S3 Dual Core</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-gray-300">
                    <span className="font-bold text-black">FREQUENCY:</span>
                    <span className="font-mono text-gray-700">240MHz</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-gray-300">
                    <span className="font-bold text-black">MEMORY:</span>
                    <span className="font-mono text-gray-700">512KB SRAM</span>
                  </div>
                </div>
              </div>

              {/* Connectivity */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-black font-mono border-b-2 border-orange-500 pb-2">
                  CONNECTIVITY
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-gray-300">
                    <span className="font-bold text-black">WIRELESS:</span>
                    <span className="font-mono text-gray-700">Wi-Fi 802.11b/g/n</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-gray-300">
                    <span className="font-bold text-black">BLUETOOTH:</span>
                    <span className="font-mono text-gray-700">BLE 5.0 Support</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-gray-300">
                    <span className="font-bold text-black">INTERFACE:</span>
                    <span className="font-mono text-gray-700">USB Type-C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features Grid */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-orange-500 text-white p-4 border-4 border-black text-center">
                <Cpu className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold text-sm">DUAL-CORE</div>
              </div>
              <div className="bg-black text-orange-500 p-4 border-4 border-black text-center">
                <Wifi className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold text-sm">WIFI ENABLED</div>
              </div>
              <div className="bg-white text-black p-4 border-4 border-black text-center">
                <Bluetooth className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold text-sm">BLUETOOTH</div>
              </div>
              <div className="bg-gray-200 text-black p-4 border-4 border-black text-center">
                <Usb className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold text-sm">USB TYPE-C</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Version Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 border-2 border-black font-bold text-sm mb-4">
              <span>■</span>
              <span>DEVELOPMENT VERSIONS</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black font-mono">
              VERSION A & B COMPARISON
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Version A */}
            <div className="bg-white border-4 border-black p-8 relative">
            <div className="absolute -top-4 left-8 bg-orange-500 text-white px-4 py-2 font-bold text-sm">
              VERSION A - STANDARD
            </div>
            <div className="mt-4 mb-6">
              <div className="w-full h-48 bg-gray-200 border-2 border-black mb-4 flex items-center justify-center">
                <Cpu className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 font-mono">CONCEPT VISUALIZATION - ACTUAL BOARD IN DEVELOPMENT</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Cpu className="w-5 h-5 text-orange-500" />
                <span className="font-mono text-sm">ESP32 DUAL-CORE PROCESSOR</span>
              </div>
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-orange-500" />
                <span className="font-mono text-sm">WI-FI 802.11 B/G/N</span>
              </div>
              <div className="flex items-center space-x-3">
                <Usb className="w-5 h-5 text-orange-500" />
                <span className="font-mono text-sm">USB TYPE-C PROGRAMMING</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="font-mono text-sm">4MB FLASH MEMORY</span>
              </div>
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-orange-500" />
                <span className="font-mono text-sm">BASIC I/O PORTS</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600 font-mono">STATUS: IN DEVELOPMENT</div>
              <div className="text-sm text-gray-600 font-mono">TARGET: ENTRY-LEVEL USERS</div>
            </div>
          </div>

          {/* Version B */}
          <div className="bg-white rounded-lg border-2 border-black p-8 relative">
            <div className="absolute -top-4 left-8 bg-black text-white px-4 py-2 font-bold text-sm">
              VERSION B - PROFESSIONAL
            </div>
            <div className="mt-4 mb-6">
              <div className="w-full h-48 bg-gray-200 border-2 border-black mb-4 flex items-center justify-center">
                <Cpu className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 font-mono">CONCEPT VISUALIZATION - FUTURE RELEASE</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Cpu className="w-5 h-5 text-black" />
                <span className="font-mono text-sm">ESP32 DUAL-CORE PROCESSOR</span>
              </div>
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-black" />
                <span className="font-mono text-sm">WI-FI 802.11 B/G/N</span>
              </div>
              <div className="flex items-center space-x-3">
                <Bluetooth className="w-5 h-5 text-black" />
                <span className="font-mono text-sm">BLUETOOTH 5.0</span>
              </div>
              <div className="flex items-center space-x-3">
                <Usb className="w-5 h-5 text-black" />
                <span className="font-mono text-sm">USB TYPE-C PROGRAMMING</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-black" />
                <span className="font-mono text-sm">8MB PSRAM MEMORY</span>
              </div>
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-black" />
                <span className="font-mono text-sm">ONBOARD IMU SENSORS</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600 font-mono">STATUS: CONCEPT PHASE</div>
              <div className="text-sm text-gray-600 font-mono">TARGET: ADVANCED USERS</div>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border-2 border-black p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-black mb-6">TECHNICAL SPECIFICATIONS</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">PROCESSOR & MEMORY</h3>
              <div className="space-y-2 font-mono text-sm">
                <div>• DUAL-CORE XTENSA 32-BIT LX6</div>
                <div>• UP TO 240 MHZ CLOCK SPEED</div>
                <div>• 520 KB SRAM</div>
                <div>• 4MB-8MB FLASH STORAGE</div>
                <div>• OPTIONAL 8MB PSRAM (VERSION B)</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-black mb-4">CONNECTIVITY</h3>
              <div className="space-y-2 font-mono text-sm">
                <div>• WI-FI 802.11 B/G/N 2.4GHZ</div>
                <div>• BLUETOOTH 5.0 (VERSION B)</div>
                <div>• USB TYPE-C PROGRAMMING</div>
                <div>• UART, SPI, I2C INTERFACES</div>
                <div>• PWM OUTPUT CHANNELS</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Development Status */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-orange-50 border-2 border-orange-500 rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-black mb-4">DEVELOPMENT STATUS</h2>
          <p className="text-gray-700 font-mono mb-6">
            BOTH VERSIONS ARE CURRENTLY IN DEVELOPMENT. VERSION A IS IN PROTOTYPING PHASE, 
            WHILE VERSION B IS IN CONCEPT DESIGN PHASE.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-orange-500 text-white px-6 py-3 rounded font-bold">
              VERSION A: 60% COMPLETE
            </div>
            <div className="bg-gray-400 text-white px-6 py-3 rounded font-bold">
              VERSION B: 25% COMPLETE
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ControllerBoard;