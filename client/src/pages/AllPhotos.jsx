import React, { useEffect, useState } from "react";

const AllPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/photos",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load photos");
            }

            const data = await response.json();

            /*
             * The API may return either:
             *   [photo, photo, photo]
             * or
             *   { photos: [...] }
             */
            const photoList = Array.isArray(data)
                ? data
                : data.photos || [];

            setPhotos(photoList);
        } catch (err) {
            console.error("Error loading photos:", err);
            setError("Unable to load your photos.");
        } finally {
            setLoading(false);
        }
    };

    /*
     * Group photos by destination/location
     */
    const groupedPhotos = photos.reduce((groups, photo) => {
        const location =
            photo.destination?.trim() || "Unknown Location";

        if (!groups[location]) {
            groups[location] = [];
        }

        groups[location].push(photo);

        return groups;
    }, {});

    /*
     * Loading screen
     */
    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#f5f7fb",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "20px",
                    color: "#6b7280"
                }}
            >
                Loading your photos...
            </div>
        );
    }

    /*
     * Error screen
     */
    if (error) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#f5f7fb",
                    padding: "60px 30px",
                    textAlign: "center"
                }}
            >
                <h2
                    style={{
                        color: "#111827",
                        marginBottom: "12px"
                    }}
                >
                    Unable to load photos
                </h2>

                <p
                    style={{
                        color: "#6b7280",
                        marginBottom: "25px"
                    }}
                >
                    {error}
                </p>

                <button
                    onClick={fetchPhotos}
                    style={{
                        border: "none",
                        background: "#2563eb",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f7fb",
                paddingBottom: "80px"
            }}
        >
            {/* Header */}
            <div
                style={{
                    background: "white",
                    padding: "28px 50px",
                    borderBottom: "1px solid #e5e7eb"
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: "42px",
                        color: "#111827",
                        fontWeight: "700"
                    }}
                >
                    All Photos
                </h1>

                <p
                    style={{
                        margin: "8px 0 0",
                        fontSize: "18px",
                        color: "#6b7280"
                    }}
                >
                    All your travel memories in one place
                </p>
            </div>

            {/* Main Content */}
            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "50px 30px"
                }}
            >
                {/* Total Photos */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "45px"
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            background: "white",
                            padding: "12px 22px",
                            borderRadius: "30px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.06)"
                        }}
                    >
                        <span
                            style={{
                                fontSize: "24px"
                            }}
                        >
                            📷
                        </span>

                        <span
                            style={{
                                fontSize: "18px",
                                color: "#4b5563"
                            }}
                        >
                            {photos.length}{" "}
                            {photos.length === 1
                                ? "photo"
                                : "photos"}
                        </span>
                    </div>
                </div>

                {/* No Photos */}
                {photos.length === 0 ? (
                    <div
                        style={{
                            background: "white",
                            borderRadius: "20px",
                            padding: "70px 30px",
                            textAlign: "center",
                            boxShadow:
                                "0 8px 25px rgba(0,0,0,0.06)"
                        }}
                    >
                        <div
                            style={{
                                fontSize: "60px",
                                marginBottom: "20px"
                            }}
                        >
                            📷
                        </div>

                        <h2
                            style={{
                                margin: "0 0 10px",
                                color: "#111827"
                            }}
                        >
                            No photos yet
                        </h2>

                        <p
                            style={{
                                margin: 0,
                                color: "#6b7280",
                                fontSize: "17px"
                            }}
                        >
                            Upload photos to your trips and
                            they will appear here.
                        </p>
                    </div>
                ) : (
                    /*
                     * LOCATION FOLDERS
                     */
                    Object.entries(groupedPhotos).map(
                        ([location, locationPhotos]) => (
                            <div
                                key={location}
                                style={{
                                    marginBottom: "55px"
                                }}
                            >
                                {/* Folder Header */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "15px",
                                        marginBottom: "25px",
                                        padding: "20px 25px",
                                        background: "white",
                                        borderRadius: "18px",
                                        boxShadow:
                                            "0 6px 20px rgba(0,0,0,0.06)"
                                    }}
                                >
                                    {/* Folder Icon */}
                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "15px",
                                            background:
                                                "#fff4e8",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent:
                                                "center",
                                            fontSize: "32px",
                                            flexShrink: 0
                                        }}
                                    >
                                        📁
                                    </div>

                                    {/* Folder Information */}
                                    <div>
                                        <h2
                                            style={{
                                                margin: 0,
                                                fontSize: "25px",
                                                color: "#111827",
                                                textTransform:
                                                    "capitalize"
                                            }}
                                        >
                                            {location}
                                        </h2>

                                        <p
                                            style={{
                                                margin:
                                                    "5px 0 0",
                                                color: "#6b7280",
                                                fontSize: "15px"
                                            }}
                                        >
                                            {locationPhotos.length}{" "}
                                            {locationPhotos.length ===
                                            1
                                                ? "photo"
                                                : "photos"}
                                        </p>
                                    </div>
                                </div>

                                {/* Photos inside Location Folder */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(280px, 1fr))",
                                        gap: "28px"
                                    }}
                                >
                                    {locationPhotos.map(
                                        (photo, index) => (
                                            <div
                                                key={`${photo.tripId || "trip"}-${photo.photoNumber || "photo"}-${index}`}
                                                style={{
                                                    background:
                                                        "white",
                                                    borderRadius:
                                                        "18px",
                                                    overflow:
                                                        "hidden",
                                                    boxShadow:
                                                        "0 8px 25px rgba(0,0,0,0.08)",
                                                    transition:
                                                        "transform 0.2s ease, box-shadow 0.2s ease"
                                                }}
                                                onMouseEnter={(
                                                    e
                                                ) => {
                                                    e.currentTarget.style.transform =
                                                        "translateY(-5px)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 12px 30px rgba(0,0,0,0.12)";
                                                }}
                                                onMouseLeave={(
                                                    e
                                                ) => {
                                                    e.currentTarget.style.transform =
                                                        "translateY(0)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 8px 25px rgba(0,0,0,0.08)";
                                                }}
                                            >
                                                {/* Photo */}
                                                <img
                                                    src={
                                                        photo.url
                                                    }
                                                    alt={`${photo.tripTitle || "Trip"} travel memory`}
                                                    style={{
                                                        width: "100%",
                                                        height: "230px",
                                                        objectFit:
                                                            "cover",
                                                        display:
                                                            "block"
                                                    }}
                                                />

                                                {/* Photo Details */}
                                                <div
                                                    style={{
                                                        padding:
                                                            "18px"
                                                    }}
                                                >
                                                    <h3
                                                        style={{
                                                            margin:
                                                                "0 0 8px 0",
                                                            fontSize:
                                                                "20px",
                                                            color:
                                                                "#111827",
                                                            textTransform:
                                                                "capitalize"
                                                        }}
                                                    >
                                                        {photo.tripTitle ||
                                                            "Untitled Trip"}
                                                    </h3>

                                                    <p
                                                        style={{
                                                            margin: 0,
                                                            color:
                                                                "#6b7280",
                                                            fontSize:
                                                                "15px"
                                                        }}
                                                    >
                                                        📍{" "}
                                                        {photo.destination ||
                                                            "Unknown Location"}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default AllPhotos;