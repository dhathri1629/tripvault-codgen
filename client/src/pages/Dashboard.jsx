import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsCard from "../components/StatsCard";
import TripList from "../components/TripList";

import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <Navbar />

      <Hero />

      <StatsCard />

      <TripList />

    </div>
  );
}

export default Dashboard;