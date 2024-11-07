const AppError = require('../utils/AppError');

// Handle development errors with detailed stack traces
const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.message;
  const stack = err.stack;

  return res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

// Handle production errors (hide sensitive stack traces)
const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.message;

  if (err.isOperational) {
    // If the error is operational (i.e., known errors), return a controlled response
    return res.status(statusCode).json({
      status,
      message,
    });
  }

  // For unexpected errors, log the detailed error and return a generic message
  console.error('ERROR 💥:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

// Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
  // Specific error handling for different error types
  if (err.name === 'JsonWebTokenError') {
    err = new AppError('Invalid token. Please log in again.', 401);
  }
  if (err.name === 'TokenExpiredError') {
    err = new AppError('Your token has expired. Please log in again.', 401);
  }
  if (err.name === 'SequelizeValidationError') {
    err = new AppError(err.errors[0].message, 400);
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    err = new AppError('This value already exists. Please try a different one.', 400);
  }

  // Handle error based on the environment
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }

  // In production, send a simpler error message
  sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
