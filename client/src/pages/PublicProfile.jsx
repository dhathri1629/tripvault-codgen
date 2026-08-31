import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TripCard from "../components/TripCard";

function PublicProfile() {
    const { username } = useParams();

    const [profile, setProfile] = useState(null);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, [username]);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:5000/api/users/${username}/profile`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Profile not found"
                );
            }

            setProfile(data.profile);
            setTrips(
                Array.isArray(data.trips)
                    ? data.trips
                    : []
            );

        } catch (error) {
            console.error(
                "PUBLIC PROFILE ERROR:",
                error
            );

            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <Navbar />

                <div
                    style={{
                        padding: "50px",
                        textAlign: "center"
                    }}
                >
                    <h2>
                        Loading profile...
                    </h2>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div>
                <Navbar />

                <div
                    style={{
                        padding: "50px",
                        textAlign: "center"
                    }}
                >
                    <h2>
                        Profile not found
                    </h2>

                    <p>
                        {error ||
                            "This profile does not exist."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />

            {/* ===============================
                PROFILE HEADER
            =============================== */}

            <section
                style={{
                    padding: "50px 30px 30px",
                    textAlign: "center"
                }}
            >
                <h1>
                    {profile.name}
                </h1>

                <h3
                    style={{
                        color: "#2563eb",
                        marginBottom: "15px"
                    }}
                >
                    @{profile.username}
                </h3>

                {profile.bio && (
                    <p
                        style={{
                            maxWidth: "700px",
                            margin: "0 auto 20px",
                            fontSize: "18px",
                            lineHeight: "1.6"
                        }}
                    >
                        {profile.bio}
                    </p>
                )}

                <p>
                    {trips.length}{" "}
                    {trips.length === 1
                        ? "trip"
                        : "trips"}
                </p>
            </section>


            {/* ===============================
                PUBLIC TRIPS
            =============================== */}

            <section
                style={{
                    padding: "20px 40px 60px",
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >
                <h2
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    Travel Memories
                </h2>

                {trips.length === 0 ? (
                    <div>
                        <h3>
                            No public trips yet
                        </h3>

                        <p>
                            This traveller has not
                            added any trips yet.
                        </p>
                    </div>
                ) : (
                    <div className="trip-grid">
                        {trips.map((trip) => (
                            <TripCard
                                key={trip._id}
                                trip={trip}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default PublicProfile;