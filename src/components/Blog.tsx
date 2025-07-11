import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'ESP32 FLIGHT CONTROLLER DEVELOPMENT UPDATE',
      excerpt: 'LATEST PROGRESS ON OUR ESP32-BASED FLIGHT CONTROLLER. VERSION A PROTOTYPING AND EARLY TESTING RESULTS.',
      author: 'ALEX CHEN',
      date: 'JUN 28, 2025',
      category: 'DEVELOPMENT',
      readTime: '4 MIN READ'
    },
    {
      title: 'DUAL-CORE PROCESSING FOR FLIGHT CONTROL',
      excerpt: 'HOW WE\'RE LEVERAGING ESP32\'S DUAL-CORE ARCHITECTURE FOR ENHANCED FLIGHT PERFORMANCE AND STABILITY.',
      author: 'SARAH MARTINEZ', 
      date: 'JUN 25, 2025',
      category: 'TECHNICAL',
      readTime: '6 MIN READ'
    },
    {
      title: 'VERSION A VS VERSION B: DESIGN DECISIONS',
      excerpt: 'EXPLORING THE TECHNICAL DIFFERENCES BETWEEN OUR TWO PLANNED FLIGHT CONTROLLER VERSIONS.',
      author: 'DAVID KIM',
      date: 'JUN 22, 2025',
      category: 'HARDWARE',
      readTime: '5 MIN READ'
    },
    {
      title: 'WIRELESS CONNECTIVITY IN DRONE CONTROL',
      excerpt: 'THE ADVANTAGES OF WI-FI AND BLUETOOTH INTEGRATION IN MODERN FLIGHT CONTROLLERS.',
      author: 'MAYA PATEL',
      date: 'JUN 20, 2025',
      category: 'CONNECTIVITY',
      readTime: '4 MIN READ'
    },
    {
      title: 'BUILDING A STARTUP AROUND ESP32',
      excerpt: 'OUR JOURNEY FROM CONCEPT TO PROTOTYPE: CHALLENGES AND BREAKTHROUGHS IN ESP32 FLIGHT CONTROLLER DEVELOPMENT.',
      author: 'ALEX CHEN',
      date: 'JUN 18, 2025',
      category: 'STARTUP',
      readTime: '7 MIN READ'
    },
    {
      title: 'SIMULATION PLATFORM DEVELOPMENT',
      excerpt: 'HOW WE CREATED AN ACCURATE ESP32 FLIGHT SIMULATION ENVIRONMENT FOR PRE-HARDWARE TESTING.',
      author: 'SARAH MARTINEZ',
      date: 'JAN 3, 2025',
      category: 'SAFETY',
      readTime: '10 MIN READ'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-100 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
              DEVELOPMENT UPDATES
            </h2>
            <div className="flex items-center space-x-2 text-orange-500">
              <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
              <span className="text-sm font-bold uppercase tracking-wider">STARTUP JOURNEY</span>
            </div>
          </motion.div>

          <motion.a
            href="#blog-all"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="hidden lg:flex items-center space-x-2 text-orange-500 hover:text-black transition-colors duration-200 group font-bold tracking-wide"
          >
            <span>VISIT BLOG</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </div>

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border-4 border-black overflow-hidden hover:border-orange-500 transition-all duration-300 group cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(255,165,0,0.3)]"
            >
              {/* Featured Image Placeholder */}
              <div className="relative h-48 bg-gray-200 border-b-4 border-black flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-bold tracking-wide">FEATURED IMAGE</span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-orange-500 border-4 border-white flex items-center justify-center"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta */}
                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 bg-orange-500 text-white font-bold tracking-wide border-2 border-black">
                    {post.category}
                  </span>
                  <span className="text-gray-500 font-mono">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black leading-tight group-hover:text-orange-500 transition-colors duration-300 tracking-wide">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed font-mono">
                  {post.excerpt}
                </p>

                {/* Author & Date */}
                <div className="flex items-center justify-between pt-4 border-t-4 border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 border-2 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-black font-bold tracking-wide">BY {post.author}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm font-mono">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:hidden"
        >
          <motion.a
            href="#blog-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 border-4 border-black font-bold tracking-wide hover:bg-orange-600 transition-all duration-200 group"
          >
            <span>VISIT BLOG</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;