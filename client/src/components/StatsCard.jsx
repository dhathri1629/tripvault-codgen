import React, { useEffect, useState } from "react";
import {
  FaSuitcase,
  FaCamera,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

import { getTrips } from "../services/tripService";
import "../styles/cards.css";

function StatsCard() {
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
      const res = await getTrips();

      const trips = res.data;

      // Count photos
      const photoCount = trips.reduce(
        (total, trip) => total + (trip.photos ? trip.photos.length : 0),
        0
      );

      // Count unique places
      const uniquePlaces = new Set(
        trips.map((trip) => trip.location)
      ).size;

      setStats({
        trips: trips.length,
        photos: photoCount,
        places: uniquePlaces,
        favorites: 0, // We'll implement favorites later
      });

    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      icon: <FaSuitcase />,
      title: "Trips",
      value: stats.trips,
    },
    {
      icon: <FaCamera />,
      title: "Photos",
      value: stats.photos,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Places",
      value: stats.places,
    },
    {
      icon: <FaHeart />,
      title: "Favorites",
      value: stats.favorites,
    },
  ];

  return (
    <div className="stats-container">
      {cards.map((item, index) => (
        <div className="stats-card" key={index}>
          <div className="stats-icon">{item.icon}</div>

          <h3>{item.value}</h3>

          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;