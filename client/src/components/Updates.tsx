import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, GitBranch, Zap } from 'lucide-react';

const Updates = () => {
  const updates = [
    {
      date: 'July 2025',
      type: 'Development',
      title: 'ESP32 Flight Controller v2.0',
      description: 'Enhanced dual-core architecture with improved IMU integration and expanded GPIO capabilities.',
      status: 'In Progress',
      icon: <GitBranch className="w-5 h-5" />
    },
    {
      date: 'June 2025',
      type: 'Platform',
      title: 'Web-based Simulation Environment',
      description: 'Real-time flight simulation with WebGL rendering and physics engine integration.',
      status: 'In Development',
      icon: <Zap className="w-5 h-5" />
    },
    {
      date: 'May 2025',
      type: 'Release',
      title: 'ESP32 Flight Controller v1.0',
      description: 'Initial prototype release featuring basic flight control and wireless connectivity.',
      status: 'Completed',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

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
              UPDATES
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-xl text-gray-600 font-mono max-w-3xl mx-auto">
              Stay updated with our latest developments and milestones
            </p>
          </div>

          {/* Updates Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {updates.map((update, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Date */}
                    <div className="md:w-32 flex-shrink-0">
                      <div className="text-sm font-bold text-orange-500 font-mono">
                        {update.date}
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex items-center justify-center w-12 h-12 bg-orange-500 border-4 border-black flex-shrink-0">
                      <div className="text-white">
                        {update.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-gray-50 border-4 border-black p-6">
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="md:hidden text-orange-500">
                              {update.icon}
                            </div>
                            <span className="text-xs font-bold text-gray-500 font-mono uppercase tracking-wider">
                              {update.type}
                            </span>
                          </div>
                          <div className={`inline-flex items-center px-3 py-1 border-2 border-black text-xs font-bold tracking-wider ${
                            update.status === 'Completed' 
                              ? 'bg-green-500 text-white' 
                              : update.status === 'In Progress'
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-200 text-black'
                          }`}>
                            {update.status === 'In Progress' && (
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-2"></div>
                            )}
                            {update.status}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-black font-mono">
                          {update.title}
                        </h3>
                        
                        <p className="text-gray-700 font-mono leading-relaxed">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connecting line for desktop */}
                  {index < updates.length - 1 && (
                    <div className="hidden md:block absolute left-[8.75rem] top-12 w-0.5 h-8 bg-gray-300"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <div className="bg-gray-100 border-4 border-black p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-black font-mono mb-4">
                STAY IN THE LOOP
              </h3>
              <p className="text-gray-700 font-mono mb-6">
                Follow our development journey and be the first to know about new releases, 
                features, and technical breakthroughs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 text-white px-6 py-3 border-4 border-black font-bold text-sm tracking-wide hover:bg-orange-600 transition-all duration-200">
                  SUBSCRIBE TO UPDATES
                </button>
                <button className="bg-white text-black px-6 py-3 border-4 border-black font-bold text-sm tracking-wide hover:bg-gray-100 transition-all duration-200">
                  VIEW CHANGELOG
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Updates;