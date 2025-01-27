const express = require("express");
const router = express.Router();
const admin = require("./firebase-admin"); // Firebase Admin SDK initialization
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole"); // Middleware to restrict to admins

// Endpoint to set a user's role
router.post("/set-role", auth, checkRole("admin"), async (req, res) => {
    const { uid, role } = req.body;

    try {
        // Set custom claims for the specified user
        await admin.auth().setCustomUserClaims(uid, { role });
        res.status(200).json({ message: `Role '${role}' assigned to user with UID: ${uid}` });
    } catch (error) {
        console.error("Error setting role:", error);
        res.status(500).json({ message: "Failed to set role", error: error.message });
    }
});

module.exports = router;
