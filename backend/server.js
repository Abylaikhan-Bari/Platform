const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB'); // Import the DB connection function

const authRoutes = require('./routes/auth');  // Authentication routes
const bookRoutes = require('./routes/books'); // Books CRUD routes
const roleRoutes = require('./routes/role');  // Role assignment routes

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/roles', roleRoutes); // Register the new route

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
