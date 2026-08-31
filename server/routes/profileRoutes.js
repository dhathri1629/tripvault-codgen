const express = require("express");

const router = express.Router();

const {
    getPublicProfile
} = require("../controllers/profileController");


// =====================================================
// PUBLIC PROFILE
// =====================================================

// GET /api/users/:username/profile
//
// IMPORTANT:
// No authMiddleware here.
// Anyone can view the public profile.

router.get(
    "/:username/profile",
    getPublicProfile
);


module.exports = router;