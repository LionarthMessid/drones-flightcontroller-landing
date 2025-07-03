import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(0);

  const faqItems = [
    {
      question: 'WHAT MAKES THE ESP32 FLIGHT CONTROLLER SPECIAL?',
      answer: 'OUR ESP32-BASED FLIGHT CONTROLLER COMBINES POWERFUL DUAL-CORE PROCESSING WITH BUILT-IN WI-FI AND BLUETOOTH CONNECTIVITY. UNLIKE TRADITIONAL CONTROLLERS, IT OFFERS WIRELESS PROGRAMMING, REAL-TIME TELEMETRY, AND EXPANDABLE FUNCTIONALITY - ALL IN A COMPACT, COST-EFFECTIVE PACKAGE.'
    },
    {
      question: 'WHEN WILL THE FLIGHT CONTROLLER BE AVAILABLE?',
      answer: 'WE ARE CURRENTLY IN ACTIVE DEVELOPMENT WITH TWO VERSIONS PLANNED. VERSION A (STANDARD EDITION) IS IN DEVELOPMENT PHASE, WHILE VERSION B (PROFESSIONAL EDITION) IS IN CONCEPT PHASE. WE EXPECT BETA TESTING TO BEGIN WITHIN THE NEXT 6 MONTHS.'
    },
    {
      question: 'WHAT\'S THE DIFFERENCE BETWEEN VERSION A AND B?',
      answer: 'VERSION A FOCUSES ON ESSENTIAL FLIGHT CONTROL WITH ESP32 DUAL-CORE, WI-FI, AND USB-C. VERSION B ADDS BLUETOOTH 5.0, ONBOARD IMU SENSORS, EXPANDED MEMORY (8MB PSRAM), AND ADDITIONAL I/O PORTS FOR ADVANCED APPLICATIONS AND SENSOR INTEGRATION.'
    },
    {
      question: 'CAN I USE THE SIMULATION BEFORE HARDWARE RELEASE?',
      answer: 'ABSOLUTELY! OUR FLIGHT SIMULATION PLATFORM IS AVAILABLE NOW AND ACCURATELY MODELS THE ESP32 CONTROLLER\'S PERFORMANCE. YOU CAN TEST FLIGHT PATTERNS, PROCESSING CAPABILITIES, AND WIRELESS CONNECTIVITY FEATURES BEFORE THE PHYSICAL HARDWARE IS RELEASED.'
    },
    {
      question: 'WHAT DEVELOPMENT TOOLS WILL BE PROVIDED?',
      answer: 'WE\'RE DEVELOPING A COMPLETE ECOSYSTEM INCLUDING: ESP32 FIRMWARE WITH FLIGHT ALGORITHMS, WIRELESS CONFIGURATION TOOLS, REAL-TIME DEBUGGING INTERFACE, AND COMPREHENSIVE DOCUMENTATION. ALL TOOLS WILL BE OPEN-SOURCE FOR COMMUNITY DEVELOPMENT.'
    },
    {
      question: 'HOW CAN I STAY UPDATED ON DEVELOPMENT PROGRESS?',
      answer: 'JOIN OUR DEVELOPMENT JOURNEY THROUGH OUR BLOG UPDATES, GITHUB REPOSITORY, AND DEVELOPER NEWSLETTER. WE REGULARLY SHARE PROTOTYPING PROGRESS, TECHNICAL SPECIFICATIONS, AND BETA TESTING OPPORTUNITIES.'
    },
    {
      question: 'WILL THERE BE TECHNICAL SUPPORT?',
      answer: 'YES! WE\'RE BUILDING A COMPREHENSIVE SUPPORT SYSTEM INCLUDING DETAILED DOCUMENTATION, COMMUNITY FORUMS, DIRECT DEVELOPER CONTACT, AND EDUCATIONAL RESOURCES. OUR GOAL IS TO MAKE ESP32 FLIGHT CONTROL ACCESSIBLE TO EVERYONE.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 bg-white border-t-4 border-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
              FAQ
            </h2>
            <div className="flex items-center justify-center space-x-2 text-orange-500">
              <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
              <span className="text-sm font-bold uppercase tracking-wider">DEVELOPMENT QUESTIONS</span>
            </div>
            <p className="text-gray-600 font-mono">
              EVERYTHING YOU NEED TO KNOW ABOUT OUR ESP32 FLIGHT CONTROLLER
            </p>
          </motion.div>
        </div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-100 border-4 border-black overflow-hidden hover:border-orange-500 transition-colors duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-200 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-black pr-4 tracking-wide">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItem === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-8 h-8 bg-orange-500 border-2 border-black flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-white" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="bg-white border-4 border-black p-4">
                        <p className="text-black leading-relaxed font-mono tracking-wide">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6 font-mono">
            STILL HAVE QUESTIONS? WE'RE HERE TO HELP.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 border-4 border-orange-500 text-orange-500 px-6 py-3 font-bold tracking-wide hover:bg-orange-500 hover:text-white transition-all duration-200"
          >
            <span>CONTACT US</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;