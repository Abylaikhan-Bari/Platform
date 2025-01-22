const admin = require("firebase-admin");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify the Firebase JWT token
        const decoded = await admin.auth().verifyIdToken(token.replace("Bearer ", ""));
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = auth;
