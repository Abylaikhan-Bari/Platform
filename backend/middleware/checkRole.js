const admin = require("firebase-admin");

const checkRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }

            // Verify Firebase token and get claims
            const decodedToken = await admin.auth().verifyIdToken(token);

            if (!decodedToken.role || decodedToken.role !== requiredRole) {
                return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            }

            req.user = decodedToken; // Attach user info to the request
            next();
        } catch (err) {
            console.error("Error verifying token:", err);
            res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        }
    };
};

module.exports = checkRole;
