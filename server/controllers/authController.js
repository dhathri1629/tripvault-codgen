const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================================================
// REGISTER / SIGNUP
// =====================================================

const signup = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            password,
            bio
        } = req.body;

        // -----------------------------
        // Validate required fields
        // -----------------------------

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // -----------------------------
        // Create username if frontend
        // does not send one yet
        // -----------------------------

        let finalUsername = username;

        if (!finalUsername || !finalUsername.trim()) {
            finalUsername = name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");

            if (!finalUsername) {
                finalUsername = "traveller";
            }
        }

        finalUsername = finalUsername
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9_-]/g, "");

        // -----------------------------
        // Check email
        // -----------------------------

        const existingEmail = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingEmail) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }

        // -----------------------------
        // Check username
        // -----------------------------

        let existingUsername = await User.findOne({
            username: finalUsername
        });

        // -----------------------------
        // Automatically make username
        // unique if necessary
        // -----------------------------

        if (existingUsername) {

            let counter = 2;

            let newUsername =
                `${finalUsername}-${counter}`;

            while (
                await User.findOne({
                    username: newUsername
                })
            ) {
                counter++;

                newUsername =
                    `${finalUsername}-${counter}`;
            }

            finalUsername = newUsername;
        }

        // -----------------------------
        // Hash password
        // -----------------------------

        const hashedPassword =
            await bcrypt.hash(password, 10);

        // -----------------------------
        // Create user
        // -----------------------------

        const user = await User.create({
            name: name.trim(),

            username: finalUsername,

            email: email
                .toLowerCase()
                .trim(),

            password: hashedPassword,

            bio: bio || ""
        });

        // -----------------------------
        // Response
        // -----------------------------

        res.status(201).json({
            message: "Signup successful",

            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                bio: user.bio
            }
        });

    } catch (error) {

        console.error(
            "SIGNUP ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
};


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;

        // -----------------------------
        // Validate
        // -----------------------------

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // -----------------------------
        // Find user
        // -----------------------------

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // -----------------------------
        // Compare password
        // -----------------------------

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // -----------------------------
        // Create JWT
        // -----------------------------

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // -----------------------------
        // Response
        // -----------------------------

        res.json({
            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                bio: user.bio || ""
            }
        });

    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
};


// =====================================================
// GET LOGGED-IN USER
// =====================================================

const getMe = async (req, res) => {
    try {

        const user = await User
            .findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {

        console.error(
            "GET ME ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
};


// =====================================================
// UPDATE PROFILE
// =====================================================

const updateProfile = async (req, res) => {
    try {

        const {
            username,
            bio
        } = req.body;

        const user = await User.findById(
            req.user.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // -----------------------------
        // Update username
        // -----------------------------

        if (
            username !== undefined &&
            username.trim()
        ) {

            const cleanUsername =
                username
                    .toLowerCase()
                    .trim()
                    .replace(
                        /[^a-z0-9_-]/g,
                        ""
                    );

            const existingUsername =
                await User.findOne({
                    username: cleanUsername,
                    _id: {
                        $ne: user._id
                    }
                });

            if (existingUsername) {
                return res.status(400).json({
                    message:
                        "Username is already taken"
                });
            }

            user.username =
                cleanUsername;
        }

        // -----------------------------
        // Update bio
        // -----------------------------

        if (bio !== undefined) {
            user.bio = bio.trim();
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",

            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                bio: user.bio || ""
            }
        });

    } catch (error) {

        console.error(
            "UPDATE PROFILE ERROR:",
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
    signup,
    login,
    getMe,
    updateProfile
};