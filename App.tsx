/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Countdown from './components/Countdown';
import Events from './components/Events';
import PrizePool from './components/PrizePool';
import Rules from './components/Rules';
import ChiefGuest from './components/ChiefGuest';
import Coordinators from './components/Coordinators';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  useEffect(() => {
    // Optional: Add global listeners or initializations here
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-orange-500 selection:text-white cursor-auto md:cursor-none bg-[#fff7ed]">
      <CustomCursor />
      <Navbar />
      {/* Background audio player (uses public/sandhanam.mp3) */}
      <React.Suspense fallback={null}>
        {/* Lazy import to reduce initial bundle size */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {React.createElement(React.lazy(() => import('./components/BackgroundAudioMinimal')))}
      </React.Suspense>
      <main>
        <Hero />
        <About />
        <Countdown />
        <Events />
        <PrizePool />
        <Rules />
        <ChiefGuest />
        <Coordinators />
      </main>
      <Footer />
    </div>
  );
};

export default App;