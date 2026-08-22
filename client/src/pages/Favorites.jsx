import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TripCard from "../components/TripCard";
import { getTrips } from "../services/tripService";

function Favorites() {
    const [favoriteTrips, setFavoriteTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const response = await getTrips();

            const trips = Array.isArray(response.data)
                ? response.data
                : [];

            const favorites = trips.filter(
                (trip) => trip.isLiked === true
            );

            setFavoriteTrips(favorites);

        } catch (error) {
            console.error(
                "ERROR LOADING FAVORITES:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // Remove trip from Favorites immediately
    // when the user clicks the heart button.
    const handleLikeChange = (tripId, isLiked) => {
        if (!isLiked) {
            setFavoriteTrips((currentTrips) =>
                currentTrips.filter(
                    (trip) => trip._id !== tripId
                )
            );
        }
    };

    // Remove trip from Favorites after deletion
    const handleDelete = (deletedTripId) => {
        setFavoriteTrips((currentTrips) =>
            currentTrips.filter(
                (trip) => trip._id !== deletedTripId
            )
        );
    };

    return (
        <div>
            <Navbar />

            <div
                style={{
                    padding: "40px",
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >
                <h1
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    ❤️ My Favorites
                </h1>

                {loading ? (
                    <p>Loading favorites...</p>

                ) : favoriteTrips.length === 0 ? (
                    <div>
                        <h3>No favorite trips yet</h3>

                        <p>
                            Click the ❤️ button on a trip
                            to add it to your favorites.
                        </p>
                    </div>

                ) : (
                    <div className="trip-grid">
                        {favoriteTrips.map((trip) => (
                            <TripCard
                                key={trip._id}
                                trip={trip}
                                onDelete={handleDelete}
                                onLikeChange={handleLikeChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;