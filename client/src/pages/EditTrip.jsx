import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getTrip,
    updateTrip
} from "../services/tripService";

import {
    uploadTripPhotos,
    deleteTripPhoto
} from "../services/photoService";

import "../styles/addTrip.css";


function EditTrip() {

    const { id } = useParams();

    const navigate = useNavigate();


    // =====================================================
    // TRIP
    // =====================================================

    const [trip, setTrip] = useState({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        description: "",
        rating: 0
    });


    // =====================================================
    // PHOTOS
    // =====================================================

    const [existingPhotos, setExistingPhotos] =
        useState([]);

    const [selectedPhotos, setSelectedPhotos] =
        useState([]);

    const [previewUrls, setPreviewUrls] =
        useState([]);


    // =====================================================
    // LOADING
    // =====================================================

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [deletingPhoto, setDeletingPhoto] =
        useState(null);


    // =====================================================
    // LOAD TRIP
    // =====================================================

    useEffect(() => {

        const fetchTrip = async () => {

            try {

                const response =
                    await getTrip(id);

                const data =
                    response.data;


                setTrip({
                    title:
                        data.title || "",

                    destination:
                        data.destination || "",

                    startDate:
                        data.startDate
                            ? data.startDate.substring(0, 10)
                            : "",

                    endDate:
                        data.endDate
                            ? data.endDate.substring(0, 10)
                            : "",

                    description:
                        data.description || "",

                    rating:
                        data.rating || 0
                });


                setExistingPhotos(
                    Array.isArray(data.photos)
                        ? data.photos
                        : []
                );


            } catch (error) {

                console.error(
                    "GET TRIP ERROR:",
                    error
                );

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


    // =====================================================
    // PREVIEW NEW PHOTOS
    // =====================================================

    useEffect(() => {

        const urls =
            selectedPhotos.map(
                (file) =>
                    URL.createObjectURL(file)
            );


        setPreviewUrls(urls);


        return () => {

            urls.forEach(
                (url) =>
                    URL.revokeObjectURL(url)
            );
        };

    }, [selectedPhotos]);


    // =====================================================
    // HANDLE TEXT CHANGES
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setTrip(
            (currentTrip) => ({
                ...currentTrip,
                [name]: value
            })
        );
    };


    // =====================================================
    // SELECT NEW PHOTOS
    // =====================================================

    const handlePhotoChange = (e) => {

        const files =
            Array.from(
                e.target.files || []
            );


        const imageFiles =
            files.filter(
                (file) =>
                    file.type.startsWith(
                        "image/"
                    )
            );


        setSelectedPhotos(
            imageFiles
        );
    };


    // =====================================================
    // REMOVE NEW PHOTO FROM SELECTION
    // =====================================================

    const removePhoto = (
        indexToRemove
    ) => {

        setSelectedPhotos(
            (currentPhotos) =>
                currentPhotos.filter(
                    (_, index) =>
                        index !==
                        indexToRemove
                )
        );
    };


    // =====================================================
    // DELETE EXISTING PHOTO
    // =====================================================

    const handleDeletePhoto = async (
        photoUrl
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this photo?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            setDeletingPhoto(
                photoUrl
            );


            const response =
                await deleteTripPhoto(
                    id,
                    photoUrl
                );


            setExistingPhotos(
                Array.isArray(
                    response.data?.photos
                )
                    ? response.data.photos
                    : []
            );


            alert(
                "Photo deleted successfully!"
            );


        } catch (error) {

            console.error(
                "DELETE PHOTO ERROR:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to delete photo"
            );


        } finally {

            setDeletingPhoto(null);
        }
    };


    // =====================================================
    // SAVE TRIP
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (saving) {
            return;
        }


        try {

            setSaving(true);


            // ---------------------------------------------
            // Update trip information
            // ---------------------------------------------

            await updateTrip(
                id,
                {
                    title:
                        trip.title,

                    destination:
                        trip.destination,

                    startDate:
                        trip.startDate,

                    endDate:
                        trip.endDate,

                    description:
                        trip.description,

                    rating:
                        Number(
                            trip.rating
                        )
                }
            );


            // ---------------------------------------------
            // Upload new photos
            // ---------------------------------------------

            if (
                selectedPhotos.length > 0
            ) {

                const response =
                    await uploadTripPhotos(
                        id,
                        selectedPhotos
                    );


                if (
                    response.data?.photos &&
                    Array.isArray(
                        response.data.photos
                    )
                ) {

                    setExistingPhotos(
                        (currentPhotos) => [
                            ...currentPhotos,
                            ...response.data.photos
                        ]
                    );
                }


                // Clear new selections
                setSelectedPhotos([]);
            }


            alert(
                "Trip updated successfully!"
            );


            navigate(
                "/dashboard"
            );


        } catch (error) {

            console.error(
                "UPDATE TRIP ERROR:",
                error
            );


            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to update trip"
            );


        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {

        return (
            <div className="addtrip-container">

                <div className="addtrip-card">

                    <h2>
                        Loading trip...
                    </h2>

                </div>

            </div>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="addtrip-container">

            <div className="addtrip-card">

                <h1>
                    Edit Trip
                </h1>


                <p>
                    Update your travel memories.
                </p>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* =================================================
                        TRIP TITLE
                    ================================================= */}

                    <div className="form-group">

                        <label>
                            Trip Title
                        </label>


                        <input
                            type="text"
                            name="title"
                            value={
                                trip.title
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    {/* =================================================
                        DESTINATION
                    ================================================= */}

                    <div className="form-group">

                        <label>
                            Destination
                        </label>


                        <input
                            type="text"
                            name="destination"
                            value={
                                trip.destination
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    {/* =================================================
                        START DATE
                    ================================================= */}

                    <div className="form-group">

                        <label>
                            Start Date
                        </label>


                        <input
                            type="date"
                            name="startDate"
                            value={
                                trip.startDate
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    {/* =================================================
                        END DATE
                    ================================================= */}

                    <div className="form-group">

                        <label>
                            End Date
                        </label>


                        <input
                            type="date"
                            name="endDate"
                            value={
                                trip.endDate
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>


                        <textarea
                            name="description"
                            rows="5"
                            value={
                                trip.description
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>


                    {/* =================================================
                        RATING
                    ================================================= */}

                    <div className="form-group">

                        <label>
                            Rating
                        </label>


                        <select
                            name="rating"
                            value={
                                trip.rating
                            }
                            onChange={
                                handleChange
                            }
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


                    {/* =================================================
                        EXISTING PHOTOS
                    ================================================= */}

                    {existingPhotos.length > 0 && (

                        <div
                            style={{
                                marginTop:
                                    "25px"
                            }}
                        >

                            <h3>
                                Existing Photos
                            </h3>


                            <div
                                style={{
                                    display:
                                        "grid",

                                    gridTemplateColumns:
                                        "repeat(auto-fill, minmax(150px, 1fr))",

                                    gap:
                                        "15px"
                                }}
                            >

                                {existingPhotos.map(
                                    (
                                        photo,
                                        index
                                    ) => (

                                        <div
                                            key={`${photo}-${index}`}
                                            style={{
                                                position:
                                                    "relative"
                                            }}
                                        >

                                            <img
                                                src={
                                                    photo
                                                }
                                                alt={`Trip photo ${
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


                                            {/* DELETE BUTTON */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeletePhoto(
                                                        photo
                                                    )
                                                }
                                                disabled={
                                                    deletingPhoto ===
                                                    photo
                                                }
                                                style={{
                                                    position:
                                                        "absolute",

                                                    top:
                                                        "8px",

                                                    right:
                                                        "8px",

                                                    border:
                                                        "none",

                                                    borderRadius:
                                                        "50%",

                                                    width:
                                                        "32px",

                                                    height:
                                                        "32px",

                                                    cursor:
                                                        deletingPhoto ===
                                                        photo
                                                            ? "not-allowed"
                                                            : "pointer",

                                                    background:
                                                        "rgba(220, 38, 38, 0.9)",

                                                    color:
                                                        "white",

                                                    fontSize:
                                                        "16px",

                                                    fontWeight:
                                                        "bold"
                                                }}
                                            >
                                                {deletingPhoto ===
                                                photo
                                                    ? "..."
                                                    : "×"}
                                            </button>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}


                    {/* =================================================
                        ADD MORE PHOTOS
                    ================================================= */}

                    <div
                        className="form-group"
                        style={{
                            marginTop:
                                "25px"
                        }}
                    >

                        <label>
                            Add More Photos
                        </label>


                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={
                                handlePhotoChange
                            }
                        />


                        <p
                            style={{
                                marginTop:
                                    "8px",

                                color:
                                    "#6b7280",

                                fontSize:
                                    "14px"
                            }}
                        >
                            Select one or more
                            photos.
                            Maximum 5 MB per
                            photo.
                        </p>

                    </div>


                    {/* =================================================
                        NEW PHOTO PREVIEW
                    ================================================= */}

                    {previewUrls.length > 0 && (

                        <div
                            style={{
                                marginTop:
                                    "20px"
                            }}
                        >

                            <h3>
                                New Photo Preview
                            </h3>


                            <div
                                style={{
                                    display:
                                        "grid",

                                    gridTemplateColumns:
                                        "repeat(auto-fill, minmax(150px, 1fr))",

                                    gap:
                                        "15px"
                                }}
                            >

                                {previewUrls.map(
                                    (
                                        url,
                                        index
                                    ) => (

                                        <div
                                            key={url}
                                            style={{
                                                position:
                                                    "relative"
                                            }}
                                        >

                                            <img
                                                src={
                                                    url
                                                }
                                                alt={`New travel photo ${
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

                                                    top:
                                                        "6px",

                                                    right:
                                                        "6px",

                                                    border:
                                                        "none",

                                                    borderRadius:
                                                        "50%",

                                                    width:
                                                        "28px",

                                                    height:
                                                        "28px",

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


                    {/* =================================================
                        SAVE
                    ================================================= */}

                    <button
                        type="submit"
                        disabled={
                            saving
                        }
                        style={{
                            marginTop:
                                "25px",

                            opacity:
                                saving
                                    ? 0.7
                                    : 1,

                            cursor:
                                saving
                                    ? "not-allowed"
                                    : "pointer"
                        }}
                    >

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                </form>

            </div>

        </div>
    );
}


export default EditTrip;

