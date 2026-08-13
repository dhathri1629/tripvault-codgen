const Trip = require("../models/Trip");

// Create Trip
const createTrip = async (req, res) => {
    try {
        const {
            title,
            destination,
            startDate,
            endDate,
            description,
            rating
        } = req.body;

        const trip = await Trip.create({
            user: req.user.id,
            title,
            destination,
            startDate,
            endDate,
            description,
            rating
        });

        res.status(201).json({
            message: "Trip created successfully",
            trip
        });

    } catch (error) {
        console.error("CREATE TRIP ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// Get User Trips
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(trips);

    } catch (error) {
        console.error("GET TRIPS ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// Get Single Trip
const getTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.status(200).json(trip);

    } catch (error) {
        console.error("GET SINGLE TRIP ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// Update Trip
const updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        const {
            title,
            destination,
            startDate,
            endDate,
            description,
            rating
        } = req.body;

        trip.title = title;
        trip.destination = destination;
        trip.startDate = startDate;
        trip.endDate = endDate;
        trip.description = description;
        trip.rating = rating;

        await trip.save();

        res.status(200).json({
            message: "Trip updated successfully",
            trip
        });

    } catch (error) {
        console.error("UPDATE TRIP ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// Like / Unlike Trip
const toggleLike = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        trip.isLiked = !trip.isLiked;

        await trip.save();

        res.status(200).json({
            message: trip.isLiked
                ? "Trip liked"
                : "Trip unliked",
            isLiked: trip.isLiked
        });

    } catch (error) {
        console.error("TOGGLE LIKE ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// Delete Trip
const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        await trip.deleteOne();

        res.status(200).json({
            message: "Trip deleted successfully"
        });

    } catch (error) {
        console.error("DELETE TRIP ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    toggleLike,
    deleteTrip
};