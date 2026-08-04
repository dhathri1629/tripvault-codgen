import React from "react";
import { FaPlaneDeparture, FaBell, FaUserCircle } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  const username = localStorage.getItem("name") || "Traveler";

  return (
    <nav className="navbar">
      <div className="logo">
        <FaPlaneDeparture className="logo-icon" />
        <span>TripVault</span>
      </div>

      <div className="nav-right">
        <FaBell className="nav-icon" />
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span>{username}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;