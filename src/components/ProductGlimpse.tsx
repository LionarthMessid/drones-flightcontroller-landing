import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Gamepad2, ArrowRight } from 'lucide-react';

const ProductGlimpse = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12"
        >
          {/* Section Header */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black font-mono tracking-tight">
              PRODUCT GLIMPSE
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-xl text-gray-600 font-mono max-w-3xl mx-auto">
              Currently under development - Building the next generation of drone technology
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-12 pt-12">
            
            {/* Controller Boards */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="bg-gray-50 border-4 border-black p-8 transition-all duration-300 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="space-y-6">
                  <div className="w-20 h-20 mx-auto bg-orange-500 border-4 border-black flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-black font-mono">CONTROLLER BOARDS</h3>
                    <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-3 py-1 border-2 border-black font-bold text-xs tracking-wider">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      <span>IN DEVELOPMENT</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 font-mono leading-relaxed">
                    ESP32-based flight controllers with dual-core processing, WiFi & Bluetooth connectivity, 
                    onboard IMU, and compact PCB design. Available in Version A & B configurations.
                  </p>
                  
                  <div className="space-y-2 text-left">
                    <div className="text-sm font-mono text-gray-600">
                      <span className="text-orange-500">▸</span> ESP32 DUAL-CORE PROCESSOR
                    </div>
                    <div className="text-sm font-mono text-gray-600">
                      <span className="text-orange-500">▸</span> WIFI & BLUETOOTH READY
                    </div>
                    <div className="text-sm font-mono text-gray-600">
                      <span className="text-orange-500">▸</span> USB TYPE-C INTERFACE
                    </div>
                    <div className="text-sm font-mono text-gray-600">
                      <span className="text-orange-500">▸</span> ONBOARD IMU SENSOR
                    </div>
                  </div>

                  <motion.a
                    href="/controller"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 border-4 border-black font-bold text-sm tracking-wide hover:bg-gray-800 transition-all duration-200"
                  >
                    <span>LEARN MORE</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Simulators */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <div className="bg-gray-50 border-4 border-black p-8 transition-all duration-300 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="space-y-6">
                  <div className="w-20 h-20 mx-auto bg-black border-4 border-black flex items-center justify-center">
                    <Gamepad2 className="w-10 h-10 text-orange-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-black font-mono">SIMULATORS</h3>
                    <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-3 py-1 border-2 border-black font-bold text-xs tracking-wider">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      <span>IN DEVELOPMENT</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 font-mono leading-relaxed">
                    Advanced flight simulation environments for testing and development. 
                    Real-time physics, multiple scenarios, and comprehensive flight data analysis.
                  </p>
                  
                  <div className="space-y-2 text-left">
                    <div className="text-sm font-mono text-gray-600">
                      <span className="text-orange-500">▸</span> REAL-TIME PHYSICS ENGINE
                    </div>
                    <div className="text-sm font-mono text-gray-600">
                      <span className="text-orange-500">▸</span> MULTIPLE FLIGHT SCENARIOS
                    </div>
                    <div className="text-sm font-mono text-gray-600">
                      <span className="text-orange-500">▸</span> COMPREHENSIVE DATA ANALYSIS
                    </div>
                    <div className="text-sm font-mono text-gray-600">
                      <span className="text-orange-500">▸</span> DEVELOPER-FRIENDLY API
                    </div>
                  </div>

                  <motion.a
                    href="/simulation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 border-4 border-black font-bold text-sm tracking-wide hover:bg-orange-600 transition-all duration-200"
                  >
                    <span>TRY DEMO</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGlimpse;