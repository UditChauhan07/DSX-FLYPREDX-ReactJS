import React, { useState } from "react";
import { FaPlus, FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { WiThermometer, WiStrongWind } from "react-icons/wi";
import axios from "axios";

const initialForm = {
  DATE: "",
  TIME: "",
  FLIGHT: "",
  FROM: "",
  TO: "",
  AIRLINE: "",
  AIRCRAFT: "",
  STATUS: "",
  TEMPERRATURE_departures: "",
  WIND_departures: "",
  DIRECTION_departures: "",
  TEMPERRATURE_arrival: "",
  WIND_arrival: "",
  DIRECTION_arrival: "",
  scheduled_departures: "",
  actual_departures: "",
  scheduled_arrival: "",
  actual_arrival: "",
  delay_departure: "",
  delay_arrival: "",
  direction_departure: "",
  direction_arrival: "",
  scheduled_departure_hour: "",
  scheduled_arrival_hour: "",
};

const AddFlightData = () => {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const BASE_Url = "http://127.0.0.1:8000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.entries(formData).every(([k, v]) => v !== "");

    if (!isValid) {
      setError("All fields are required.");
      return;
    }

    const parsedData = {
      ...formData,
      TEMPERRATURE_departures: parseFloat(formData.TEMPERRATURE_departures),
      WIND_departures: parseFloat(formData.WIND_departures),
      DIRECTION_departures: parseInt(formData.DIRECTION_departures),
      TEMPERRATURE_arrival: parseFloat(formData.TEMPERRATURE_arrival),
      WIND_arrival: parseFloat(formData.WIND_arrival),
      DIRECTION_arrival: parseInt(formData.DIRECTION_arrival),
      delay_departure: parseInt(formData.delay_departure),
      delay_arrival: parseInt(formData.delay_arrival),
      direction_departure: parseInt(formData.direction_departure),
      direction_arrival: parseInt(formData.direction_arrival),
      scheduled_departure_hour: parseInt(formData.scheduled_departure_hour),
      scheduled_arrival_hour: parseInt(formData.scheduled_arrival_hour),
    };

    try {
      const response = await axios.post(
        `${BASE_Url}/add_flight_data`,
        parsedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Saved flight:", parsedData);
      if (response.status === 200) {
        console.log("Server response:", response);
        setSuccess(true);
      }

      // setError(null);
      // setFormData(initialForm);
    } catch (err) {
      console.error("Error saving flight:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
      );
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-300 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl w-full mx-auto bg-gradient-to-br from-blue-100 to-white dark:bg-gray-850 rounded-2xl shadow-2xl p-10">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-12 flex items-center">
          <FaPlus className="mr-4" />
          Add New Flight
        </h1>

        <form onSubmit={handleSubmit} className="space-y-14  md:text-lg">
          {/* Flight Details */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              ✈️ Flight Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                "DATE",
                "TIME",
                "FLIGHT",
                "FROM",
                "TO",
                "AIRLINE",
                "AIRCRAFT",
                "STATUS",
              ].map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                  >
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="
            w-full
            px-4 py-2
            text-sm
            rounded-md
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-blue-400 focus:outline-none
          "
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Weather Details */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              🌤️ Weather Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                "TEMPERRATURE_departures",
                "WIND_departures",
                "DIRECTION_departures",
                "TEMPERRATURE_arrival",
                "WIND_arrival",
                "DIRECTION_arrival",
              ].map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                  >
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Timing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              ⏱️ Timing Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                "scheduled_departures",
                "actual_departures",
                "scheduled_arrival",
                "actual_arrival",
              ].map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                  >
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Delays & Metadata */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              🕑 Delays & Metadata
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                "delay_departure",
                "delay_arrival",
                "direction_departure",
                "direction_arrival",
                "scheduled_departure_hour",
                "scheduled_arrival_hour",
              ].map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                  >
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Error or Success */}
          {error && <p className="text-red-500 font-semibold">{error}</p>}
          {success && (
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Flight added successfully!
            </p>
          )}

          {/* Submit Button */}
          <div className=" flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 text-lg rounded-full shadow-lg transform hover:-translate-y-0.5 transition"
            >
              ➕ Add Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlightData;
