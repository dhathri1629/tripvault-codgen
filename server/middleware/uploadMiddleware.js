const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Trip = require("../models/Trip");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: async (req, file) => {
            try {
                // Supports both upload routes:
                // /photos/:tripId
                // /trips/:id/upload
                const tripId =
                    req.params.tripId ||
                    req.params.id;

                if (!tripId) {
                    return "tripvault/uncategorized";
                }

                const trip = await Trip.findById(tripId);

                if (!trip || !trip.destination) {
                    return "tripvault/uncategorized";
                }

                // Convert destination into a safe folder name
                const location = trip.destination
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");

                return `tripvault/${location || "uncategorized"}`;

            } catch (error) {
                console.error(
                    "CLOUDINARY FOLDER ERROR:",
                    error
                );

                return "tripvault/uncategorized";
            }
        },

        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ]
    }
});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;