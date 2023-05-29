// Import required modules
const express = require("express"); // Express framework for building web applications
const colors = require("colors"); // Colors module for adding colors to console output
const dotenv = require("dotenv").config(); // Dotenv module for loading environment variables from .env file
const connectDB = require("./config/db"); // Custom module for connecting to database
const cors = require("cors"); // Cors module for enabling Cross-Origin Resource Sharing
const errorHandler = require("./middleware/errorHandler"); // Custom middleware for handling errors
const port = process.env.PORT || 5001; // Set port number from environment variable or default to 5001
const app = express(); // Create Express application

connectDB(); // Connect to the database

app.use(express.json()); // Parse request bodies in JSON format
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use("/", require("./routes/ClipRoutes")); // Use ClipRoutes module for handling routes starting with "/"

app.use(errorHandler); // Use errorHandler middleware for handling errors
app.listen(port, () => console.log(`Server started on port ${port}`)); // Start the server and log the port number
