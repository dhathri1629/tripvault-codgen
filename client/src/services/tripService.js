import axios from "axios";

const API = "https://tripvault-codgen.onrender.com/api/trips";

const getToken = () => localStorage.getItem("token");

// Create Trip
export const createTrip = async (tripData) => {
    return axios.post(API, tripData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get All Trips
export const getTrips = async () => {
    return axios.get(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get Single Trip
export const getTrip = async (id) => {
    return axios.get(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Update Trip
export const updateTrip = async (id, tripData) => {
    return axios.put(`${API}/${id}`, tripData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Like / Unlike Trip
export const toggleLike = async (id) => {
    return axios.put(
        `${API}/${id}/like`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
};

// Delete Trip
export const deleteTrip = async (id) => {
    return axios.delete(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};