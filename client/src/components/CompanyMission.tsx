import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Users } from 'lucide-react';

const CompanyMission = () => {
  return (
    <section className="py-20 bg-gray-50">
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
              OUR MISSION
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl text-gray-700 font-mono leading-relaxed">
              We're building <span className="text-orange-500 font-bold">advanced, accessible flight control systems</span> that empower drone developers to create the future of autonomous flight.
            </p>
          </div>

          {/* Mission Points */}
          <div className="grid md:grid-cols-3 gap-8 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-orange-500 border-4 border-black flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black font-mono">PRECISION</h3>
              <p className="text-gray-600 font-mono">
                Building flight controllers with unmatched accuracy and reliability for professional applications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-black border-4 border-black flex items-center justify-center">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-black font-mono">INNOVATION</h3>
              <p className="text-gray-600 font-mono">
                Pushing the boundaries of what's possible with ESP32 technology and modern flight control.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-white border-4 border-black flex items-center justify-center">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black font-mono">ACCESSIBILITY</h3>
              <p className="text-gray-600 font-mono">
                Making advanced drone technology accessible to developers, educators, and enthusiasts worldwide.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyMission;