import React from "react";
import FlightML from "./pages/FlightMLModel/FlightML";
import FlightAI from "./pages/FlightAIModel/FlightAI";
import FlightShivam from "./pages/FlightShivam/FlightShivam";
import AddFlightData from "./pages/FlightData/AddFlightData";
import Header from "./Component/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Home/HomeScreen";
import Footer from "./Component/Footer";

function App() {
  return (
    <>
      {/* <div className="m-10"> */}
      {/* <h2 className="text-4xl font-bold text-center text-blue-600 mb-8 tracking-wide">
          Flight Delay Tracker
        </h2> */}
      {/* <div>
          <AddFlightData/>
        </div> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <FlightML />
          <FlightShivam />
          <FlightAI />
        </div> */}
      {/* </div> */}
      <Router>
        <Header />

        <Routes>
          {/* Home screen with two big buttons */}
          <Route path="/" element={<HomeScreen />} />

          {/* “Add Flight” page */}
          <Route path="/add" element={<AddFlightData />} />

          {/* “Flight Delay Tracker” page */}
          <Route
            path="/tracker"
            element={
              <div className="bg-gradient-to-r from-blue-200 to-indigo-300 py-10 px-8 grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <FlightML />
                <FlightShivam />
                <FlightAI />
              </div>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
