import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Cpu, Wifi, Usb, Bluetooth, Zap, Settings, Shield, Code, Layers, Cog, Gauge, Battery, Thermometer, Compass } from 'lucide-react';
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
            <div className="bg-white border-4 border-black p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-black">VERSION A</h3>
                  <div className="bg-orange-500 text-white px-3 py-1 border-2 border-black font-bold text-xs">
                    IN DEVELOPMENT
                  </div>
                </div>
                <div className="text-orange-500 font-bold mb-2">Standard Edition</div>
                <div className="text-gray-600 text-sm">Essential flight control features</div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 border-2 border-gray-300 p-3 text-center">
                  <div className="font-bold text-xs">ESP32 DUAL-CORE</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3 text-center">
                  <div className="font-bold text-xs">WIFI ENABLED</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3 text-center">
                  <div className="font-bold text-xs">USB TYPE-C</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3 text-center">
                  <div className="font-bold text-xs">COMPACT DESIGN</div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3">
                <h4 className="font-bold text-black text-sm">TECHNICAL SPECIFICATIONS</h4>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold">PROCESSOR:</span>
                    <span>ESP32-S3 Dual Core</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">FREQUENCY:</span>
                    <span>240MHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">MEMORY:</span>
                    <span>512KB SRAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">CONNECTIVITY:</span>
                    <span>Wi-Fi 802.11b/g/n</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">PORTS:</span>
                    <span>USB-C, 6x PWM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Version B */}
            <div className="bg-white border-4 border-black p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-black">VERSION B</h3>
                  <div className="bg-gray-400 text-white px-3 py-1 border-2 border-black font-bold text-xs">
                    CONCEPT PHASE
                  </div>
                </div>
                <div className="text-orange-500 font-bold mb-2">Professional Edition</div>
                <div className="text-gray-600 text-sm">Advanced features & sensors</div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 border-2 border-gray-300 p-3 text-center">
                  <div className="font-bold text-xs">ESP32 DUAL-CORE</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3 text-center">
                  <div className="font-bold text-xs">WIFI & BLUETOOTH</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3 text-center">
                  <div className="font-bold text-xs">ONBOARD IMU</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3 text-center">
                  <div className="font-bold text-xs">ADVANCED PCB</div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3">
                <h4 className="font-bold text-black text-sm">TECHNICAL SPECIFICATIONS</h4>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold">PROCESSOR:</span>
                    <span>ESP32-S3 Dual Core</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">FREQUENCY:</span>
                    <span>240MHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">MEMORY:</span>
                    <span>512KB SRAM + 8MB PSRAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">CONNECTIVITY:</span>
                    <span>Wi-Fi + Bluetooth 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">PORTS:</span>
                    <span>USB-C, 8x PWM, I2C, SPI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ESP32 Hardware Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 border-2 border-black font-bold text-sm mb-4">
              <Cpu className="w-4 h-4" />
              <span>HARDWARE OVERVIEW</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black font-mono">
              ESP32 BOARD LAYOUT
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Visual Board Representation */}
            <div className="bg-white border-4 border-black p-8">
              <h3 className="text-xl font-bold text-black mb-6 text-center">BOARD SCHEMATIC</h3>
              
              {/* PCB Visual */}
              <div className="relative bg-green-600 border-4 border-black p-6 mb-6 min-h-[300px]">
                {/* ESP32 Chip */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border-2 border-white p-4">
                  <div className="text-white text-xs font-bold text-center">ESP32-S3</div>
                  <div className="text-white text-xs text-center">DUAL CORE</div>
                </div>
                
                {/* GPIO Pins Left */}
                <div className="absolute left-2 top-8 space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-4 h-2 bg-yellow-400 border border-black"></div>
                  ))}
                  <div className="text-xs font-bold text-white mt-2">GPIO</div>
                </div>
                
                {/* GPIO Pins Right */}
                <div className="absolute right-2 top-8 space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-4 h-2 bg-yellow-400 border border-black"></div>
                  ))}
                  <div className="text-xs font-bold text-white mt-2">GPIO</div>
                </div>
                
                {/* USB Connector */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 border-2 border-white p-2">
                  <div className="text-white text-xs font-bold">USB-C</div>
                </div>
                
                {/* Power LED */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 border border-black rounded-full"></div>
                <div className="absolute top-2 right-8 text-xs font-bold text-white">PWR</div>
                
                {/* Reset Button */}
                <div className="absolute top-2 left-2 w-4 h-4 bg-gray-400 border-2 border-black rounded"></div>
                <div className="absolute top-2 left-8 text-xs font-bold text-white">RST</div>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 border border-black"></div>
                  <span>PCB Base Layer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-black border border-gray-300"></div>
                  <span>ESP32-S3 Microcontroller</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 border border-black"></div>
                  <span>GPIO Pin Headers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-800 border border-white"></div>
                  <span>USB-C Connector</span>
                </div>
              </div>
            </div>

            {/* Pin Configuration */}
            <div className="bg-white border-4 border-black p-8">
              <h3 className="text-xl font-bold text-black mb-6">PIN CONFIGURATION</h3>
              
              <div className="space-y-4">
                <div className="border-2 border-gray-300 p-4">
                  <h4 className="font-bold text-black mb-2">POWER PINS</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>3V3 - 3.3V Output</div>
                    <div>5V - 5V Input</div>
                    <div>GND - Ground</div>
                    <div>VIN - External Power</div>
                  </div>
                </div>
                
                <div className="border-2 border-gray-300 p-4">
                  <h4 className="font-bold text-black mb-2">DIGITAL I/O</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>GPIO 0-21 - Digital I/O</div>
                    <div>GPIO 25-27 - PWM Ready</div>
                    <div>GPIO 32-39 - ADC Input</div>
                    <div>GPIO 1,3 - UART TX/RX</div>
                  </div>
                </div>
                
                <div className="border-2 border-gray-300 p-4">
                  <h4 className="font-bold text-black mb-2">COMMUNICATION</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>I2C - SDA/SCL</div>
                    <div>SPI - MOSI/MISO/SCK</div>
                    <div>UART - Multiple Ports</div>
                    <div>CAN - Bus Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 border-2 border-black font-bold text-sm mb-4">
              <Layers className="w-4 h-4" />
              <span>TECHNICAL DEEP DIVE</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black font-mono">
              DETAILED SPECIFICATIONS
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Processing & Memory */}
            <div className="bg-white border-4 border-black p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-black">PROCESSING</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">CPU Architecture</div>
                  <div className="text-sm text-gray-600">Xtensa LX7 Dual-Core</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Clock Speed</div>
                  <div className="text-sm text-gray-600">240 MHz Max</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">SRAM</div>
                  <div className="text-sm text-gray-600">512 KB Internal</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Flash Memory</div>
                  <div className="text-sm text-gray-600">8 MB External</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">PSRAM</div>
                  <div className="text-sm text-gray-600">8 MB Optional</div>
                </div>
              </div>
            </div>

            {/* Sensors & Peripherals */}
            <div className="bg-white border-4 border-black p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Gauge className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-black">SENSORS</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">IMU</div>
                  <div className="text-sm text-gray-600">6-axis Gyro + Accel</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Magnetometer</div>
                  <div className="text-sm text-gray-600">3-axis Compass</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Barometer</div>
                  <div className="text-sm text-gray-600">Altitude Sensing</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Temperature</div>
                  <div className="text-sm text-gray-600">Internal Sensor</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">ADC</div>
                  <div className="text-sm text-gray-600">12-bit Resolution</div>
                </div>
              </div>
            </div>

            {/* Power & Performance */}
            <div className="bg-white border-4 border-black p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Battery className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-black">POWER</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Operating Voltage</div>
                  <div className="text-sm text-gray-600">3.0V - 3.6V</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Active Current</div>
                  <div className="text-sm text-gray-600">80mA @ 240MHz</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Sleep Current</div>
                  <div className="text-sm text-gray-600">5μA Deep Sleep</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Battery Support</div>
                  <div className="text-sm text-gray-600">LiPo Connector</div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-3">
                  <div className="font-bold text-black">Charging</div>
                  <div className="text-sm text-gray-600">USB-C PD Support</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Programming & Software */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 border-2 border-black font-bold text-sm mb-4">
              <Code className="w-4 h-4" />
              <span>SOFTWARE PLATFORM</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black font-mono">
              PROGRAMMING INTERFACE
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Development Environment */}
            <div className="bg-white border-4 border-black p-8">
              <h3 className="text-xl font-bold text-black mb-6">DEVELOPMENT TOOLS</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 border-2 border-gray-300 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Code className="w-5 h-5 text-orange-500" />
                    <div className="font-bold text-black">Arduino IDE</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Compatible with Arduino IDE 2.0+. Simple drag-and-drop programming 
                    with extensive library support.
                  </div>
                </div>
                
                <div className="bg-gray-50 border-2 border-gray-300 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cog className="w-5 h-5 text-orange-500" />
                    <div className="font-bold text-black">ESP-IDF Framework</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Professional development framework with FreeRTOS support and 
                    advanced debugging capabilities.
                  </div>
                </div>
                
                <div className="bg-gray-50 border-2 border-gray-300 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-orange-500" />
                    <div className="font-bold text-black">Visual Programming</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Drag-and-drop programming interface perfect for beginners and 
                    rapid prototyping.
                  </div>
                </div>
              </div>
            </div>

            {/* Firmware Features */}
            <div className="bg-white border-4 border-black p-8">
              <h3 className="text-xl font-bold text-black mb-6">FIRMWARE CAPABILITIES</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 border-2 border-gray-300 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Compass className="w-5 h-5 text-orange-500" />
                    <div className="font-bold text-black">Flight Control</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Advanced PID controllers, attitude stabilization, and 
                    autonomous flight modes.
                  </div>
                </div>
                
                <div className="bg-gray-50 border-2 border-gray-300 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wifi className="w-5 h-5 text-orange-500" />
                    <div className="font-bold text-black">Wireless Control</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Real-time telemetry, remote control via WiFi, and 
                    smartphone app integration.
                  </div>
                </div>
                
                <div className="bg-gray-50 border-2 border-gray-300 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <div className="font-bold text-black">Sensor Fusion</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Combines IMU, barometer, and GPS data for precise 
                    position and orientation tracking.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Development Progress */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-4 font-mono">
              DEVELOPMENT PROGRESS
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-bold text-black mb-4">VERSION A STATUS</h3>
              <div className="bg-orange-500 text-white px-4 py-2 border-2 border-black font-bold text-center mb-4">
                VERSION A: 75% COMPLETE
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <div>✓ Hardware design finalized</div>
                <div>✓ Core firmware development</div>
                <div>→ Testing & validation in progress</div>
                <div>→ Production preparation</div>
              </div>
            </div>
            <div className="bg-white border-4 border-black p-6">
              <h3 className="text-xl font-bold text-black mb-4">VERSION B STATUS</h3>
              <div className="bg-gray-400 text-white px-4 py-2 border-2 border-black font-bold text-center mb-4">
                VERSION B: 25% COMPLETE
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <div>✓ Concept development</div>
                <div>→ Advanced feature planning</div>
                <div>→ Hardware specification</div>
                <div>→ Development timeline TBD</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ControllerBoard;