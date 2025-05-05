const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

// Firebase admin SDK initialization (with correct dynamic path resolution)
const serviceAccount = require(path.resolve(process.env.FIREBASE_ADMIN_SDK));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// User Registration
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Register user in Firebase
        const userRecord = await admin.auth().createUser({
            email: username,
            password,
        });

        // Save user in MongoDB
        const newUser = new User({
            username,
            firebaseUID: userRecord.uid,
        });
        await newUser.save();

        // Assign default role using custom claims
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: "user" });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userRecord = await admin.auth().getUserByEmail(username);
        const token = await admin.auth().createCustomToken(userRecord.uid);

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Server error during login" });
    }
});

module.exports = router;
