import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../services/tripService";
import { uploadTripPhotos } from "../services/photoService";
import { toast } from "react-toastify";
import "../styles/addTrip.css";

function AddTrip() {
    const navigate = useNavigate();

    const [trip, setTrip] = useState({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        description: "",
        rating: 0
    });

    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [saving, setSaving] = useState(false);

    // Create preview URLs
    useEffect(() => {
        const urls = selectedPhotos.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviewUrls(urls);

        return () => {
            urls.forEach((url) =>
                URL.revokeObjectURL(url)
            );
        };
    }, [selectedPhotos]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTrip((currentTrip) => ({
            ...currentTrip,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files || []);

        const imageFiles = files.filter((file) =>
            file.type.startsWith("image/")
        );

        const validFiles = imageFiles.filter((file) => {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} is larger than 5 MB.`);
                return false;
            }
            return true;
        });

        if (imageFiles.length > 10) {
            toast.error("You can upload a maximum of 10 photos at once.");
        }

        setSelectedPhotos(validFiles.slice(0, 10));
    };

    const removePhoto = (indexToRemove) => {
        setSelectedPhotos((currentPhotos) =>
            currentPhotos.filter(
                (_, index) => index !== indexToRemove
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (saving) {
            return;
        }

        if (
            trip.startDate &&
            trip.endDate &&
            trip.startDate > trip.endDate
        ) {
            toast.error("End date must be after the start date.");
            return;
        }

        try {
            setSaving(true);

            // -----------------------------
            // CREATE TRIP FIRST
            // -----------------------------

            const response = await createTrip({
                title: trip.title,
                destination: trip.destination,
                startDate: trip.startDate,
                endDate: trip.endDate,
                description: trip.description,
                rating: Number(trip.rating)
            });

            const createdTrip = response.data?.trip;

            if (!createdTrip?._id) {
                throw new Error(
                    "Trip was created but no trip ID was returned."
                );
            }

            // -----------------------------
            // UPLOAD PHOTOS
            // -----------------------------

            if (selectedPhotos.length > 0) {
                await uploadTripPhotos(
                    createdTrip._id,
                    selectedPhotos
                );
            }

            // Week 4 success toast
            toast.success("Trip added successfully!");

            navigate("/dashboard");

        } catch (error) {
            console.error(
                "ADD TRIP ERROR:",
                error
            );

            // Week 4 error toast
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to add trip"
            );

        } finally {
            setSaving(false);
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

                        <label>
                            Trip Title
                        </label>

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

                        <label>
                            Destination
                        </label>

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

                        <label>
                            Start Date
                        </label>

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

                        <label>
                            End Date
                        </label>

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

                        <label>
                            Description
                        </label>

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

                        <label>
                            Rating
                        </label>

                        <select
                            name="rating"
                            value={trip.rating}
                            onChange={handleChange}
                        >

                            <option value="0">
                                Select Rating
                            </option>

                            <option value="1">
                                1 Star
                            </option>

                            <option value="2">
                                2 Stars
                            </option>

                            <option value="3">
                                3 Stars
                            </option>

                            <option value="4">
                                4 Stars
                            </option>

                            <option value="5">
                                5 Stars
                            </option>

                        </select>

                    </div>

                    {/* PHOTO UPLOAD */}
                    <div className="form-group">

                        <label>
                            Travel Photos
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                        />

                        <p
                            style={{
                                marginTop: "8px",
                                color: "#6b7280",
                                fontSize: "14px"
                            }}
                        >
                            Select one or more photos.
                            Maximum 5 MB per photo.
                        </p>

                    </div>

                    {/* PHOTO PREVIEW */}
                    {previewUrls.length > 0 && (
                        <div
                            style={{
                                marginTop: "20px"
                            }}
                        >

                            <h3>
                                Photo Preview
                            </h3>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fill, minmax(150px, 1fr))",
                                    gap: "15px"
                                }}
                            >

                                {previewUrls.map(
                                    (url, index) => (
                                        <div
                                            key={url}
                                            style={{
                                                position:
                                                    "relative"
                                            }}
                                        >

                                            <img
                                                src={url}
                                                alt={`Selected travel photo ${
                                                    index + 1
                                                }`}
                                                style={{
                                                    width:
                                                        "100%",
                                                    height:
                                                        "150px",
                                                    objectFit:
                                                        "cover",
                                                    borderRadius:
                                                        "12px"
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removePhoto(
                                                        index
                                                    )
                                                }
                                                style={{
                                                    position:
                                                        "absolute",
                                                    top: "6px",
                                                    right: "6px",
                                                    border:
                                                        "none",
                                                    borderRadius:
                                                        "50%",
                                                    width: "28px",
                                                    height: "28px",
                                                    cursor:
                                                        "pointer",
                                                    background:
                                                        "rgba(0,0,0,0.7)",
                                                    color:
                                                        "white",
                                                    fontSize:
                                                        "16px"
                                                }}
                                            >
                                                ×
                                            </button>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            marginTop: "25px",
                            opacity: saving ? 0.7 : 1,
                            cursor: saving
                                ? "not-allowed"
                                : "pointer"
                        }}
                    >
                        {saving
                            ? "Saving Trip..."
                            : "Save Trip"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddTrip;