const express = require("express");
const router = express.Router();

const {
    createTrip,
    getTrips
} = require("../controllers/tripController");

const authMiddleware = require("../middleware/authMiddleware");

// Create a trip (Protected)
router.post("/", authMiddleware, createTrip);

// Get user trips (Protected)
router.get("/", authMiddleware, getTrips);

module.exports = router;