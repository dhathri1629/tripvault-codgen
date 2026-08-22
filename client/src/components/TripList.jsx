import React, { useEffect, useState } from "react";
import TripCard from "./TripCard";
import { getTrips } from "../services/tripService";
import "../styles/tripList.css";

function TripList() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTrips = async () => {
        try {
            const response = await getTrips();

            console.log("UPDATED TRIPS:", response.data);

            setTrips(response.data);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load trips when dashboard opens
        fetchTrips();

        // Reload trips after photo upload
        const handleRefresh = () => {
            console.log("Refreshing trips after upload...");
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
                <p>Loading trips...</p>
            ) : trips.length === 0 ? (
                <p>
                    No trips found. Start your first journey!
                </p>
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