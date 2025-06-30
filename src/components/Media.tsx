import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const Media = () => {
  const mediaItems = [
    {
      outlet: 'TECH CRUNCH',
      title: "AEROQUE REVOLUTIONIZES DRONE PROGRAMMING WITH VISUAL CODE BLOCKS",
      url: '#'
    },
    {
      outlet: 'DRONE WEEKLY',
      title: 'BEGINNER-FRIENDLY FLIGHT CONTROLLERS TAKE OFF WITH AEROQUE',
      url: '#'
    },
    {
      outlet: 'MAKER MAGAZINE',
      title: 'AEROQUE: THE FUTURE OF ACCESSIBLE DRONE DEVELOPMENT',
      url: '#'
    },
    {
      outlet: 'ROBOTICS NEWS',
      title: 'VISUAL PROGRAMMING MEETS DRONE CONTROL IN AEROQUE PLATFORM',
      url: '#'
    },
    {
      outlet: 'TECH REVIEW',
      title: 'AEROQUE FLIGHT SIMULATOR SETS NEW STANDARD FOR TRAINING',
      url: '#'
    },
    {
      outlet: 'INNOVATION DAILY',
      title: 'MODULAR DESIGN APPROACH MAKES DRONES ACCESSIBLE TO ALL',
      url: '#'
    },
    {
      outlet: 'STARTUP WEEKLY',
      title: 'AEROQUE TEAM BRINGS SIMPLICITY TO COMPLEX DRONE SYSTEMS',
      url: '#'
    },
    {
      outlet: 'FUTURE TECH',
      title: 'OPEN SOURCE FLIGHT CONTROLLERS DEMOCRATIZE DRONE DEVELOPMENT',
      url: '#'
    }
  ];

  return (
    <section id="media" className="py-20 bg-gray-100 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
              MEDIA PRESENCE
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono">
              FEATURED ACROSS LEADING TECH AND DRONE PUBLICATIONS WORLDWIDE
            </p>
          </motion.div>
        </div>

        {/* Media Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mediaItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border-4 border-black p-6 hover:border-orange-500 transition-all duration-300 group relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(255,165,0,0.3)]"
            >
              <div className="relative z-10 space-y-4">
                {/* Media Outlet */}
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 bg-orange-500 text-white text-sm font-bold tracking-wide border-2 border-black">
                    {item.outlet}
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.1 }}
                    className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-black font-bold leading-tight group-hover:text-orange-500 transition-colors duration-300 tracking-wide">
                  {item.title}
                </h3>

                {/* Decorative elements */}
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-orange-500 border-2 border-black group-hover:bg-black transition-colors duration-300"></div>
                  <div className="w-4 h-4 bg-black border-2 border-black group-hover:bg-orange-500 transition-colors duration-300"></div>
                  <div className="w-4 h-4 bg-orange-500 border-2 border-black group-hover:bg-black transition-colors duration-300"></div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-orange-500 tracking-wider">
              25+
            </div>
            <div className="text-gray-600 font-mono">MEDIA MENTIONS</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-black tracking-wider">
              8+
            </div>
            <div className="text-gray-600 font-mono">MAJOR PUBLICATIONS</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-orange-500 tracking-wider">
              GLOBAL
            </div>
            <div className="text-gray-600 font-mono">REACH & COVERAGE</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Media;