const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500; // Use err.statusCode, and default to 500
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource Not Found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "helooo" : err.stack,
  });
};

export { notFound, errorHandler };