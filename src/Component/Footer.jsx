// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-300 to-indigo-400 shadow-inner py-4 text-center">
    <p className="text-black font-medium">
      © {new Date().getFullYear()} FlightDelayTracker. All rights reserved.
    </p>
  </footer>
);

export default Footer;
