import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, TrendingUp, Users, DollarSign, Award } from 'lucide-react';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const portfolioItems = [
    {
      name: 'AEROQUE FC-1',
      category: 'Flight Controller',
      description: 'Entry-level flight controller for beginners',
      stats: {
        users: '2.5K',
        projects: '500+',
        rating: '4.8/5',
        downloads: '15K'
      },
      tags: ['BEGINNER', 'STABLE']
    },
    {
      name: 'AEROQUE FC-PRO', 
      category: 'Flight Controller',
      description: 'Advanced controller with custom firmware',
      stats: {
        users: '1.2K',
        projects: '300+',
        rating: '4.9/5',
        downloads: '8K'
      },
      tags: ['ADVANCED', 'CUSTOM']
    },
    {
      name: 'AEROQUE MINI',
      category: 'Flight Controller',
      description: 'Compact controller for micro drones',
      stats: {
        users: '1.8K',
        projects: '400+',
        rating: '4.4/5',
        downloads: '9K'
      },
      tags: ['COMPACT', 'MICRO']
    },
    {
      name: 'AEROQUE FC-RACING',
      category: 'Flight Controller',
      description: 'High-speed racing flight controller',
      stats: {
        users: '900',
        projects: '200+',
        rating: '4.7/5',
        downloads: '5K'
      },
      tags: ['RACING', 'FAST']
    },
    {
      name: 'AEROQUE FC-GPS',
      category: 'Flight Controller',
      description: 'GPS-enabled navigation controller',
      stats: {
        users: '1.5K',
        projects: '350+',
        rating: '4.6/5',
        downloads: '7K'
      },
      tags: ['GPS', 'NAVIGATION']
    },
    {
      name: 'AEROQUE FC-CUSTOM',
      category: 'Flight Controller',
      description: 'Fully customizable open-source board',
      stats: {
        users: '750',
        projects: '150+',
        rating: '4.9/5',
        downloads: '3K'
      },
      tags: ['CUSTOM', 'OPEN SOURCE']
    }
  ];

  const categories = ['all', 'Flight Controller'];

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-black border-t-4 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center space-x-2 text-green-500">
              <div className="w-4 h-4 bg-green-500 border-2 border-green-300"></div>
              <span className="text-sm font-bold uppercase tracking-wider">OUR CONTROLLERS</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
              <span className="text-green-500">FLIGHT</span>
              <br />
              <span className="text-green-300">CONTROLLERS</span>
            </h2>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 border-4 border-green-500 font-bold tracking-wide transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-green-500 text-black shadow-[4px_4px_0px_0px_rgba(0,255,0,0.3)]'
                    : 'bg-black text-green-500 hover:bg-gray-900'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-900 border-4 border-green-500 overflow-hidden hover:border-green-300 transition-all duration-300 group shadow-[8px_8px_0px_0px_rgba(0,255,0,0.1)] hover:shadow-[8px_8px_0px_0px_rgba(0,255,0,0.3)]"
            >
              {/* Header */}
              <div className="p-6 border-b-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-green-500 text-black text-sm font-bold tracking-wide border-2 border-green-300">
                    {item.category.toUpperCase()}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className="w-8 h-8 bg-gray-800 border-2 border-green-500 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-colors duration-300"
                  >
                    <ArrowRight className="w-4 h-4 text-green-500 group-hover:text-black" />
                  </motion.button>
                </div>
                <h3 className="text-xl font-bold text-green-500 mb-2 group-hover:text-green-300 transition-colors duration-300 tracking-wide">
                  {item.name}
                </h3>
                <p className="text-green-300 text-sm leading-relaxed font-mono">
                  {item.description.toUpperCase()}
                </p>
              </div>

              {/* Stats */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-green-500 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="font-bold">{item.stats.users}</span>
                    </div>
                    <div className="text-xs text-green-300 font-mono">USERS</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold">{item.stats.projects}</span>
                    </div>
                    <div className="text-xs text-green-300 font-mono">PROJECTS</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-green-500 mb-1">
                      <Award className="w-4 h-4" />
                      <span className="font-bold">{item.stats.rating}</span>
                    </div>
                    <div className="text-xs text-green-300 font-mono">RATING</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-bold">{item.stats.downloads}</span>
                    </div>
                    <div className="text-xs text-green-300 font-mono">DOWNLOADS</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-green-500 text-black text-xs font-bold border border-green-300 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#faq"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 border-4 border-green-500 text-green-500 px-8 py-4 font-bold tracking-wide hover:bg-green-500 hover:text-black transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,255,0,0.3)]"
          >
            <span>LEARN MORE</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;