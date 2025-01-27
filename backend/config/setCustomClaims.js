const admin = require("./firebase-admin"); // Reuse Firebase Admin initialization

const setCustomClaims = async (uid, role) => {
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        console.log(`Custom claim '${role}' set for UID: ${uid}`);
    } catch (error) {
        console.error("Error setting custom claims:", error);
    }
};
//wuz5rpPQsHUUG0lzhMBY4K9G8eB2
//YWeVfGgmrWOVoJx00r3eW6qgUfD3
//qQAhA6TLdvan75Zd0yrvF3keVFo2
const uid = "qQAhA6TLdvan75Zd0yrvF3keVFo2"; // Example UID
const role = "admin"; // Role to assign
setCustomClaims(uid, role)
    .then(() => console.log("Custom claims set successfully."))
    .catch((error) => console.error("Error setting custom claims:", error));
