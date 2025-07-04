
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Cpu, Monitor, Radio, Zap, Target, Globe, Users } from 'lucide-react';

const Roadmap = () => {
  const roadmapItems = [
    {
      quarter: 'Q3 2025',
      phase: 'Foundation',
      items: [
        {
          title: 'ESP32 Flight Controller v2.0',
          description: 'Enhanced dual-core architecture with improved IMU integration',
          category: 'Controller',
          icon: <Cpu className="w-5 h-5" />,
          progress: 75
        },
        {
          title: 'Advanced Physics Engine',
          description: 'Realistic flight dynamics and environmental factors',
          category: 'Simulation',
          icon: <Monitor className="w-5 h-5" />,
          progress: 60
        }
      ]
    },
    {
      quarter: 'Q4 2025',
      phase: 'Integration',
      items: [
        {
          title: 'Wireless Communication Suite',
          description: 'WiFi, Bluetooth, and LoRa connectivity modules',
          category: 'Controller',
          icon: <Radio className="w-5 h-5" />,
          progress: 30
        },
        {
          title: 'Multi-Environment Support',
          description: 'Urban, forest, and weather simulation environments',
          category: 'Simulation',
          icon: <Globe className="w-5 h-5" />,
          progress: 45
        }
      ]
    },
    {
      quarter: 'Q1 2026',
      phase: 'Enhancement',
      items: [
        {
          title: 'AI-Powered Flight Assistance',
          description: 'Machine learning for autonomous navigation and obstacle avoidance',
          category: 'Controller',
          icon: <Zap className="w-5 h-5" />,
          progress: 15
        },
        {
          title: 'Collaborative Flight Simulation',
          description: 'Multi-drone scenarios and swarm intelligence testing',
          category: 'Simulation',
          icon: <Users className="w-5 h-5" />,
          progress: 20
        }
      ]
    },
    {
      quarter: 'Q2 2026',
      phase: 'Deployment',
      items: [
        {
          title: 'Production-Ready Hardware',
          description: 'Manufacturing-optimized controller with certification',
          category: 'Controller',
          icon: <Target className="w-5 h-5" />,
          progress: 5
        },
        {
          title: 'Cloud-Based Simulation Platform',
          description: 'Scalable simulation infrastructure with real-time collaboration',
          category: 'Simulation',
          icon: <Globe className="w-5 h-5" />,
          progress: 10
        }
      ]
    }
  ];

  const getCategoryColor = (category) => {
    return category === 'Controller' ? 'bg-blue-500' : 'bg-green-500';
  };

  const getCategoryBorder = (category) => {
    return category === 'Controller' ? 'border-blue-500' : 'border-green-500';
  };

  return (
    <section id="roadmap" className="py-20 bg-gray-50">
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
              DEVELOPMENT ROADMAP
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-xl text-gray-600 font-mono max-w-3xl mx-auto">
              Our strategic timeline for controller and simulation development
            </p>
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 border-2 border-black"></div>
              <span className="text-sm font-bold font-mono">CONTROLLER</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 border-2 border-black"></div>
              <span className="text-sm font-bold font-mono">SIMULATION</span>
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div className="max-w-6xl mx-auto">
            <div className="space-y-12">
              {roadmapItems.map((quarter, quarterIndex) => (
                <motion.div
                  key={quarterIndex}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: quarterIndex * 0.2 }}
                  className="relative"
                >
                  {/* Quarter Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500 border-4 border-black flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-bold text-black font-mono">
                          {quarter.quarter}
                        </div>
                        <div className="text-sm font-bold text-orange-500 font-mono uppercase tracking-wider">
                          {quarter.phase} Phase
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quarter Items */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {quarter.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + itemIndex * 0.1 }}
                        className="bg-white border-4 border-black p-6 hover:shadow-lg transition-shadow duration-200"
                      >
                        <div className="space-y-4">
                          {/* Item Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 ${getCategoryColor(item.category)} border-2 border-black flex items-center justify-center`}>
                                <div className="text-white">
                                  {item.icon}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-black font-mono">
                                  {item.title}
                                </h3>
                                <div className={`inline-flex items-center px-2 py-1 border-2 ${getCategoryBorder(item.category)} text-xs font-bold tracking-wider`}>
                                  {item.category}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 font-mono leading-relaxed">
                            {item.description}
                          </p>

                          {/* Progress */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-gray-600 font-mono">
                                PROGRESS
                              </span>
                              <span className="text-sm font-bold text-black font-mono">
                                {item.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 border-2 border-black h-4">
                              <div 
                                className={`h-full ${getCategoryColor(item.category)} transition-all duration-500`}
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Connecting line */}
                  {quarterIndex < roadmapItems.length - 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="w-0.5 h-12 bg-gray-300"></div>
                    </div>
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
                JOIN THE DEVELOPMENT
              </h3>
              <p className="text-gray-700 font-mono mb-6">
                Be part of the future of flight control systems. Follow our progress, 
                contribute feedback, and help shape the development roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 text-white px-6 py-3 border-4 border-black font-bold text-sm tracking-wide hover:bg-orange-600 transition-all duration-200">
                  FOLLOW PROGRESS
                </button>
                <button className="bg-white text-black px-6 py-3 border-4 border-black font-bold text-sm tracking-wide hover:bg-gray-100 transition-all duration-200">
                  CONTRIBUTE IDEAS
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Roadmap;
