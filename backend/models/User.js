const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firebaseUID: { type: String, required: true, unique: true },  // Store Firebase UID
    role: { type: String, required: true, enum: ["admin", "user"] },
});

module.exports = mongoose.model("User", UserSchema);
