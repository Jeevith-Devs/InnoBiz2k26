/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Contact', href: '#footer' },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="glass-card rounded-full max-w-7xl mx-auto px-6 py-3 flex justify-between items-center shadow-lg shadow-orange-500/10">
        <div className="font-heading font-black text-xl md:text-2xl tracking-tight text-orange-600 flex items-center gap-1">
          INNOBIZ<span className="text-yellow-500">2K26</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-bold uppercase tracking-wide text-gray-700 hover:text-orange-600 transition-colors"
              data-hover="true"
            >
              {link.name}
            </button>
          ))}
          <button 
            className="bg-gradient-to-r from-orange-600 to-amber-500 text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:scale-105"
            data-hover="true"
            onClick={() => scrollTo('#events')}
          >
            Register
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden mt-2 mx-4 bg-white/95 backdrop-blur-md rounded-2xl border border-orange-100 shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-heading font-bold text-xl text-gray-800 hover:text-orange-600"
                >
                  {link.name}
                </button>
              ))}
              <button 
                 className="mt-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white py-3 rounded-xl font-bold uppercase tracking-widest"
                 onClick={() => scrollTo('#events')}
              >
                Register Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;