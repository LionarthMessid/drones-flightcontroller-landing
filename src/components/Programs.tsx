import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Target, Users, Rocket } from 'lucide-react';

const Programs = () => {
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = [
    {
      title: 'FLIGHT CONTROLLERS',
      subtitle: 'Hardware Solutions',
      description: 'Easy configuration boards',
      icon: <Target className="w-8 h-8" />,
      features: ['BEGINNER', 'MODULAR', 'OPEN SOURCE', 'PLUG & PLAY'],
      details: 'Our flight controllers are designed for beginners with easy configuration and modular design for maximum flexibility.'
    },
    {
      title: 'CODE BLOCKS',
      subtitle: 'Visual Programming',
      description: 'Drag and drop coding',
      icon: <Rocket className="w-8 h-8" />,
      features: ['VISUAL CODING', 'NO SYNTAX', 'REAL-TIME', 'BEGINNER FRIENDLY'],
      details: 'Program your drones using visual code blocks. No complex syntax required - just drag, drop, and fly.'
    }
  ];

  const supportServices = [
    'Hardware configuration',
    'Visual programming', 
    'Flight simulation',
    'Real-time debugging',
    'Component testing',
    'Performance optimization',
    'Safety protocols',
    'Documentation access',
    'Community support',
    'Firmware updates',
    'Custom modifications'
  ];

  return (
    <section id="programs" className="py-20 bg-gray-100 border-t-4 border-black">
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
                <div className="flex items-center space-x-2 text-orange-500">
                  <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
                  <span className="text-sm font-bold uppercase tracking-wider">HARDWARE SOLUTIONS</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
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
                      className="p-4 border-4 border-black bg-white text-center font-bold tracking-wide relative overflow-hidden group hover:bg-orange-500 hover:text-white transition-all duration-200"
                    >
                      <span className="relative z-10">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  href="#controllers"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 border-4 border-black font-bold tracking-wide hover:bg-orange-600 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
              <div className="aspect-square bg-gray-200 border-4 border-black p-8 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 border-4 border-orange-500 flex items-center justify-center"
                >
                  <div className="w-32 h-32 bg-orange-500 border-4 border-black flex items-center justify-center">
                    <Target className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Code Blocks Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center space-x-2 text-black"
            >
              <div className="w-4 h-4 bg-black border-2 border-black"></div>
              <span className="text-sm font-bold uppercase tracking-wider">VISUAL PROGRAMMING</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-black tracking-tight"
            >
              CODE BLOCKS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto font-mono"
            >
              DRAG. DROP. FLY. NO COMPLEX SYNTAX REQUIRED. VISUAL PROGRAMMING FOR EVERYONE.
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
                className="p-6 bg-white border-4 border-black hover:border-orange-500 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 border-2 border-black flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors duration-200">
                    <span className="text-white font-bold text-sm">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-bold text-black group-hover:text-orange-500 transition-colors duration-200 tracking-wide">
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
              href="#simulator"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 border-4 border-black font-bold text-lg tracking-wide hover:bg-gray-800 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(255,165,0,1)]"
            >
              <span>TRY SIMULATOR</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Programs;