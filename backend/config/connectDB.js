const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined. Check your .env file.");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB Connected...');
    } catch (err) {
        console.error(`❌ Database Connection Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
