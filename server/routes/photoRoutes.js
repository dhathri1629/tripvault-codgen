const express = require("express");

const router = express.Router();

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const authMiddleware = require("../middleware/authMiddleware");
const Trip = require("../models/Trip");

// =====================================================
// CREATE CLOUDINARY FOLDER NAME
// =====================================================

const createFolderName = (destination) => {
    if (!destination) {
        return "tripvault/unknown-location";
    }

    return (
        "tripvault/" +
        destination
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
    );
};

// =====================================================
// GET ALL PHOTOS FOR LOGGED-IN USER
// GET /api/photos
// =====================================================

router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const trips = await Trip.find({
                user: req.user.id
            }).sort({
                createdAt: -1
            });

            const photos = [];

            trips.forEach((trip) => {
                if (
                    Array.isArray(trip.photos) &&
                    trip.photos.length > 0
                ) {
                    trip.photos.forEach(
                        (photoUrl, index) => {
                            photos.push({
                                url: photoUrl,
                                tripId: trip._id,
                                tripTitle:
                                    trip.title ||
                                    "Untitled Trip",
                                destination:
                                    trip.destination ||
                                    "Unknown Location",
                                photoNumber:
                                    index + 1
                            });
                        }
                    );
                }
            });

            res.status(200).json({
                photos
            });

        } catch (error) {
            console.error(
                "GET ALL PHOTOS ERROR:",
                error
            );

            res.status(500).json({
                message:
                    "Failed to load photos"
            });
        }
    }
);

// =====================================================
// UPLOAD PHOTOS
// POST /api/photos/:tripId
// =====================================================

router.post(
    "/:tripId",
    authMiddleware,

    async (req, res, next) => {
        try {
            const trip = await Trip.findOne({
                _id: req.params.tripId,
                user: req.user.id
            });

            if (!trip) {
                return res.status(404).json({
                    message: "Trip not found"
                });
            }

            // -----------------------------------------
            // Create location-based Cloudinary folder
            // -----------------------------------------

            const folder = createFolderName(
                trip.destination
            );

            // -----------------------------------------
            // Cloudinary storage
            // -----------------------------------------

            const storage =
                new CloudinaryStorage({
                    cloudinary: cloudinary,

                    params: {
                        folder: folder,

                        allowed_formats: [
                            "jpg",
                            "jpeg",
                            "png",
                            "webp"
                        ],

                        resource_type: "image"
                    }
                });

            // -----------------------------------------
            // Multer
            // -----------------------------------------

            const upload = multer({
                storage: storage,

                limits: {
                    fileSize:
                        5 * 1024 * 1024
                }
            });

            upload.array("photos", 10)(
                req,
                res,
                (error) => {
                    if (error) {
                        return next(error);
                    }

                    next();
                }
            );

        } catch (error) {
            console.error(
                "PHOTO UPLOAD SETUP ERROR:",
                error
            );

            res.status(500).json({
                message: error.message
            });
        }
    },

    // =================================================
    // SAVE UPLOADED PHOTO URLS
    // =================================================

    async (req, res) => {
        try {
            const trip = await Trip.findOne({
                _id: req.params.tripId,
                user: req.user.id
            });

            if (!trip) {
                return res.status(404).json({
                    message: "Trip not found"
                });
            }

            if (
                !req.files ||
                req.files.length === 0
            ) {
                return res.status(400).json({
                    message:
                        "Please upload at least one image"
                });
            }

            // -----------------------------------------
            // Get Cloudinary URLs
            // -----------------------------------------

            const uploadedPhotos =
                req.files.map(
                    (file) => file.path
                );

            // -----------------------------------------
            // Add new photos to existing photos
            // -----------------------------------------

            const updatedPhotos = [
                ...(trip.photos || []),
                ...uploadedPhotos
            ];

            // -----------------------------------------
            // Set cover image if needed
            // -----------------------------------------

            const updatedCoverImage =
                trip.coverImage ||
                uploadedPhotos[0];

            // -----------------------------------------
            // Save to MongoDB
            // -----------------------------------------

            await Trip.updateOne(
                {
                    _id: trip._id,
                    user: req.user.id
                },
                {
                    $set: {
                        photos:
                            updatedPhotos,

                        coverImage:
                            updatedCoverImage
                    }
                }
            );

            res.status(200).json({
                message:
                    "Photos uploaded successfully",

                photos:
                    uploadedPhotos,

                coverImage:
                    updatedCoverImage
            });

        } catch (error) {
            console.error(
                "PHOTO UPLOAD ERROR:",
                error
            );

            res.status(500).json({
                message: error.message
            });
        }
    }
);

// =====================================================
// DELETE PHOTO
// DELETE /api/photos/:tripId
// =====================================================

router.delete(
    "/:tripId",
    authMiddleware,

    async (req, res) => {
        try {
            const { photoUrl } =
                req.body;

            // -----------------------------------------
            // Validate photo URL
            // -----------------------------------------

            if (!photoUrl) {
                return res.status(400).json({
                    message:
                        "Photo URL is required"
                });
            }

            // -----------------------------------------
            // Find user's trip
            // -----------------------------------------

            const trip = await Trip.findOne({
                _id: req.params.tripId,
                user: req.user.id
            });

            if (!trip) {
                return res.status(404).json({
                    message:
                        "Trip not found"
                });
            }

            // -----------------------------------------
            // Check photo belongs to trip
            // -----------------------------------------

            if (
                !trip.photos.includes(
                    photoUrl
                )
            ) {
                return res.status(404).json({
                    message:
                        "Photo not found in this trip"
                });
            }

            // -----------------------------------------
            // Remove photo from MongoDB
            // -----------------------------------------

            trip.photos =
                trip.photos.filter(
                    (photo) =>
                        photo !== photoUrl
                );

            // -----------------------------------------
            // If deleted photo was cover image
            // select another remaining photo
            // -----------------------------------------

            if (
                trip.coverImage ===
                photoUrl
            ) {
                trip.coverImage =
                    trip.photos.length > 0
                        ? trip.photos[0]
                        : null;
            }

            // -----------------------------------------
            // Save updated trip
            // -----------------------------------------

            await trip.save();

            // -----------------------------------------
            // Response
            // -----------------------------------------

            res.status(200).json({
                message:
                    "Photo deleted successfully",

                photos:
                    trip.photos,

                coverImage:
                    trip.coverImage
            });

        } catch (error) {
            console.error(
                "DELETE PHOTO ERROR:",
                error
            );

            res.status(500).json({
                message:
                    error.message
            });
        }
    }
);

// =====================================================
// EXPORT
// =====================================================

module.exports = router;