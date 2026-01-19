/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Users, FileText, Award, Medal, Download } from 'lucide-react';
import { Event } from '../types';

const EVENTS: Event[] = [
  {
    id: 'tech1',
    name: 'Code Arena',
    category: 'Technical',
    description: 'A competitive coding battle where optimization meets speed. Solve complex algorithmic problems against the clock.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    rules: ['Individual participation', 'Languages: C++, Java, Python', 'Time limit: 2 hours', 'Plagiarism checks enabled'],
    teamSize: '2-3',
    // Google Form link for Code Arena
    formLink: 'https://forms.gle/LxBTcFxRV7dr16Pu8',
    // PDF rules file path
    rulesFile: '/rules/code-arena-rules.pdf',
    prizes: {
      first: '₹3000',
      second: '₹2000',
      third: '₹1000'
    }
  },
  {
    id: 'tech2',
    name: 'Clone It',
    category: 'Technical',
    description: 'Replicate a given UI design with pixel-perfect accuracy using modern frontend technologies.',
    image: 'https://images.unsplash.com/photo-1519222970733-f546218fa6d7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rules: ['Team of 2 max', 'Frameworks allowed: React, Vue, HTML/CSS', 'Responsive design required', 'Submission via GitHub'],
    teamSize: '2-3',
    // Google Form link for Clone It
    formLink: 'https://forms.gle/yQ3D88vJwwTmsWTJ8',
    // PDF rules file path
    rulesFile: '/rules/clone-it-rules.pdf',
    prizes: {
      first: '₹3000',
      second: '₹2000',
      third: '₹1000'
    }
  },
  {
    id: 'nontech1',
    name: 'Brain Wave',
    category: 'Non-Technical',
    description: 'A test of wits, logic, and general knowledge. From business trivia to lateral thinking puzzles.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rules: ['Team of 2', '3 Rounds: Quiz, Connection, Rapid Fire', 'No electronic gadgets', 'Decision of judges is final'],
    teamSize: '2',
    // Google Form link for Brain Wave
    formLink: 'https://forms.gle/hP6vptvwawEL7gjn9',
    // PDF rules file path
    rulesFile: '/rules/brain-wave-rules.pdf',
    prizes: {
      first: '₹2000',
      second: '₹1000',
      third: '₹500'
    }
  },
  {
    id: 'nontech2',
    name: 'Reel Riddle',
    category: 'Non-Technical',
    description: 'Decide the movie or tech concept from a series of reels and visual cues.',
    image: 'https://images.unsplash.com/photo-1602492665157-639323eadd31?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rules: ['Team of 2-3', 'Visual rounds only', 'Buzzer round included', 'Tie-breaker if needed'],
    teamSize: '2',
    // Google Form link for Reel Riddle
    formLink: 'https://forms.gle/pEKBwXXDRXmtHRNC6',
    // PDF rules file path
    rulesFile: '/rules/reel-riddle-rules.pdf',
    prizes: {
      first: '₹2000',
      second: '₹1000',
      third: '₹500'
    }
  }
];

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Disable body scroll when modal is open
  React.useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  // Function to handle PDF download
  const handleDownloadRules = (event: Event) => {
    if (event.rulesFile) {
      const link = document.createElement('a');
      link.href = event.rulesFile;
      link.download = `${event.name.toLowerCase().replace(/\s+/g, '-')}-rules.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="events" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our <span className="text-orange-600">Events</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Challenge yourself in technical prowess or showcase your creative thinking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EVENTS.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer group"
              onClick={() => setSelectedEvent(event)}
              data-hover="true"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-orange-600">
                  {event.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm font-semibold text-orange-600">
                    View Details &rarr;
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); window.open(event.formLink || 'https://forms.gle', '_blank'); }}
                    className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-2 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                  >
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <div 
            className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative my-8"
              >
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors z-20 text-white md:text-black md:bg-white/50 md:hover:bg-white/80"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 md:h-72">
                  <img src={selectedEvent.image} alt={selectedEvent.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6 md:p-8">
                    <div>
                      <span className="inline-block px-3 py-1 mb-3 rounded-full bg-orange-500 text-white text-xs font-bold uppercase tracking-widest">
                        {selectedEvent.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl text-white font-heading font-bold">{selectedEvent.name}</h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">{selectedEvent.description}</p>
                  
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    {/* Team Size */}
                     <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <div className="p-3 bg-white rounded-full shadow-sm text-gray-700">
                         <Users className="w-6 h-6" />
                       </div>
                       <div>
                         <div className="text-sm text-gray-500 uppercase font-bold">Team Size</div>
                         <div className="font-bold text-gray-900">{selectedEvent.teamSize} Members</div>
                       </div>
                     </div>

                    {/* Prize Breakdown */}
                     <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                       <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-orange-800">
                         <Trophy className="w-5 h-5 text-orange-600" />
                         Prize Pool Breakdown
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-100 flex items-center justify-between md:block md:text-center">
                            <div className="flex items-center gap-3 md:block md:gap-0">
                               <Trophy className="w-5 h-5 text-yellow-500 md:mx-auto md:mb-2" />
                               <span className="text-xs font-bold text-gray-500 uppercase">1st Prize</span>
                            </div>
                            <div className="font-bold text-xl text-gray-900">{selectedEvent.prizes.first}</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-100 flex items-center justify-between md:block md:text-center">
                            <div className="flex items-center gap-3 md:block md:gap-0">
                               <Award className="w-5 h-5 text-gray-400 md:mx-auto md:mb-2" />
                               <span className="text-xs font-bold text-gray-500 uppercase">2nd Prize</span>
                            </div>
                            <div className="font-bold text-xl text-gray-900">{selectedEvent.prizes.second}</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-100 flex items-center justify-between md:block md:text-center">
                            <div className="flex items-center gap-3 md:block md:gap-0">
                               <Medal className="w-5 h-5 text-orange-400 md:mx-auto md:mb-2" />
                               <span className="text-xs font-bold text-gray-500 uppercase">3rd Prize</span>
                            </div>
                            <div className="font-bold text-xl text-gray-900">{selectedEvent.prizes.third}</div>
                          </div>
                       </div>
                     </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="flex items-center gap-2 font-bold text-lg mb-4">
                      <FileText className="w-5 h-5 text-gray-500" />
                      Rules & Regulations
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {selectedEvent.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => selectedEvent?.formLink && window.open(selectedEvent.formLink, '_blank')}
                      className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:scale-[1.02]"
                    >
                      Register Now
                    </button>

                    {selectedEvent.rulesFile && (
                      <button
                        onClick={() => handleDownloadRules(selectedEvent)}
                        className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-gray-500/30 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download Rules
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;