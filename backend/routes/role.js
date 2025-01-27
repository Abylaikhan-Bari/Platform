const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

// Middleware to verify if the requester is an admin
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userDoc = await db.collection("roles").doc(decodedToken.uid).get();

        if (!userDoc.exists || userDoc.data().role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        next();
    } catch (err) {
        console.error("Error verifying token:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Assign Role Endpoint (Admin Only)
router.post("/assign-role", verifyAdmin, async (req, res) => {
    const { uid, role } = req.body;

    try {
        const validRoles = ["admin", "user"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        // Update Firestore roles collection
        await db.collection("roles").doc(uid).set({ role }, { merge: true });

        res.status(200).json({ message: `Role '${role}' assigned to user ${uid}` });
    } catch (err) {
        console.error("Error assigning role:", err);
        res.status(500).json({ message: "Failed to assign role" });
    }
});

module.exports = router;
