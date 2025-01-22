const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firebaseUID: { type: String, required: true, unique: true },  // Store Firebase UID
});

module.exports = mongoose.model("User", UserSchema);
