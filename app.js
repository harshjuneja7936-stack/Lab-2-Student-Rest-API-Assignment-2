const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in Middleware for parsing JSON body
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Modular Routes
app.use('/students', studentRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to Student Management REST API"
  });
});

// 404 Route Handler for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server running successfully on http://localhost:${PORT}`);
});