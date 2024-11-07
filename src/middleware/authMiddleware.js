const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  // Check for the presence of the authorization header
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return next(new AppError('You are not logged in! Please provide a valid token.', 401));
  }

  // Extract the token from the header
  const token = authorizationHeader.split(' ')[1];

  try {
    // Verify the token using jwt.verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user ID to the request object for future use
    req.userId = decoded.id;

    // Move to the next middleware
    next();
  } catch (error) {
    // Handle invalid or expired token errors
    return next(new AppError('Invalid or expired token. Please log in again.', 401));
  }
};
