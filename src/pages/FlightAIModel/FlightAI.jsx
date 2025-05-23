import React, { useState, useEffect } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMapMarkerAlt,
  FaHashtag,
  FaRedo,
} from "react-icons/fa";
import { WiThermometer, WiStrongWind } from "react-icons/wi";
import Select from "react-select";

// const API_BASE_URL = "http://127.0.0.1:8000";
const API_BASE_URL = "https://ml-python-z0g9.onrender.com";

const FlightAI = () => {
  // --- dropdown data + loading/error
  const [flightNumbers, setFlightNumbers] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [errorFlights, setErrorFlights] = useState(null);

  // --- selected flight & details + loading/error
  const [flightNumber, setFlightNumber] = useState("");
  const [flightDetails, setFlightDetails] = useState(null);
  console.log("dasdsad", flightDetails);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // --- prediction state + loading/error
  const [predictedDelay, setPredictedDelay] = useState(null);
  const [modelAccuracy, setModelAccuracy] = useState(null);
  const [loadingPredict, setLoadingPredict] = useState(false);
  const [errorPredict, setErrorPredict] = useState(null);

  // Fetch all flight numbers on mount
  useEffect(() => {
    const loadFlights = async () => {
      setLoadingFlights(true);
      setErrorFlights(null);
      try {
        const res = await fetch(`${API_BASE_URL}/get_all_flights`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json(); // ["U21265","7L218","TK862",…]
        setFlightNumbers(data);
      } catch (err) {
        console.error(err);
        setErrorFlights("Could not load flights");
      } finally {
        setLoadingFlights(false);
      }
    };
    loadFlights();
  }, []);

  // Fetch flight details on Search
  const handleSubmit = async () => {
    if (!flightNumber) return;
    setLoadingDetails(true);
    setErrorDetails(null);
    setFlightDetails(null);
    setPredictedDelay(null);
    setModelAccuracy(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/get_flight_details?flight_number=${flightNumber}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const d = await res.json();
      setFlightDetails({
        date: d.DATE,
        number: d.FLIGHT,
        from: d.FROM.replace("_", " "),
        to: d.TO.replace("_", " "),
        airline: d.AIRLINE,
        aircraft: d.AIRCRAFT,
        status: d.STATUS,
        temp_depart: d.TEMPERRATURE_departures,
        wind_depart: d.WIND_departures,
        dir_depart: d.DIRECTION_departures,
        temp_arrival: d.TEMPERRATURE_arrival,
        wind_arrival: d.WIND_arrival,
        dir_arrival: d.DIRECTION_arrival,
        sched_depart: d.scheduled_departures,
        actual_depart: d.actual_departures,
        sched_arrival: d.scheduled_arrival,
        actual_arrival: d.actual_arrival,
        delay_depart: d.delay_departure,
        delay_arrival: d.delay_arrival,
        direction_departure: d.direction_departure,
        direction_arrival: d.direction_arrival,
        scheduled_departure_hour: d.scheduled_departure_hour,
      });
    } catch (err) {
      console.error(err);
      setErrorDetails("Could not load flight details");
    } finally {
      setLoadingDetails(false);
    }
  };

  // Call your AI-model API on Predict
  const handlePredict = async () => {
    if (!flightDetails) return;
    setLoadingPredict(true);
    setErrorPredict(null);
    setPredictedDelay(null);
    setModelAccuracy(null);

    try {
      const res = await fetch(
        // `http://localhost:3400/api/predict-arrival-delay`,
        `https://fly.truet.net/api/predict-arrival-delay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            TEMPERRATURE_departures: flightDetails.temp_depart,
            WIND_departures: flightDetails.wind_depart,
            DIRECTION_departures: flightDetails.dir_depart,
            WIND_arrival: flightDetails.wind_arrival,
            delay_departure: flightDetails.delay_depart,
            direction_departure: flightDetails.direction_departure,
            direction_arrival: flightDetails.direction_arrival,
            scheduled_departure_hour: flightDetails.scheduled_departure_hour,
          }),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log("ress", data);
      setPredictedDelay(data.predicted_arrival_delay);
      setModelAccuracy(data.prediction_confidence);
    } catch (err) {
      console.error(err);
      setErrorPredict("Prediction failed");
    } finally {
      setLoadingPredict(false);
    }
  };

  const handleReset = () => {
    setFlightNumber("");
    setFlightDetails(null);
    setPredictedDelay(null);
    setModelAccuracy(null);
    setErrorDetails(null);
    setErrorPredict(null);
  };

  const flightOptions = flightNumbers.map((num) => ({
    value: num,
    label: num,
  }));

  return (
    <div className="rounded-md min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2 drop-shadow-lg">
              ✈️ AI Model by Gemini
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Lookup past flights and see demo delay predictions.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-400 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <FaRedo className="mr-2" />
            Reset
          </button>
        </header>

        {/* Search Form */}
        <section className="bg-white dark:bg-gray-850 rounded-2xl shadow-lg p-8 mb-10">
          <div className="relative  max-w-sm mx-auto ">
            <FaPlaneDeparture className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 z-10 pointer-events-none" />

            <div className="cursor-pointer">
              {" "}
              {/* padding to match icon spacing */}
              <Select
                value={
                  flightNumber
                    ? flightOptions.find(
                        (option) => option.value === flightNumber
                      )
                    : null
                }
                onChange={(selected) => setFlightNumber(selected?.value || "")}
                isDisabled={loadingFlights}
                options={flightOptions}
                placeholder={
                  loadingFlights
                    ? "Loading flights…"
                    : errorFlights
                    ? errorFlights
                    : "Select Flight #"
                }
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    paddingLeft: "1.75rem", // spacing to account for icon
                    backgroundColor: "#f3f4f6", // Tailwind gray-100
                    borderColor: "#e5e7eb", // Tailwind gray-200
                    minHeight: "3rem",
                    boxShadow: "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 20,
                  }),
                }}
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={!flightNumber || loadingDetails}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-full shadow-lg transform hover:-translate-y-0.5 transition"
            >
              {loadingDetails ? "Searching…" : "🔍 Search"}
            </button>
            {errorDetails && (
              <p className="mt-2 text-red-500">{errorDetails}</p>
            )}
          </div>
        </section>

        {/* Flight Details & Prediction */}
        {flightDetails && (
          <section className="bg-white dark:bg-gray-850 rounded-2xl shadow-2xl p-8">
            {/* Flight Info */}
            <div className="flex flex-col md:flex-row md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                  Flight {flightDetails.number}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {flightDetails.from} → {flightDetails.to}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium
    ${
      flightDetails.status === "Scheduled"
        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
        : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
    }`}
                >
                  {flightDetails.status}
                </span>
                <p className="text-gray-500 dark:text-gray-400">
                  {flightDetails.date || "-"}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {[
                {
                  icon: <FaPlaneDeparture />,
                  label: "Sched Dept",
                  value: flightDetails.sched_depart,
                },
                {
                  icon: <FaPlaneDeparture />,
                  label: "Actual Dept",
                  value: flightDetails.actual_depart,
                },
                {
                  icon: <FaPlaneArrival />,
                  label: "Sched Arr",
                  value: flightDetails.sched_arrival,
                },
                {
                  icon: <FaPlaneArrival />,
                  label: "Actual Arr",
                  value: flightDetails.actual_arrival,
                },
                {
                  icon: <WiThermometer />,
                  label: "Temp Dep (°C)",
                  value: flightDetails.temp_depart,
                },
                {
                  icon: <WiStrongWind />,
                  label: "Wind Dep (km/h)",
                  value: flightDetails.wind_depart,
                },
                {
                  icon: <WiThermometer />,
                  label: "Temp Arr (°C)",
                  value: flightDetails.temp_arrival,
                },
                {
                  icon: <WiStrongWind />,
                  label: "Wind Arr (km/h)",
                  value: flightDetails.wind_arrival,
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: "Delay Dept",
                  value:
                    flightDetails.delay_depart &&
                    flightDetails.delay_depart !== 0
                      ? `${flightDetails.delay_depart} min`
                      : "N/A",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: "Delay Arr",
                  value:
                    flightDetails.delay_arrival &&
                    flightDetails.delay_arrival !== 0
                      ? `${flightDetails.delay_arrival} min`
                      : "N/A",
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-inner"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-700 rounded-full mr-4 text-2xl">
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {label}
                    </p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Prediction UI */}
            {(predictedDelay !== null || loadingPredict || errorPredict) && (
              <div className="mt-8">
                {loadingPredict && <p>Predicting…</p>}
                {errorPredict && <p className="text-red-500">{errorPredict}</p>}
                {!loadingPredict &&
                  !errorPredict &&
                  predictedDelay !== null && (
                    <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                        🔮 Model Prediction by AI Model (Gemini)
                      </h3>
                      <p className="text-gray-700 dark:text-gray-200">
                        Predicted Delay Arrival:{" "}
                        <span className="font-bold">{predictedDelay} min</span>
                      </p>
                      <p className="text-gray-700 dark:text-gray-200">
                        Model Accuracy:{" "}
                        <span className="font-bold">{modelAccuracy}%</span>
                      </p>
                    </div>
                  )}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 border border-gray-400 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <FaRedo className="mr-2" />
                Reset
              </button>
              <button
                onClick={handlePredict}
                disabled={loadingPredict}
                className="inline-flex items-center bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform hover:-translate-y-0.5 transition"
              >
                {loadingPredict ? "Predicting…" : "🔮 Predict Delay"}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default FlightAI;
