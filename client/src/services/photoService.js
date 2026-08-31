import axios from "axios";

const API = "https://tripvault-codgen.onrender.com/api/photos";

const getToken = () =>
    localStorage.getItem("token");

// =====================================================
// UPLOAD MULTIPLE PHOTOS
// =====================================================

export const uploadTripPhotos = async (
    tripId,
    files
) => {

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("photos", file);
    });

    return axios.post(
        `${API}/${tripId}`,
        formData,
        {
            headers: {
                Authorization:
                    `Bearer ${getToken()}`
            }
        }
    );
};

// =====================================================
// DELETE PHOTO
// =====================================================

export const deleteTripPhoto = async (
    tripId,
    photoUrl
) => {

    return axios.delete(
        `${API}/${tripId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${getToken()}`
            },

            data: {
                photoUrl
            }
        }
    );
};