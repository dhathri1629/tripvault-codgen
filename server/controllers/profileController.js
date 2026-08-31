const User = require("../models/User");
const Trip = require("../models/Trip");

// =====================================================
// GET PUBLIC USER PROFILE
// GET /api/users/:username/profile
// No login required
// =====================================================

const getPublicProfile = async (req, res) => {
    try {
        const username = req.params.username
            .toLowerCase()
            .trim();

        // Find user by username
        const user = await User.findOne({
            username
        }).select(
            "name username bio createdAt"
        );

        if (!user) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        // Get user's trips
        const trips = await Trip.find({
            user: user._id
        })
            .select(
                "title destination startDate endDate description rating coverImage photos createdAt"
            )
            .sort({
                createdAt: -1
            });

        // Return only public information
        res.status(200).json({
            profile: {
                name: user.name,
                username: user.username,
                bio: user.bio || "",
                createdAt: user.createdAt
            },

            trips
        });

    } catch (error) {
        console.error(
            "GET PUBLIC PROFILE ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    getPublicProfile
};