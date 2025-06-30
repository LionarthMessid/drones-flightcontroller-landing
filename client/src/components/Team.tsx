import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Linkedin, Twitter } from 'lucide-react';

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: 'RAHUL ASHOK',
      position: 'CO-FOUNDER & CEO',
      bio: 'VISIONARY LEADER WITH EXPERTISE IN DRONE TECHNOLOGY AND HARDWARE DESIGN. PASSIONATE ABOUT MAKING COMPLEX TECHNOLOGY ACCESSIBLE TO EVERYONE.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'PRITHAM DEVPRASAD',
      position: 'CO-FOUNDER & CTO',
      bio: 'TECHNICAL ARCHITECT SPECIALIZING IN EMBEDDED SYSTEMS AND FLIGHT CONTROL ALGORITHMS. DRIVES THE TECHNICAL INNOVATION AT AEROQUE.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'MEGHA',
      position: 'CO-FOUNDER & CPO',
      bio: 'PRODUCT STRATEGIST FOCUSED ON USER EXPERIENCE AND VISUAL PROGRAMMING INTERFACES. ENSURES AEROQUE PRODUCTS ARE INTUITIVE AND USER-FRIENDLY.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'SIDDARTH',
      position: 'CO-FOUNDER & CMO',
      bio: 'MARKETING AND COMMUNITY LEADER WHO BUILDS BRIDGES BETWEEN TECHNOLOGY AND USERS. CHAMPIONS THE OPEN SOURCE PHILOSOPHY AT AEROQUE.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-100 border-t-4 border-black">
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
              OUR TEAM
            </h2>
            <div className="flex items-center justify-center space-x-2 text-black">
              <div className="w-4 h-4 bg-black border-2 border-black"></div>
              <span className="text-sm font-bold uppercase tracking-wider">BUILT BY MAKERS FOR MAKERS</span>
            </div>
          </motion.div>
        </div>

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border-4 border-black overflow-hidden hover:border-orange-500 transition-all duration-300 group cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(255,165,0,0.3)]"
              onClick={() => setSelectedMember(member)}
            >
              {/* Avatar */}
              <div className="relative h-48 bg-gray-200 border-b-4 border-black flex items-center justify-center">
                <div className="w-24 h-24 bg-orange-500 border-4 border-black flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <span className="text-white font-bold text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold tracking-wide">VIEW BIO</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-orange-500 transition-colors duration-300 tracking-wide">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm font-mono tracking-wide">
                  {member.position}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white border-4 border-black p-8 max-w-2xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-500 border-4 border-black flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {selectedMember.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black tracking-wide">
                        {selectedMember.name}
                      </h3>
                      <p className="text-orange-500 font-bold tracking-wide">
                        {selectedMember.position}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="bg-gray-100 border-4 border-black p-6">
                    <p className="text-black leading-relaxed font-mono tracking-wide">
                      {selectedMember.bio}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 font-bold tracking-wide">CONNECT:</span>
                    <a
                      href={selectedMember.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={selectedMember.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors duration-200"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Team;