const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');

// Authentication middleware to verify the JWT token
const authentication = catchAsync(async (req, res, next) => {
  let accessToken = '';
  
  // Check for authorization header and extract the token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    accessToken = req.headers.authorization.split(' ')[1];
  }

  // If the token is missing, return an error
  if (!accessToken) {
    return next(new AppError('You are not logged in!', 401));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Find the user from the database using the decoded token's ID
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('User belonging to this token no longer exists.', 401));
    }

    // Attach user to request object for future use
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token.', 401));
  }
});

// Restrict access to certain routes based on user roles (e.g., admin)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }
    next();
  };
};

module.exports = { authentication, restrictTo };
