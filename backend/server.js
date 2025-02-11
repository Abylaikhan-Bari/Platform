const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();  // ✅ Make sure dotenv loads before anything else

const connectDB = require('./config/connectDB'); // Import the DB connection function

const authRoutes = require('./routes/auth');  // Authentication routes
const bookRoutes = require('./routes/books'); // Books CRUD routes
const roleRoutes = require('./routes/role');  // Role assignment routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ Enable CORS globally

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/roles', roleRoutes); // Register the new route

const PORT = process.env.PORT || 5001;

// Change the bind address to 0.0.0.0 to allow connections from other devices
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
