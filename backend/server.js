// server.js
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const cors = require('cors');

// Load environment variables
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
  app.use(bodyParser.json());
  
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
// app.use('/uploads', express.static('uploads'))


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
