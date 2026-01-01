/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(logoRef.current, 
      { scale: 0.5, opacity: 0, rotate: -10 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 text-white">
      
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] border-[100px] border-white/5 rounded-full border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] border-[50px] border-yellow-400/10 rounded-full"
        />
      </div>

      <div className="z-10 max-w-4xl mx-auto relative flex flex-col items-center text-center gap-6 md:gap-8 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-lg mt-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_#facc15]" />
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-white/90">29th Jan 2026 • 09:00 AM</span>
        </motion.div>

        <div className="w-full flex flex-col items-center justify-center">
          <h1 ref={logoRef} className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-0 relative z-10 drop-shadow-2xl flex items-center justify-center">
            <img src="/favicon.svg" alt="InnoBiz 2K26" className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto" />
            <span className="sr-only">InnoBiz 2K26</span>
          </h1>

          <p ref={subtitleRef} className="text-lg md:text-2xl text-orange-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-0 mt-2">
            Engineering Ideas. <span className="bg-white text-orange-600 px-2 py-0.5 rounded transform -skew-x-12 inline-block font-bold">Empowering Business.</span>
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center mt-4"
        >
          <button 
            className="group relative px-8 md:px-10 py-4 md:py-5 bg-white text-orange-600 rounded-2xl font-black tracking-widest uppercase overflow-hidden hover:scale-105 transition-all shadow-2xl shadow-orange-900/40"
            data-hover="true"
            onClick={() => window.open('https://forms.google.com', '_blank')}
          >
            <span className="relative z-10 flex items-center gap-2">
              Register Now <Zap className="w-5 h-5 fill-current" />
            </span>
            <div className="absolute inset-0 bg-yellow-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          <button 
            className="px-8 md:px-10 py-4 md:py-5 bg-orange-700/40 backdrop-blur-sm border border-white/30 text-white rounded-2xl font-bold tracking-widest uppercase hover:bg-orange-700/60 transition-colors"
            data-hover="true"
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth'})}
          >
            Explore Events
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;