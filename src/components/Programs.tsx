import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Target, Users, Rocket, Cpu, Wifi, Usb, Gauge, PcCase, Settings, Code, Eye } from 'lucide-react';

const Programs = () => {
  const [activeVersion, setActiveVersion] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const versions = [
    {
      title: 'VERSION A',
      subtitle: 'Standard Edition',
      description: 'Essential flight control features',
      features: ['ESP32 DUAL-CORE', 'WIFI ENABLED', 'USB TYPE-C', 'COMPACT DESIGN'],
      status: 'IN DEVELOPMENT',
      specs: {
        processor: 'ESP32-S3 Dual Core',
        frequency: '240MHz',
        memory: '512KB SRAM',
        connectivity: 'Wi-Fi 802.11b/g/n',
        ports: 'USB-C, 6x PWM'
      }
    },
    {
      title: 'VERSION B',
      subtitle: 'Professional Edition',
      description: 'Advanced features & sensors',
      features: ['ESP32 DUAL-CORE', 'WIFI & BLUETOOTH', 'ONBOARD IMU', 'ADVANCED PCB'],
      status: 'CONCEPT PHASE',
      specs: {
        processor: 'ESP32-S3 Dual Core',
        frequency: '240MHz',
        memory: '512KB SRAM + 8MB PSRAM',
        connectivity: 'Wi-Fi + Bluetooth 5.0',
        ports: 'USB-C, 8x PWM, I2C, SPI'
      }
    }
  ];

  const keyFeatures = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'ESP32 DUAL-CORE',
      description: 'Powerful 240MHz processor'
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: 'WIRELESS CONNECTIVITY',
      description: 'Built-in Wi-Fi & Bluetooth'
    },
    {
      icon: <Usb className="w-6 h-6" />,
      title: 'USB TYPE-C',
      description: 'Modern charging & data transfer'
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: 'ONBOARD IMU',
      description: 'Integrated motion sensors'
    },
    {
      icon: <PcCase className="w-6 h-6" />,
      title: 'COMPACT PCB',
      description: 'Optimized for drone integration'
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'EASY CONFIG',
      description: 'Simplified setup process'
    }
  ];

  return (
    <section id="controller-board" className="py-20 bg-gray-100 border-t-4 border-black">
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
            <span className="text-sm font-bold uppercase tracking-wider">ESP32 FLIGHT CONTROLLER</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-black tracking-tight"
          >
            THE CONTROLLER BOARD
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-mono"
          >
            NEXT-GENERATION ESP32-BASED FLIGHT CONTROLLER. TWO VERSIONS CURRENTLY IN DEVELOPMENT FOR DIFFERENT USE CASES.
          </motion.p>
        </div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 bg-white border-4 border-black hover:border-orange-500 transition-all duration-200 group"
              style={{ transform: `translateY(${scrollY * 0.02 * (index % 2 === 0 ? 1 : -1)}px)` }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-orange-500 border-2 border-black flex items-center justify-center group-hover:bg-black transition-colors duration-200">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-black group-hover:text-orange-500 transition-colors duration-200 tracking-wide mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-mono">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Version Comparison */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center space-x-2 text-black">
              <div className="w-4 h-4 bg-black border-2 border-black"></div>
              <span className="text-sm font-bold uppercase tracking-wider">DEVELOPMENT VERSIONS</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-black tracking-tight">
              VERSION A & B COMPARISON
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {versions.map((version, index) => (
              <motion.div
                key={version.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white border-4 border-black p-8 space-y-6 hover:border-orange-500 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-bold text-black tracking-wide">
                      {version.title}
                    </h4>
                    <div className={`px-3 py-1 border-2 border-black text-xs font-bold tracking-wider ${
                      version.status === 'IN DEVELOPMENT' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-black'
                    }`}>
                      {version.status}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-lg font-bold text-orange-500 mb-2">{version.subtitle}</p>
                    <p className="text-gray-600 font-mono">{version.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {version.features.map((feature) => (
                      <div
                        key={feature}
                        className="p-3 border-2 border-black bg-gray-50 text-center font-bold text-sm tracking-wide group-hover:bg-orange-50 transition-colors duration-200"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                    <h5 className="font-bold text-black tracking-wide">TECHNICAL SPECIFICATIONS</h5>
                    {Object.entries(version.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-bold text-gray-600 uppercase tracking-wide">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-black font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black tracking-wide">
              INTERESTED IN OUR FLIGHT CONTROLLER?
            </h3>
            <p className="text-gray-600 font-mono max-w-2xl mx-auto">
              JOIN OUR DEVELOPMENT JOURNEY. EXPERIENCE THE FUTURE OF DRONE CONTROL WITH OUR SIMULATION PLATFORM.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#simulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-4 border-4 border-black font-bold text-lg tracking-wide hover:bg-orange-600 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <Eye className="w-5 h-5" />
                <span>CHECKOUT THE SIMULATION</span>
              </motion.a>
              <motion.a
                href="#specifications"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 border-4 border-black font-bold text-lg tracking-wide hover:bg-gray-100 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <Code className="w-5 h-5" />
                <span>VIEW FULL SPECS</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;