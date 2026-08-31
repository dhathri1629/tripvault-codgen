const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const photoRoutes = require("./routes/photoRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/photos", photoRoutes);

// Public profile routes
app.use("/api/users", profileRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("TripVault Server Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

