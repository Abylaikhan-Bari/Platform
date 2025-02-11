const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(require(process.env.FIREBASE_ADMIN_SDK)),  // Correct path to your Firebase service account JSON file
});

module.exports = admin;
