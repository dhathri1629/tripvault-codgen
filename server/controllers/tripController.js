const Trip = require("../models/Trip");

// Create Trip
const createTrip = async (req, res) => {
    try {
        const { title, location, description, date, photos } = req.body;

        const trip = await Trip.create({
            user: req.user.id,
            title,
            location,
            description,
            date,
            photos
        });

        res.status(201).json({
            message: "Trip created successfully",
            trip
        });

    } catch (error) {
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
        });

        res.json(trips);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createTrip,
    getTrips
};