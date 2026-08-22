import React, { useEffect, useState } from "react";
import {
  FaSuitcase,
  FaCamera,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { getTrips } from "../services/tripService";
import "../styles/cards.css";

function StatsCard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    trips: 0,
    photos: 0,
    places: 0,
    favorites: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await getTrips();

      const trips = Array.isArray(response.data)
        ? response.data
        : [];

      let photoCount = 0;

      trips.forEach((trip) => {
        if (Array.isArray(trip.photos)) {
          photoCount += trip.photos.length;
        }
      });

      const places = new Set();

      trips.forEach((trip) => {
        const location =
          trip.location ||
          trip.destination ||
          "";

        if (location.trim()) {
          places.add(location.trim().toLowerCase());
        }
      });

      const favoriteCount = trips.filter(
        (trip) => trip.isLiked === true
      ).length;

      setStats({
        trips: trips.length,
        photos: photoCount,
        places: places.size,
        favorites: favoriteCount,
      });

    } catch (error) {
      console.error(
        "Failed to load dashboard stats:",
        error
      );
    }
  };

  return (
    <div className="stats-container">

      {/* TRIPS */}
      <div className="stats-card">
        <div className="stats-icon">
          <FaSuitcase />
        </div>

        <h3>{stats.trips}</h3>

        <p>Trips</p>
      </div>


      {/* PHOTOS */}
      <div className="stats-card">
        <div className="stats-icon">
          <FaCamera />
        </div>

        <h3>{stats.photos}</h3>

        <p>Photos</p>
      </div>


      {/* PLACES */}
      <div className="stats-card">
        <div className="stats-icon">
          <FaMapMarkerAlt />
        </div>

        <h3>{stats.places}</h3>

        <p>Places</p>
      </div>


      {/* FAVORITES */}
      <div
        className="stats-card favorites-card"
        onClick={() => navigate("/favorites")}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            navigate("/favorites");
          }
        }}
      >
        <div className="stats-icon">
          <FaHeart />
        </div>

        <h3>{stats.favorites}</h3>

        <p>Favorites</p>
      </div>

    </div>
  );
}

export default StatsCard;

