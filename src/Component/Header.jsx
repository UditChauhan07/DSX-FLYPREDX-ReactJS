// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="flex items-center justify-between bg-gradient-to-r from-blue-300 to-indigo-400 shadow px-6 py-4">
    <Link
  to="/"
  className="
    inline-block
    px-4 py-2
    bg-blue-600 text-white font-semibold
    rounded-lg shadow
    hover:bg-blue-700
    
    transition-colors duration-200
  "
>
  Home
</Link>
    <h1 className="text-2xl font-bold text-gray-800">
      Flight Prediction Arrival Delay
    </h1>
    <div style={{ width: '2rem' }} /> {/* spacer */}
  </header>
);

export default Header;
