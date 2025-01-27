const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(require('../config/platform-780bc-firebase-adminsdk-fbsvc-3fd79abd38.json')),  // Correct path to your Firebase service account JSON file
});

module.exports = admin;
