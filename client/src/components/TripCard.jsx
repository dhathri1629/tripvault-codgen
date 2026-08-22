import React, { useState } from "react";

import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaHeart,
    FaEdit,
    FaTrash,
    FaCamera
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
    deleteTrip,
    toggleLike
} from "../services/tripService";

import "../styles/tripCard.css";

function TripCard({
    trip,
    onDelete,
    onLikeChange
}) {
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(
        trip.isLiked || false
    );

    const [likeLoading, setLikeLoading] = useState(false);


    // =========================================
    // GET PHOTOS
    // =========================================

    const photos = Array.isArray(trip.photos)
        ? trip.photos
        : [];


    // =========================================
    // GET REAL UPLOADED PHOTO URLS
    // =========================================

    const uploadedPhotos = photos.filter(
        (photo) =>
            typeof photo === "string" &&
            photo.startsWith("http")
    );


    // =========================================
    // PHOTO COUNT
    // =========================================

    const photoCount = photos.length;


    // =========================================
    // LATEST UPLOADED PHOTO
    // =========================================

    const latestUploadedPhoto =
        uploadedPhotos.length > 0
            ? uploadedPhotos[
                  uploadedPhotos.length - 1
              ]
            : null;


    // =========================================
    // FALLBACK IMAGE
    // =========================================

    const fallbackImage =
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";


    // =========================================
    // IMAGE TO DISPLAY
    // =========================================

    const tripImage =
        latestUploadedPhoto ||
        trip.coverImage ||
        fallbackImage;


    // =========================================
    // LOCATION
    // =========================================

    const location =
        trip.location ||
        trip.destination ||
        "Unknown location";


    // =========================================
    // DATE
    // =========================================

    const tripDate =
        trip.date ||
        trip.startDate ||
        null;


    // =========================================
    // DELETE TRIP
    // =========================================

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this trip?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteTrip(trip._id);

            alert(
                "Trip deleted successfully!"
            );

            if (onDelete) {
                onDelete(trip._id);
            }

        } catch (error) {
            console.error(
                "DELETE TRIP ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete trip"
            );
        }
    };


    // =========================================
    // EDIT TRIP
    // =========================================

    const handleEdit = () => {
        navigate(
            "/edit-trip/" + trip._id
        );
    };


    // =========================================
    // LIKE / UNLIKE
    // =========================================

    const handleLike = async () => {
        if (likeLoading) {
            return;
        }

        try {
            setLikeLoading(true);

            const response =
                await toggleLike(trip._id);

            const newLikeStatus =
                response.data.isLiked;

            // Update heart immediately
            setIsLiked(newLikeStatus);

            // Tell parent component
            // that like status changed.
            if (onLikeChange) {
                onLikeChange(
                    trip._id,
                    newLikeStatus
                );
            }

        } catch (error) {
            console.error(
                "LIKE ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update like"
            );

        } finally {
            setLikeLoading(false);
        }
    };


    // =========================================
    // COMPONENT
    // =========================================

    return (
        <div className="trip-card">

            {/* =================================
                TRIP IMAGE
            ================================= */}

            <div className="trip-image">

                <img
                    src={tripImage}
                    alt={
                        trip.title ||
                        "Trip"
                    }
                    onError={(event) => {
                        event.currentTarget.src =
                            fallbackImage;
                    }}
                />

            </div>


            {/* =================================
                TRIP CONTENT
            ================================= */}

            <div className="trip-content">

                {/* TITLE */}

                <h3>
                    {trip.title ||
                        "Untitled Trip"}
                </h3>


                {/* LOCATION */}

                <p>
                    <FaMapMarkerAlt />

                    &nbsp;

                    {location}
                </p>


                {/* DATE */}

                {tripDate && (
                    <p className="trip-date">

                        <FaCalendarAlt />

                        &nbsp;

                        {new Date(
                            tripDate
                        ).toLocaleDateString(
                            "en-GB",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            }
                        )}

                    </p>
                )}


                {/* DESCRIPTION */}

                <p>
                    {trip.description ||
                        "No description available"}
                </p>


                {/* =================================
                    PHOTO COUNT
                ================================= */}

                <p className="trip-photo-count">

                    <FaCamera />

                    &nbsp;

                    {photoCount}

                    {photoCount === 1
                        ? " photo"
                        : " photos"}

                </p>


                {/* =================================
                    ACTION BUTTONS
                ================================= */}

                <div className="trip-actions">

                    {/* LIKE */}

                    <button
                        className={
                            "like-btn " +
                            (
                                isLiked
                                    ? "liked"
                                    : ""
                            )
                        }
                        onClick={handleLike}
                        disabled={likeLoading}
                        title={
                            isLiked
                                ? "Unlike trip"
                                : "Like trip"
                        }
                    >

                        <FaHeart />

                    </button>


                    {/* EDIT */}

                    <button
                        className="edit-btn"
                        onClick={handleEdit}
                        title="Edit trip"
                    >

                        <FaEdit />

                    </button>


                    {/* DELETE */}

                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                        title="Delete trip"
                    >

                        <FaTrash />

                    </button>

                </div>

            </div>

        </div>
    );
}

export default TripCard;