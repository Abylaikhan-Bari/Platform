const admin = require("firebase-admin");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        // Check if Authorization header exists and starts with 'Bearer'
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Extract the Firebase token
        const token = authHeader.split(" ")[1];

        // Verify the Firebase JWT token
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken; // Attach user info to request object
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error("Authentication Error:", err);
        res.status(401).json({ message: "Invalid or expired token", error: err.message });
    }
};

module.exports = auth;
