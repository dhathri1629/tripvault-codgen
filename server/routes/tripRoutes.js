const express = require("express");
const router = express.Router();

const {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    toggleLike,
    deleteTrip
} = require("../controllers/tripController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Trip
router.post("/", authMiddleware, createTrip);

// Get All User Trips
router.get("/", authMiddleware, getTrips);

// Get Single Trip
router.get("/:id", authMiddleware, getTrip);

// Update Trip
router.put("/:id", authMiddleware, updateTrip);

// Like / Unlike Trip
router.put("/:id/like", authMiddleware, toggleLike);

// Delete Trip
router.delete("/:id", authMiddleware, deleteTrip);

module.exports = router;