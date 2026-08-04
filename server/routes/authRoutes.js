const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    getMe
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Register (Week 1 requirement)
router.post("/register", signup);

// Keep signup for compatibility
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get logged-in user (Protected)
router.get("/me", authMiddleware, getMe);

module.exports = router;