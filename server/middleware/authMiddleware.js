const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                message: "No token, authorization denied"
            });
        }

        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid token format"
            });
        }

        // Remove Bearer text
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user data
        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;