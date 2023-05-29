const mongoose = require("mongoose"); // Import the mongoose library

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using the MONGO_URI environment variable
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline); // Log a success message with the host of the connected MongoDB instance
  } catch (error) {
    console.log(error); // Log any error that occurred during the connection process
    process.exit(1); // Terminate the Node.js process with an exit code of 1 (indicating an error)
  }
};

module.exports = connectDB;
