import React from "react";
import { motion } from "framer-motion";
import { FaPlus, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="hero-content">
        <h1>🌍 Explore the World</h1>

        <p>
          Capture every journey, preserve every memory, and relive your
          adventures with TripVault.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/add-trip")}
          >
            <FaPlus />
            Start New Journey
          </button>

          <button
            className="secondary-btn"
            onClick={() => alert("Photo upload feature coming soon!")}
          >
            <FaCamera />
            Upload Photos
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;