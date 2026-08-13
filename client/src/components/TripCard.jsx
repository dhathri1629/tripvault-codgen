import React, { useState } from "react";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaHeart,
    FaEdit,
    FaTrash
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    deleteTrip,
    toggleLike
} from "../services/tripService";
import "../styles/tripCard.css";

function TripCard({ trip, onDelete }) {

    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(
        trip.isLiked || false
    );

    const [likeLoading, setLikeLoading] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this trip?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteTrip(trip._id);

            alert("Trip deleted successfully!");

            if (onDelete) {
                onDelete(trip._id);
            }

        } catch (error) {
            console.error("DELETE TRIP ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete trip"
            );
        }
    };


    const handleEdit = () => {
        navigate(`/edit-trip/${trip._id}`);
    };


    const handleLike = async () => {

        if (likeLoading) {
            return;
        }

        try {

            setLikeLoading(true);

            const response = await toggleLike(trip._id);

            setIsLiked(response.data.isLiked);

        } catch (error) {

            console.error("LIKE ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update like"
            );

        } finally {

            setLikeLoading(false);

        }
    };


    return (
        <div className="trip-card">

            {/* Travel Image */}
            <div className="trip-image">

                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                    alt="travel"
                />

            </div>


            {/* Trip Details */}
            <div className="trip-content">

                <h3>
                    {trip.title}
                </h3>


                {/* Destination */}
                <p>

                    <FaMapMarkerAlt />

                    &nbsp;

                    {trip.destination}

                </p>


                {/* Start Date */}
                <p className="trip-date">

                    <FaCalendarAlt />

                    &nbsp;

                    {new Date(trip.startDate).toLocaleDateString(
                        "en-GB",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    )}

                </p>


                {/* End Date */}
                <p className="trip-date">

                    <FaCalendarAlt />

                    &nbsp;

                    {new Date(trip.endDate).toLocaleDateString(
                        "en-GB",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    )}

                </p>


                {/* Description */}
                <p>
                    {trip.description}
                </p>


                {/* Action Buttons */}
                <div className="trip-actions">

                    {/* Like */}
                    <button
                        className={`like-btn ${
                            isLiked ? "liked" : ""
                        }`}
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


                    {/* Edit */}
                    <button
                        className="edit-btn"
                        onClick={handleEdit}
                        title="Edit trip"
                    >

                        <FaEdit />

                    </button>


                    {/* Delete */}
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