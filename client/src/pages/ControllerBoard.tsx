import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Cpu, Wifi, Usb, Bluetooth, Zap, Settings } from 'lucide-react';

const ControllerBoard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-orange-500 hover:text-black transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold">BACK TO HOME</span>
              </motion.div>
            </Link>
            <div className="text-2xl font-bold text-black">ESP32 FLIGHT CONTROLLER</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
            CONTROLLER BOARD
          </h1>
          <div className="flex items-center justify-center space-x-2 text-orange-500 mb-6">
            <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
            <span className="text-sm font-bold uppercase tracking-wider">TECHNICAL SPECIFICATIONS</span>
          </div>
          <p className="text-xl text-gray-600 font-mono max-w-3xl mx-auto">
            DETAILED SPECIFICATIONS AND IMAGES OF OUR ESP32-BASED FLIGHT CONTROLLER BOARDS
          </p>
        </motion.div>

        {/* Version Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Version A */}
          <div className="bg-white rounded-lg border-2 border-black p-8 relative">
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
    </div>
  );
};

export default ControllerBoard;