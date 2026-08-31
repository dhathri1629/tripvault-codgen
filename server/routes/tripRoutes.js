const express = require("express");

const router = express.Router();

const {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    toggleLike,
    deleteTrip,
    uploadTripPhoto
} = require("../controllers/tripController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


// Create Trip
router.post(
    "/",
    authMiddleware,
    createTrip
);


// Get All User Trips
router.get(
    "/",
    authMiddleware,
    getTrips
);


// Get Single Trip
router.get(
    "/:id",
    authMiddleware,
    getTrip
);


// Update Trip
router.put(
    "/:id",
    authMiddleware,
    updateTrip
);


// Like / Unlike Trip
router.put(
    "/:id/like",
    authMiddleware,
    toggleLike
);


// Delete Trip
router.delete(
    "/:id",
    authMiddleware,
    deleteTrip
);


// Upload Trip Photo
router.post(
    "/:id/upload",
    authMiddleware,
    upload.single("image"),
    uploadTripPhoto
);


module.exports = router;