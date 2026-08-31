import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrip } from "../services/tripService";
import { toast } from "react-toastify";

function TripDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrip = async () => {
            try {
                const response = await getTrip(id);

                setTrip(response.data);

            } catch (error) {
                console.error(
                    "GET TRIP DETAILS ERROR:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load trip"
                );

                navigate("/dashboard");

            } finally {
                setLoading(false);
            }
        };

        loadTrip();
    }, [id, navigate]);

    if (loading) {
        return (
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px"
                }}
            >
                <h2>Loading trip...</h2>
            </div>
        );
    }

    if (!trip) {
        return (
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px"
                }}
            >
                <h2>Trip not found</h2>
            </div>
        );
    }

    const photos = Array.isArray(trip.photos)
        ? trip.photos.filter(
              (photo) =>
                  typeof photo === "string" &&
                  photo.startsWith("http")
          )
        : [];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                padding: "40px 20px"
            }}
        >

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >

                {/* Back */}
                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                    style={{
                        marginBottom: "25px",
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    ← Back to Dashboard
                </button>


                {/* Trip information */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "18px",
                        padding: "30px",
                        marginBottom: "35px",
                        boxShadow:
                            "0 8px 25px rgba(0,0,0,0.08)"
                    }}
                >

                    <h1
                        style={{
                            marginTop: 0,
                            marginBottom: "12px"
                        }}
                    >
                        {trip.title}
                    </h1>

                    <p
                        style={{
                            color: "#6b7280",
                            fontSize: "17px"
                        }}
                    >
                        📍 {trip.destination}
                    </p>

                    {trip.description && (
                        <p
                            style={{
                                lineHeight: "1.7",
                                color: "#374151"
                            }}
                        >
                            {trip.description}
                        </p>
                    )}

                    {trip.rating > 0 && (
                        <p>
                            ⭐ {trip.rating}/5
                        </p>
                    )}

                </div>


                {/* Photos */}
                <div>

                    <h2
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        Travel Photos
                    </h2>

                    {photos.length === 0 ? (
                        <div
                            style={{
                                background: "white",
                                borderRadius: "16px",
                                padding: "40px",
                                textAlign: "center"
                            }}
                        >
                            <p>
                                No photos uploaded for
                                this trip yet.
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(280px, 1fr))",
                                gap: "24px"
                            }}
                        >

                            {photos.map(
                                (photo, index) => (
                                    <div
                                        key={`${photo}-${index}`}
                                        style={{
                                            background:
                                                "white",
                                            borderRadius:
                                                "16px",
                                            overflow:
                                                "hidden",
                                            boxShadow:
                                                "0 8px 25px rgba(0,0,0,0.08)"
                                        }}
                                    >

                                        <img
                                            src={photo}
                                            alt={`${trip.destination} travel memory ${
                                                index + 1
                                            }`}
                                            style={{
                                                width: "100%",
                                                height: "280px",
                                                objectFit:
                                                    "cover",
                                                display:
                                                    "block"
                                            }}
                                            onError={(
                                                event
                                            ) => {
                                                event.currentTarget.style.display =
                                                    "none";
                                            }}
                                        />

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default TripDetails;
