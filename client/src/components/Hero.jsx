import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaCamera, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

function Hero() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);

  const [trips, setTrips] = useState([]);

  const [selectedTripId, setSelectedTripId] = useState(null);

  const [showTripSelector, setShowTripSelector] = useState(false);

  // --------------------------------------------------
  // Get logged-in user's trips
  // --------------------------------------------------
  useEffect(() => {
    const loadTrips = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No login token found");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/trips",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("GET TRIPS ERROR:", data);
          return;
        }

        const userTrips = Array.isArray(data) ? data : [];

        console.log("User trips:", userTrips);

        setTrips(userTrips);

      } catch (error) {
        console.error("GET TRIPS ERROR:", error);
      }
    };

    loadTrips();
  }, []);

  // --------------------------------------------------
  // Click Upload Photos
  // --------------------------------------------------
  const handleUploadClick = () => {
    if (trips.length === 0) {
      alert("No trip found. Please create a trip first.");
      return;
    }

    // If there is only one trip, use it directly
    if (trips.length === 1) {
      setSelectedTripId(trips[0]._id);

      setTimeout(() => {
        fileInputRef.current?.click();
      }, 100);

      return;
    }

    // If there are multiple trips, let user choose
    setShowTripSelector(true);
  };

  // --------------------------------------------------
  // Select trip
  // --------------------------------------------------
  const handleTripSelect = (tripId) => {
    setSelectedTripId(tripId);

    setShowTripSelector(false);

    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  // --------------------------------------------------
  // Upload photo
  // --------------------------------------------------
  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!selectedTripId) {
      alert("Please select a trip first.");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch(
        `http://localhost:5000/api/trips/${selectedTripId}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Upload response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Photo upload failed"
        );
      }

      alert("Photo uploaded successfully!");

      // Refresh dashboard so photo/stat counts update
      window.location.reload();

    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      alert(
        error.message || "Photo upload failed"
      );

    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  return (
    <>
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

            {/* Start New Journey */}
            <button
              className="primary-btn"
              onClick={() => navigate("/add-trip")}
            >
              <FaPlus />
              Start New Journey
            </button>

            {/* Upload Photos */}
            <button
              className="secondary-btn"
              onClick={handleUploadClick}
              disabled={uploading}
            >
              <FaCamera />

              {uploading
                ? "Uploading..."
                : "Upload Photos"}
            </button>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />

          </div>

        </div>
      </motion.section>


      {/* --------------------------------------------------
          Trip Selection Modal
      -------------------------------------------------- */}
      {showTripSelector && (
        <div className="trip-selector-overlay">

          <div className="trip-selector-modal">

            <button
              className="trip-selector-close"
              onClick={() => setShowTripSelector(false)}
            >
              <FaTimes />
            </button>

            <h2>
              Choose a Trip
            </h2>

            <p>
              Which trip should this photo be added to?
            </p>


            <div className="trip-selector-list">

              {trips.map((trip) => (

                <button
                  key={trip._id}
                  className="trip-selector-item"
                  onClick={() =>
                    handleTripSelect(trip._id)
                  }
                >

                  <strong>
                    {trip.title || "Untitled Trip"}
                  </strong>

                  <span>
                    {trip.location ||
                      trip.destination ||
                      "Unknown location"}
                  </span>

                </button>

              ))}

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default Hero;