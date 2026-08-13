import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrip, updateTrip } from "../services/tripService";
import "../styles/addTrip.css";

function EditTrip() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [trip, setTrip] = useState({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        description: "",
        rating: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await getTrip(id);

                const data = response.data;

                setTrip({
                    title: data.title || "",
                    destination: data.destination || "",
                    startDate: data.startDate
                        ? data.startDate.substring(0, 10)
                        : "",
                    endDate: data.endDate
                        ? data.endDate.substring(0, 10)
                        : "",
                    description: data.description || "",
                    rating: data.rating || 0,
                });

            } catch (error) {
                console.error("GET TRIP ERROR:", error);

                alert(
                    error.response?.data?.message ||
                    "Failed to load trip"
                );

                navigate("/dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTrip({
            ...trip,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateTrip(id, {
                title: trip.title,
                destination: trip.destination,
                startDate: trip.startDate,
                endDate: trip.endDate,
                description: trip.description,
                rating: Number(trip.rating),
            });

            alert("Trip updated successfully!");

            navigate("/dashboard");

        } catch (error) {
            console.error("UPDATE TRIP ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update trip"
            );
        }
    };

    if (loading) {
        return (
            <div className="addtrip-container">
                <div className="addtrip-card">
                    <h2>Loading trip...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="addtrip-container">

            <div className="addtrip-card">

                <h1>✏️ Edit Trip</h1>

                <p>
                    Update your travel memories.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Trip Title */}
                    <div className="form-group">
                        <label>Trip Title</label>

                        <input
                            type="text"
                            name="title"
                            value={trip.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Destination */}
                    <div className="form-group">
                        <label>Destination</label>

                        <input
                            type="text"
                            name="destination"
                            value={trip.destination}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Start Date */}
                    <div className="form-group">
                        <label>Start Date</label>

                        <input
                            type="date"
                            name="startDate"
                            value={trip.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* End Date */}
                    <div className="form-group">
                        <label>End Date</label>

                        <input
                            type="date"
                            name="endDate"
                            value={trip.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            rows="5"
                            value={trip.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Rating */}
                    <div className="form-group">
                        <label>Rating</label>

                        <select
                            name="rating"
                            value={trip.rating}
                            onChange={handleChange}
                        >
                            <option value="0">
                                Select Rating
                            </option>

                            <option value="1">
                                ⭐ 1
                            </option>

                            <option value="2">
                                ⭐⭐ 2
                            </option>

                            <option value="3">
                                ⭐⭐⭐ 3
                            </option>

                            <option value="4">
                                ⭐⭐⭐⭐ 4
                            </option>

                            <option value="5">
                                ⭐⭐⭐⭐⭐ 5
                            </option>
                        </select>
                    </div>

                    {/* Update Button */}
                    <button
                        className="save-btn"
                        type="submit"
                    >
                        💾 Update Trip
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditTrip;