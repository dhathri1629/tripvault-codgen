const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        date: {
            type: Date,
            required: true
        },

        photos: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Trip", tripSchema);