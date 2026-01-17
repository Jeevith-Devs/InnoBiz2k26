/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, Instagram, Linkedin, Globe, ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white py-16 border-t border-white/10 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Brand */}
        <div>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            InnoBiz <span className="text-orange-500">2K26</span>
          </h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Department of Computer Science & Business Systems
            <br />
            Vel Tech Multi Tech Dr.Rangarajan Dr.Sakunthala Engineering College
            <br />
            An Autonomous Institution
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 bg-white/5 rounded-xl hover:bg-orange-600 transition-all hover:-translate-y-1"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-all hover:-translate-y-1"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 bg-white/5 rounded-xl hover:bg-green-600 transition-all hover:-translate-y-1"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider text-orange-500">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About Symposium
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-white transition-colors">
                Event Details
              </a>
            </li>
            <li>
              <a href="#rules" className="hover:text-white transition-colors">
                Rules & Regulations
              </a>
            </li>
            <li>
              <a
                href="https://forms.google.com"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                Register Now
              </a>
            </li>
          </ul>
        </div>

        {/* Location & Map */}
        <div>
          <h3 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider text-orange-500">
            Venue
          </h3>
          <div className="flex items-start gap-4 text-gray-400 mb-6">
            <div className="p-2 bg-white/10 rounded-lg shrink-0">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-sm leading-relaxed">
              <span className="text-white font-bold block mb-1">
                Palani Murugan Hall
              </span>
              Vel Tech Multi Tech,
              <br />
              #42, Avadi - Vel Tech Road,
              <br />
              Vel Nagar, Chennai - 600062.
            </p>
          </div>

          {/* Google Map */}
          <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg border border-white/10 mb-3">
            <iframe
              className="contact-map-link"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15538.289090378987!2d80.106764!3d13.189347!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5289d88af459f3%3A0xa73242f57fb44db9!2sVel%20Tech%20Multi%20Tech%20Dr.Rangarajan%20Dr.Sakunthala%20Engineering%20College(Autonomous)!5e0!3m2!1sen!2sin!4v1739545875570!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{border: 0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <a
            href="https://maps.app.goo.gl/WqekMmz3ALnd16xH7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest group"
          >
            Get Directions{" "}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-600 text-sm">
        <p>&copy; 2026 InnoBiz Symposium. All rights reserved.</p>
        <p className="mt-1">Designed by VTMT CSBS Dept.</p>
      </div>
    </footer>
  );
};

export default Footer;
