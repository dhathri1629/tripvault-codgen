import React, { useState } from "react";
import {
  FaPlaneDeparture,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaEnvelope
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("name") || "Traveler";
  const email = localStorage.getItem("email") || "No email available";

  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <FaPlaneDeparture className="logo-icon" />
        <span>TripVault</span>
      </div>

      {/* Right Side */}
      <div className="nav-right">

        <FaBell className="nav-icon" />

        {/* Profile */}
        <div className="profile-container">

          <button
            className="user-info"
            onClick={handleProfileClick}
          >
            <FaUserCircle className="user-icon" />
            <span>{username}</span>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-header">

                <FaUser className="profile-icon" />

                <div>
                  <strong>{username}</strong>

                  <p>
                    <FaEnvelope />
                    &nbsp;
                    {email}
                  </p>
                </div>

              </div>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;