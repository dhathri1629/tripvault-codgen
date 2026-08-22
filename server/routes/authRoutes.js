const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    getMe,
    updateProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// ==========================================
// REGISTER
// ==========================================

router.post(
    "/register",
    signup
);


// ==========================================
// SIGNUP
// Keep for compatibility
// ==========================================

router.post(
    "/signup",
    signup
);


// ==========================================
// LOGIN
// ==========================================

router.post(
    "/login",
    login
);


// ==========================================
// GET LOGGED-IN USER
// Protected
// ==========================================

router.get(
    "/me",
    authMiddleware,
    getMe
);


// ==========================================
// UPDATE PROFILE
// Protected
// PUT /api/auth/profile
// ==========================================

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);


module.exports = router;

