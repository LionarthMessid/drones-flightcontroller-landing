import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(0);

  const faqItems = [
    {
      question: 'WHAT IS A FLIGHT CONTROLLER?',
      answer: 'A FLIGHT CONTROLLER IS THE BRAIN OF YOUR DRONE. IT PROCESSES SENSOR DATA AND CONTROLS THE MOTORS TO KEEP YOUR DRONE STABLE AND RESPONSIVE. OUR CONTROLLERS ARE DESIGNED TO BE BEGINNER-FRIENDLY WHILE OFFERING ADVANCED FEATURES FOR EXPERIENCED USERS.'
    },
    {
      question: 'WHICH FLIGHT CONTROLLER SHOULD I CHOOSE?',
      answer: 'START WITH THE FC-1 FOR BEGINNERS - IT IS STABLE AND EASY TO CONFIGURE. THE FC-PRO OFFERS ADVANCED FEATURES AND CUSTOM FIRMWARE SUPPORT. THE FC-MINI IS PERFECT FOR MICRO DRONES AND COMPACT BUILDS.'
    },
    {
      question: 'HOW DO I FLASH FIRMWARE?',
      answer: 'OUR CONTROLLERS SUPPORT STANDARD FIRMWARE FLASHING TOOLS. CONNECT VIA USB, SELECT YOUR BOARD TYPE, AND UPLOAD THE FIRMWARE. WE PROVIDE DETAILED GUIDES AND PRE-CONFIGURED FIRMWARE IMAGES FOR EASY SETUP.'
    },
    {
      question: 'IS AEROQUE OPEN SOURCE?',
      answer: 'ABSOLUTELY. WE BELIEVE IN OPEN SOURCE DEVELOPMENT. OUR HARDWARE DESIGNS, FIRMWARE, AND DOCUMENTATION ARE FREELY AVAILABLE. THIS ALLOWS THE COMMUNITY TO CONTRIBUTE, MODIFY, AND IMPROVE OUR PRODUCTS.'
    },
    {
      question: 'WHAT SKILL LEVEL IS REQUIRED?',
      answer: 'AEROQUE IS DESIGNED FOR ALL SKILL LEVELS. COMPLETE BEGINNERS CAN START WITH OUR FC-1 CONTROLLER AND BASIC SETUP, WHILE ADVANCED USERS CAN ACCESS LOW-LEVEL CONTROLS AND CUSTOM FIRMWARE DEVELOPMENT.'
    },
    {
      question: 'HOW DO I GET STARTED?',
      answer: 'START WITH OUR FC-1 STARTER KIT WHICH INCLUDES A FLIGHT CONTROLLER, BASIC COMPONENTS, AND SETUP GUIDES. FOLLOW OUR STEP-BY-STEP TUTORIALS TO BUILD YOUR FIRST DRONE AND CONFIGURE YOUR FLIGHT CONTROLLER.'
    },
    {
      question: 'WHAT SUPPORT IS AVAILABLE?',
      answer: 'WE PROVIDE COMPREHENSIVE DOCUMENTATION, VIDEO TUTORIALS, COMMUNITY FORUMS, AND DIRECT SUPPORT. OUR ACTIVE COMMUNITY OF MAKERS AND DEVELOPERS IS ALWAYS READY TO HELP WITH QUESTIONS AND PROJECTS.'
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-900 border-t-4 border-green-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-green-500 tracking-tight">
              FAQ
            </h2>
            <div className="flex items-center justify-center space-x-2 text-green-500">
              <div className="w-4 h-4 bg-green-500 border-2 border-green-300"></div>
              <span className="text-sm font-bold uppercase tracking-wider">FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <p className="text-green-300 font-mono">
              EVERYTHING YOU NEED TO KNOW ABOUT FLIGHT CONTROLLERS
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
              className="bg-black border-4 border-green-500 overflow-hidden hover:border-green-300 transition-colors duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-green-500 pr-4 tracking-wide">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItem === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-8 h-8 bg-green-500 border-2 border-green-300 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-black" />
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
                      <div className="bg-gray-800 border-4 border-green-500 p-4">
                        <p className="text-green-300 leading-relaxed font-mono tracking-wide">
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
          <p className="text-green-300 mb-6 font-mono">
            STILL HAVE QUESTIONS? WE'RE HERE TO HELP.
          </p>
          <motion.a
            href="#programs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 border-4 border-green-500 text-green-500 px-6 py-3 font-bold tracking-wide hover:bg-green-500 hover:text-black transition-all duration-200"
          >
            <span>VIEW CONTROLLERS</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;