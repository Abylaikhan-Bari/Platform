const admin = require("./firebase-admin"); // Reuse your Firebase Admin initialization

// Function to assign custom claims
const setCustomClaims = async (uid, role) => {
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        console.log(`Custom claim '${role}' set for UID: ${uid}`);
    } catch (error) {
        console.error("Error setting custom claims:", error);
    }
};

// Example: Set role for a user
const uid = "YWeVfGgmrWOVoJx00r3eW6qgUfD3"; // Replace this with the actual UID of the user
const role = "admin"; // Replace with the desired role (e.g., 'admin', 'user')
setCustomClaims(uid, role);
