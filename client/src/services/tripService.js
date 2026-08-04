import axios from "axios";

const API = "http://localhost:5000/api/trips";

const getToken = () => localStorage.getItem("token");

export const createTrip = async (tripData) => {
  return axios.post(API, tripData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const getTrips = async () => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};