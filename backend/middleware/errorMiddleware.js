// Middleware for handling "Not Found" errors
const notFound = (req, res, next) => {
  // Create an error object with a message indicating the requested URL was not found
  const error = new Error(`Not Found - ${req.originalUrl}`);

  // Pass the error to the next middleware
  next(error);
};

// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
  // Determine the HTTP status code for the response, use err.statusCode if provided, or default to 500 (Internal Server Error)
  let statusCode = err.statusCode || 500;

  // Get the error message from err.message
  let message = err.message;

  // If the error is a "CastError" and it's related to an "ObjectId," set a 404 (Not Found) status code and a specific error message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404; // Not Found
    message = "Resource Not Found";
  }

  // Respond with the determined status code and a JSON object containing the error message
  res.status(statusCode).json({
    message, // The error message
    stack: process.env.NODE_ENV === "production" ? "helooo" : err.stack, // Include the error stack trace if not in a production environment
  });
};



export { notFound, errorHandler };
