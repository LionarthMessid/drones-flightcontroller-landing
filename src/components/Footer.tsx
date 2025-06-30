import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Mail } from 'lucide-react';
import ASCIIText from './ASCIIText';

const Footer = () => {
  const ecosystemLinks = [
    { name: 'FLIGHT SIMULATOR', url: '#' },
    { name: 'CODE BLOCKS', url: '#' }
  ];

  const quickLinks = [
    { name: 'HOME', url: '/' },
    { name: 'GET STARTED', url: '/start' }
  ];

  const legalLinks = [
    { name: 'PRIVACY POLICY', url: '/privacy' },
    { name: 'TERMS OF SERVICE', url: '/terms' },
    { name: 'OPEN SOURCE LICENSE', url: '/license' }
  ];

  const socialLinks = [
    { name: 'GITHUB', url: '#' },
    { name: 'TWITTER', url: '#' },
    { name: 'LINKEDIN', url: '#' },
    { name: 'YOUTUBE', url: '#' }
  ];

  return (
    <footer className="bg-white border-t-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 space-y-12">
          {/* Newsletter Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 border-4 border-black flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AQ</span>
                </div>
                <span className="text-xl font-bold text-black tracking-wider">AEROQUE</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-black tracking-wide">STAY UPDATED*</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL"
                    className="w-full px-4 py-3 bg-gray-100 border-4 border-black text-black placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors duration-200 font-mono"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-white px-6 py-3 border-4 border-black font-bold tracking-wide hover:bg-orange-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>SUBSCRIBE</span>
                  <Mail className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-sm text-gray-500 font-mono">*ONLY VALUABLE UPDATES</p>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Ecosystem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-black uppercase tracking-wider">ECOSYSTEM</h4>
              <ul className="space-y-3">
                {ecosystemLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center space-x-2 group font-mono"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-black uppercase tracking-wider">QUICK LINKS</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-mono"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-black uppercase tracking-wider">LEGAL</h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-mono"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-black uppercase tracking-wider">FOLLOW US</h4>
              <ul className="space-y-3">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center space-x-2 group font-mono"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* ASCII Text Section */}
        <div className="relative h-64 border-t-4 border-black">
          <ASCIIText
            text="AEROQUE"
            enableWaves={true}
            asciiFontSize={8}
          />
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t-4 border-black">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 text-gray-600 font-mono"
            >
              <span>© 2025</span>
              <span>ALL RIGHTS RESERVED BY AEROQUE.COM</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6"
            >
              {/* Decorative elements */}
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
                <div className="w-4 h-4 bg-black border-2 border-black"></div>
                <div className="w-4 h-4 bg-orange-500 border-2 border-black"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;