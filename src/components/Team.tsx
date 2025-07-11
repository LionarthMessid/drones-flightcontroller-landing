import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  social: {
    linkedin: string;
    twitter: string;
  };
}

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers = [
    {
      name: 'RAHUL ASHOK',
      position: 'FOUNDER & CEO',
      bio: 'VISIONARY ENGINEER WITH 8+ YEARS IN AEROSPACE AND EMBEDDED SYSTEMS. LED THE ESP32 FLIGHT CONTROLLER DEVELOPMENT FROM CONCEPT TO PROTOTYPE. PASSIONATE ABOUT DEMOCRATIZING DRONE TECHNOLOGY.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'PRITHAM DEVPRASAD',
      position: 'CO-FOUNDER & CTO',
      bio: 'EMBEDDED SYSTEMS ARCHITECT SPECIALIZING IN ESP32 MICROCONTROLLERS AND REAL-TIME FLIGHT ALGORITHMS. PHD IN ELECTRICAL ENGINEERING. DRIVES OUR TECHNICAL INNOVATION.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'SIDDARTH S',
      position: 'HARDWARE ENGINEER',
      bio: 'PCB DESIGN SPECIALIST RESPONSIBLE FOR BOTH VERSION A AND VERSION B CONTROLLER BOARDS. EXPERT IN MINIATURIZATION AND POWER OPTIMIZATION FOR DRONE APPLICATIONS.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'MEGHA',
      position: 'SOFTWARE ENGINEER',
      bio: 'FIRMWARE DEVELOPER CREATING THE ESP32 FLIGHT CONTROL SOFTWARE. SPECIALIZES IN WIFI/BLUETOOTH CONNECTIVITY AND SENSOR FUSION ALGORITHMS.',
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
        <div className="text-center space-y-3 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-black tracking-tight">
              THE TEAM
            </h2>
            <div className="flex items-center justify-center space-x-2 text-orange-500">
              <div className="w-3 h-3 bg-orange-500 border-2 border-black"></div>
              <span className="text-xs font-bold uppercase tracking-wider">BUILDING THE FUTURE OF FLIGHT CONTROL</span>
            </div>
          </motion.div>
        </div>

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
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
              <div className="relative h-32 bg-gray-200 border-b-4 border-black flex items-center justify-center">
                <div className="w-16 h-16 bg-orange-500 border-4 border-black flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <span className="text-white font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold tracking-wide text-sm">VIEW BIO</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-black mb-1 group-hover:text-orange-500 transition-colors duration-300 tracking-wide">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-xs font-mono tracking-wide">
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
                        {selectedMember.name.split(' ').map((n: string) => n[0]).join('')}
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