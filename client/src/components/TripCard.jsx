import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/tripCard.css";

function TripCard({ trip }) {

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


                <p>
                    <FaMapMarkerAlt />
                    &nbsp;
                    {trip.location}
                </p>


                <p className="trip-date">

                    <FaCalendarAlt />
                    &nbsp;
                    {new Date(trip.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })}

                </p>


                <p>
                    {trip.description}
                </p>



                {/* Action Buttons */}
                <div className="trip-actions">

                    <button className="like-btn">
                        <FaHeart />
                    </button>


                    <button className="edit-btn">
                        <FaEdit />
                    </button>


                    <button className="delete-btn">
                        <FaTrash />
                    </button>

                </div>


            </div>


        </div>

    );

}


export default TripCard;