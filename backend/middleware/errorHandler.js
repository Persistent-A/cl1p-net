const errorHandler = async (err, req, res, next) => {
  const status_code = (await res.statusCode) ? res.statusCode : 500; // Get the status code from the response or default to 500
  res.status(status_code); // Set the response status code
  // Send a JSON response with the error message and stack trace (if not in production)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler; // Export the errorHandler function for use in other files
