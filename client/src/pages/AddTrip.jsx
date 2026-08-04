import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../services/tripService";
import "../styles/addTrip.css";

function AddTrip() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
    photos: [],
  });

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTrip(trip);

      alert("🎉 Trip added successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add trip");
    }
  };

  return (
    <div className="addtrip-container">
      <div className="addtrip-card">
        <h1>✈️ Add New Journey</h1>

        <p>Create and save your travel memories.</p>

        <form onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              placeholder="Goa, India"
              value={trip.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={trip.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              rows="5"
              placeholder="Tell us about your trip..."
              value={trip.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Photos</label>

            <input
              type="file"
              multiple
              disabled
            />

            <small style={{ color: "#666" }}>
              Photo upload will be added in the next phase.
            </small>
          </div>

          <button className="save-btn" type="submit">
            💾 Save Trip
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTrip;