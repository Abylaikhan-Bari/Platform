const admin = require("firebase-admin");
const db = admin.firestore(); // Firestore database instance

const checkRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }

            // Verify Firebase JWT
            const decodedToken = await admin.auth().verifyIdToken(token);
            const userUid = decodedToken.uid;

            // Fetch role from Firestore
            const userDoc = await db.collection("roles").doc(userUid).get();
            if (!userDoc.exists) {
                return res.status(403).json({ message: "Forbidden: Role not assigned" });
            }

            const userRole = userDoc.data().role;
            if (userRole !== requiredRole) {
                return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            }

            req.user = { uid: userUid, role: userRole }; // Attach user info to the request
            next();
        } catch (err) {
            console.error("Error verifying role:", err);
            res.status(401).json({ message: "Unauthorized or insufficient permissions" });
        }
    };
};

module.exports = checkRole;
