import React from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[84vh] flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Add Flight Button */}
        <button
          onClick={() => navigate("/add")}
          className="
            px-10 py-6 text-2xl font-semibold rounded-full
            bg-blue-600 text-white shadow-lg
            transform transition duration-300
            hover:bg-blue-700 hover:shadow-xl hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-blue-300
          "
        >
          Add Flight
        </button>

        {/* Flight Delay Tracker Button */}
        <button
          onClick={() => navigate("/tracker")}
          className="
            px-10 py-6 text-2xl font-semibold rounded-full
            bg-green-600 text-white shadow-lg
            transform transition duration-300
            hover:bg-green-700 hover:shadow-xl hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-green-300
          "
        >
          Flight Delay Tracker
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
