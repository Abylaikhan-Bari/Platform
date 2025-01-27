const passport = require("passport");
const admin = require("firebase-admin");
const { ExtractJwt, Strategy } = require("passport-jwt");
const dotenv = require("dotenv");

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(require('../config/platform-780bc-firebase-adminsdk-fbsvc-3fd79abd38.json')),  // Adjust path to your Firebase private key JSON
});

// JWT Strategy options
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
    secretOrKey: process.env.JWT_SECRET, // Optional: if you prefer to use a local secret to sign the token
};

// Passport Strategy for Firebase
passport.use(
    new Strategy(options, async (jwt_payload, done) => {
        try {
            const user = await admin.auth().getUser(jwt_payload.uid);  // Use Firebase to fetch the user by UID
            if (!user) return done(null, false);  // If user not found, return false
            return done(null, user);  // Otherwise, return the user object
        } catch (err) {
            return done(err, false);  // Return error if something goes wrong
        }
    })
);
