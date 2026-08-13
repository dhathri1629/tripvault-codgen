import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../services/tripService";
import "../styles/addTrip.css";

function AddTrip() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    rating: 0,
    photos: [],
  });

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
      await createTrip({
        title: trip.title,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        description: trip.description,
        rating: Number(trip.rating),
      });

      alert("🎉 Trip added successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error("ADD TRIP ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Failed to add trip"
      );
    }
  };

  return (
    <div className="addtrip-container">

      <div className="addtrip-card">

        <h1>✈️ Add New Journey</h1>

        <p>
          Create and save your travel memories.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Trip Title */}
          <div className="form-group">

            <label>Trip Title</label>

            <input
              type="text"
              name="title"
              placeholder="Goa Vacation"
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
              placeholder="Goa, India"
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
              placeholder="Tell us about your trip..."
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


          {/* Photos */}
          <div className="form-group">

            <label>Photos</label>

            <input
              type="file"
              multiple
              disabled
            />

            <small>
              Photo upload will be added in the next phase.
            </small>

          </div>


          {/* Save Button */}
          <button
            className="save-btn"
            type="submit"
          >
            💾 Save Trip
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddTrip;