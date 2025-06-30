import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'ALEX CHEN',
      position: 'Drone Enthusiast',
      company: 'TECH UNIVERSITY',
      content: "AEROQUE MADE DRONE PROGRAMMING ACCESSIBLE TO ME AS A COMPLETE BEGINNER. THE VISUAL CODE BLOCKS ARE INTUITIVE AND THE SIMULATION ENVIRONMENT IS INCREDIBLY REALISTIC.",
      avatar: '/api/placeholder/80/80'
    },
    {
      name: 'SARAH MARTINEZ',
      position: 'Robotics Teacher',
      company: 'STEM ACADEMY',
      content: 'I USE AEROQUE IN MY CLASSROOM TO TEACH STUDENTS ABOUT PROGRAMMING AND ROBOTICS. THE BEGINNER-FRIENDLY APPROACH HAS MADE COMPLEX CONCEPTS EASY TO UNDERSTAND.',
      avatar: '/api/placeholder/80/80'
    },
    {
      name: 'MIKE JOHNSON',
      position: 'Maker',
      company: 'DIY DRONES',
      content: 'THE MODULAR DESIGN OF AEROQUE CONTROLLERS ALLOWS FOR ENDLESS CUSTOMIZATION. PERFECT FOR PROTOTYPING AND EXPERIMENTING WITH NEW IDEAS.',
      avatar: '/api/placeholder/80/80'
    },
    {
      name: 'LISA WANG',
      position: 'Engineering Student',
      company: 'MIT',
      content: "AEROQUE'S OPEN SOURCE APPROACH AND COMPREHENSIVE DOCUMENTATION MADE IT EASY TO INTEGRATE INTO MY RESEARCH PROJECT. EXCELLENT COMMUNITY SUPPORT.",
      avatar: '/api/placeholder/80/80'
    },
    {
      name: 'DAVID BROWN',
      position: 'Drone Pilot',
      company: 'AERIAL PHOTOGRAPHY',
      content: 'THE FLIGHT SIMULATOR IS INCREDIBLY ACCURATE. I CAN TEST NEW CONFIGURATIONS AND FLIGHT PATTERNS SAFELY BEFORE TAKING TO THE SKIES.',
      avatar: '/api/placeholder/80/80'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="text-black">USER</span>
              <br />
              <span className="text-orange-500">REVIEWS</span>
            </h2>
            <div className="flex items-center justify-center space-x-2 text-black">
              <div className="w-4 h-4 bg-black border-2 border-black"></div>
              <span className="text-sm font-bold uppercase tracking-wider">REAL FEEDBACK FROM REAL USERS</span>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Display */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 border-2 border-black transition-colors duration-200 ${
                    index === currentTestimonial ? 'bg-orange-500' : 'bg-white'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Testimonial Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 border-4 border-black p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-orange-500 border-4 border-black flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-orange-500 border-4 border-black flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black tracking-wide">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-gray-600 font-mono">
                    {testimonials[currentTestimonial].position}
                  </p>
                  <p className="text-orange-500 font-bold tracking-wide">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-lg text-black leading-relaxed font-mono tracking-wide">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              {/* Rating */}
              <div className="flex items-center space-x-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-orange-500 border border-black"></div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-orange-500 tracking-wider">
              98%
            </div>
            <div className="text-gray-600 font-mono">USER SATISFACTION</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-black tracking-wider">
              5K+
            </div>
            <div className="text-gray-600 font-mono">ACTIVE USERS</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-orange-500 tracking-wider">
              2.5K+
            </div>
            <div className="text-gray-600 font-mono">PROJECTS CREATED</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;