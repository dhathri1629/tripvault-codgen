import React, { useState } from "react";
import {
    FaPlaneDeparture,
    FaBell,
    FaUserCircle,
    FaSignOutAlt,
    FaUser,
    FaEnvelope,
    FaBars,
    FaTimes,
    FaHome,
    FaSuitcase,
    FaImages,
    FaHeart
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const username =
        localStorage.getItem("name") ||
        "Traveler";

    const email =
        localStorage.getItem("email") ||
        "No email available";

    const [showProfile, setShowProfile] =
        useState(false);

    const [showMenu, setShowMenu] =
        useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");

        navigate("/login");
    };

    const handleNavigation = (path) => {
        setShowMenu(false);
        setShowProfile(false);
        navigate(path);
    };

    return (
        <nav className="navbar">

            {/* Logo */}
            <div
                className="logo"
                onClick={() =>
                    handleNavigation("/dashboard")
                }
            >
                <FaPlaneDeparture
                    className="logo-icon"
                />

                <span>TripVault</span>
            </div>


            {/* Desktop Navigation */}
            <div className="nav-links">

                <button
                    onClick={() =>
                        handleNavigation(
                            "/dashboard"
                        )
                    }
                >
                    <FaHome />
                    Home
                </button>

                <button
                    onClick={() =>
                        handleNavigation(
                            "/add-trip"
                        )
                    }
                >
                    <FaSuitcase />
                    Add Trip
                </button>

                <button
                    onClick={() =>
                        handleNavigation(
                            "/photos"
                        )
                    }
                >
                    <FaImages />
                    Photos
                </button>

                <button
                    onClick={() =>
                        handleNavigation(
                            "/favorites"
                        )
                    }
                >
                    <FaHeart />
                    Favorites
                </button>

            </div>


            {/* Right Side */}
            <div className="nav-right">

                <FaBell
                    className="nav-icon"
                />


                {/* Profile */}
                <div className="profile-container">

                    <button
                        className="user-info"
                        onClick={() =>
                            setShowProfile(
                                !showProfile
                            )
                        }
                    >
                        <FaUserCircle
                            className="user-icon"
                        />

                        <span>
                            {username}
                        </span>
                    </button>


                    {/* Profile Dropdown */}
                    {showProfile && (
                        <div className="profile-dropdown">

                            <div className="profile-header">

                                <FaUser
                                    className="profile-icon"
                                />

                                <div>

                                    <strong>
                                        {username}
                                    </strong>

                                    <p>
                                        <FaEnvelope />
                                        &nbsp;
                                        {email}
                                    </p>

                                </div>

                            </div>


                            <button
                                className="logout-btn"
                                onClick={
                                    handleLogout
                                }
                            >
                                <FaSignOutAlt />

                                <span>
                                    Logout
                                </span>
                            </button>

                        </div>
                    )}

                </div>


                {/* Mobile Menu Button */}
                <button
                    className="menu-toggle"
                    onClick={() =>
                        setShowMenu(
                            !showMenu
                        )
                    }
                    aria-label="Toggle navigation menu"
                >
                    {showMenu ? (
                        <FaTimes />
                    ) : (
                        <FaBars />
                    )}
                </button>

            </div>


            {/* Mobile Navigation */}
            {showMenu && (
                <div className="mobile-menu">

                    <button
                        onClick={() =>
                            handleNavigation(
                                "/dashboard"
                            )
                        }
                    >
                        <FaHome />
                        Home
                    </button>

                    <button
                        onClick={() =>
                            handleNavigation(
                                "/add-trip"
                            )
                        }
                    >
                        <FaSuitcase />
                        Add Trip
                    </button>

                    <button
                        onClick={() =>
                            handleNavigation(
                                "/photos"
                            )
                        }
                    >
                        <FaImages />
                        Photos
                    </button>

                    <button
                        onClick={() =>
                            handleNavigation(
                                "/favorites"
                            )
                        }
                    >
                        <FaHeart />
                        Favorites
                    </button>

                </div>
            )}

        </nav>
    );
}

export default Navbar;

