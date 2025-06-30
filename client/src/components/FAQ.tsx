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
      question: 'HOW DO CODE BLOCKS WORK?',
      answer: 'OUR VISUAL PROGRAMMING SYSTEM LETS YOU CREATE FLIGHT PROGRAMS BY DRAGGING AND DROPPING CODE BLOCKS. NO NEED TO LEARN COMPLEX SYNTAX - JUST CONNECT BLOCKS TO DEFINE BEHAVIORS, MOVEMENTS, AND RESPONSES. PERFECT FOR BEGINNERS AND EDUCATIONAL USE.'
    },
    {
      question: 'CAN I SIMULATE BEFORE FLYING?',
      answer: 'YES! OUR BUILT-IN SIMULATOR LETS YOU TEST YOUR PROGRAMS SAFELY BEFORE REAL FLIGHT. THE SIMULATION IS PHYSICS-ACCURATE AND INCLUDES REALISTIC DRONE BEHAVIOR, WEATHER CONDITIONS, AND ENVIRONMENTAL FACTORS.'
    },
    {
      question: 'IS AEROQUE OPEN SOURCE?',
      answer: 'ABSOLUTELY. WE BELIEVE IN OPEN SOURCE DEVELOPMENT. OUR HARDWARE DESIGNS, SOFTWARE, AND DOCUMENTATION ARE FREELY AVAILABLE. THIS ALLOWS THE COMMUNITY TO CONTRIBUTE, MODIFY, AND IMPROVE OUR PRODUCTS.'
    },
    {
      question: 'WHAT SKILL LEVEL IS REQUIRED?',
      answer: 'AEROQUE IS DESIGNED FOR ALL SKILL LEVELS. COMPLETE BEGINNERS CAN START WITH OUR VISUAL PROGRAMMING INTERFACE, WHILE ADVANCED USERS CAN ACCESS LOW-LEVEL CONTROLS AND CUSTOM FIRMWARE DEVELOPMENT.'
    },
    {
      question: 'HOW DO I GET STARTED?',
      answer: 'START WITH OUR STARTER KIT WHICH INCLUDES A FLIGHT CONTROLLER, BASIC COMPONENTS, AND ACCESS TO OUR SIMULATOR. FOLLOW OUR STEP-BY-STEP TUTORIALS TO BUILD YOUR FIRST DRONE AND CREATE YOUR FIRST FLIGHT PROGRAM.'
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
            <div className="flex items-center justify-center space-x-2 text-black">
              <div className="w-4 h-4 bg-black border-2 border-black"></div>
              <span className="text-sm font-bold uppercase tracking-wider">FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <p className="text-gray-600 font-mono">
              EVERYTHING YOU NEED TO KNOW ABOUT AEROQUE
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