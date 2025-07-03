import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Target, Users, Rocket } from 'lucide-react';

const Programs = () => {
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = [
    {
      title: 'AEROQUE FC-1',
      subtitle: 'Beginner Board',
      description: 'Entry-level flight controller',
      icon: <Target className="w-8 h-8" />,
      features: ['BEGINNER', 'STABLE', 'OPEN SOURCE', 'PLUG & PLAY'],
      details: 'Perfect for beginners learning flight control. Easy setup with stable performance and open-source firmware.'
    },
    {
      title: 'AEROQUE FC-PRO',
      subtitle: 'Advanced Board',
      description: 'Professional flight controller',
      icon: <Rocket className="w-8 h-8" />,
      features: ['ADVANCED', 'CUSTOM', 'HIGH PERFORMANCE', 'MODULAR'],
      details: 'Advanced flight controller with custom firmware support and high-performance capabilities for experienced users.'
    }
  ];

  const supportServices = [
    'Hardware configuration',
    'Firmware flashing', 
    'Flight tuning',
    'Real-time monitoring',
    'Component testing',
    'Performance optimization',
    'Safety protocols',
    'Documentation access',
    'Community support',
    'Firmware updates',
    'Custom modifications'
  ];

  return (
    <section id="programs" className="py-20 bg-gray-900 border-t-4 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flight Controllers Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 text-green-500">
                  <div className="w-4 h-4 bg-green-500 border-2 border-green-300"></div>
                  <span className="text-sm font-bold uppercase tracking-wider">HARDWARE SOLUTIONS</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-green-500 tracking-tight">
                  FLIGHT CONTROLLERS
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {['BEGINNER', 'MODULAR', 'OPEN SOURCE', 'PLUG & PLAY'].map((feature, index) => (
                    <motion.div
                      key={feature}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 border-4 border-green-500 bg-black text-center font-bold tracking-wide relative overflow-hidden group hover:bg-green-500 hover:text-black transition-all duration-200"
                    >
                      <span className="relative z-10 text-green-500 group-hover:text-black">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 bg-green-500 text-black px-6 py-3 border-4 border-green-300 font-bold tracking-wide hover:bg-green-600 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,255,0,0.3)]"
                >
                  <span>VIEW CONTROLLERS</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gray-800 border-4 border-green-500 p-8 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 border-4 border-green-500 flex items-center justify-center"
                >
                  <div className="w-32 h-32 bg-green-500 border-4 border-green-300 flex items-center justify-center">
                    <Target className="w-16 h-16 text-black" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Flight Controller Services Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center space-x-2 text-green-500"
            >
              <div className="w-4 h-4 bg-green-500 border-2 border-green-300"></div>
              <span className="text-sm font-bold uppercase tracking-wider">CONTROLLER SERVICES</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-green-500 tracking-tight"
            >
              SUPPORT & FEATURES
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-green-300 max-w-2xl mx-auto font-mono"
            >
              COMPREHENSIVE SUPPORT FOR YOUR FLIGHT CONTROLLER. SETUP TO ADVANCED TUNING.
            </motion.p>
          </div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {supportServices.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-black border-4 border-green-500 hover:border-green-300 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 border-2 border-green-300 flex items-center justify-center flex-shrink-0 group-hover:bg-green-300 transition-colors duration-200">
                    <span className="text-black font-bold text-sm">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-bold text-green-500 group-hover:text-green-300 transition-colors duration-200 tracking-wide">
                    {service.toUpperCase()}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-green-500 text-black px-8 py-4 border-4 border-green-300 font-bold text-lg tracking-wide hover:bg-green-600 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,255,0,0.3)]"
            >
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Programs;