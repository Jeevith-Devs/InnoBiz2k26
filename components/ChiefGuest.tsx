/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';

const ChiefGuest: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl font-bold mb-16">Guest of <span className="text-orange-600">Honor</span></h2>
        
        <motion.div 
          className="relative max-w-md mx-auto aspect-[3/4] rounded-2xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden"
          animate={{ borderColor: ['#e5e7eb', '#f97316', '#e5e7eb'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            animate={{ scale: [1, 1.03, 1], opacity: [0.95, 1, 0.95] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img
              src="/images/chief-guest.png"
              alt="Chief Guest"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default ChiefGuest;