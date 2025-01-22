const passport = require("passport");
const admin = require("firebase-admin");
const { ExtractJwt, Strategy } = require("passport-jwt");
const dotenv = require("dotenv");

dotenv.config();

// Firebase admin SDK initialization
admin.initializeApp({
    credential: admin.credential.cert(require('../config/platform-780bc-firebase-adminsdk-fbsvc-3fd79abd38.json')),  // Path to your Firebase Admin SDK JSON file
});

// JWT Strategy options
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract JWT from the Authorization header
    secretOrKey: process.env.JWT_SECRET,  // Not needed if using Firebase JWT directly
};

// Passport Strategy to authenticate the user via Firebase
passport.use(
    new Strategy(options, async (jwt_payload, done) => {
        try {
            // Use Firebase to get user details by the UID from the JWT payload
            const user = await admin.auth().getUser(jwt_payload.id);  // Using Firebase Admin SDK to get the user
            if (!user) return done(null, false);  // If user not found, return false
            return done(null, user);  // If found, return the user object
        } catch (err) {
            return done(err, false);  // If any error occurs, return the error
        }
    })
);
