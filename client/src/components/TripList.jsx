import React, { useEffect, useState } from "react";
import TripCard from "./TripCard";
import { getTrips } from "../services/tripService";
import "../styles/tripList.css";

function TripList() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTrips = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getTrips();

            console.log("UPDATED TRIPS:", response.data);

            setTrips(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {
            console.error(
                "Error fetching trips:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load your trips. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();

        const handleRefresh = () => {
            console.log(
                "Refreshing trips after upload..."
            );

            fetchTrips();
        };

        window.addEventListener(
            "tripvault:refresh-stats",
            handleRefresh
        );

        return () => {
            window.removeEventListener(
                "tripvault:refresh-stats",
                handleRefresh
            );
        };
    }, []);

    const handleDelete = (deletedTripId) => {
        setTrips((currentTrips) =>
            currentTrips.filter(
                (trip) => trip._id !== deletedTripId
            )
        );
    };

    return (
        <div className="trip-list">

            <h2>🧳 My Trips</h2>

            {loading ? (
                <div className="trip-status">
                    <p>Loading your trips...</p>
                </div>
            ) : error ? (
                <div className="trip-status trip-error">
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={fetchTrips}
                    >
                        Try Again
                    </button>
                </div>
            ) : trips.length === 0 ? (
                <div className="trip-status">
                    <h3>No trips yet</h3>

                    <p>
                        Start your first journey and
                        save your travel memories!
                    </p>
                </div>
            ) : (
                <div className="trip-grid">

                    {trips.map((trip) => (
                        <TripCard
                            key={trip._id}
                            trip={trip}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}

export default TripList;

