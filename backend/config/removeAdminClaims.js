const admin = require("./firebase-admin"); // Ensure correct path to Firebase Admin SDK

// Function to remove admin role (reset to default user)
const removeAdminClaims = async (uid) => {
    try {
        await admin.auth().setCustomUserClaims(uid, {}); // Reset custom claims
        console.log(`✅ Admin role removed for UID: ${uid}`);
    } catch (error) {
        console.error("❌ Error removing admin claims:", error);
    }
};

// 🔹 Replace with the UID of the user whose admin role should be removed
const uid = "REZdqOJxn4VsiJ39MA9aESAe59J2"; // Example UID

// Execute the function
removeAdminClaims(uid)
    .then(() => console.log("✅ Admin role removed successfully."))
    .catch((error) => console.error("❌ Error removing admin role:", error));
