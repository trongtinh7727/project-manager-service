const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const crypto = require('crypto');
const sendEmail = require('../utils/email');
const confirmEmailHTML = require('../templates/emailTemplate')
const ResponseHandler = require('../utils/ResponseHandler');

// Generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Validate token
const validateToken = (token) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register new user
const register = catchAsync(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email) {
    return next(new AppError('Please provide an email address', 400));
  }

  // Hash the password
  const hash = await bcrypt.hash(password, 10);

  // Create the new user
  const newUser = await db.User.create({ email, username, password: hash });
  if (!newUser) {
    return ResponseHandler.error(res, 'User registration failed')
  }

  const confirmToken = crypto.randomBytes(32).toString('hex');
  newUser.confirmToken = confirmToken;
  await newUser.save();

  const confirmURL = `${process.env.APP_URL}/api/v1/auth/confirmEmail/${confirmToken}`;

  await sendEmail({
    email: newUser.email,
    subject: 'Confirm Your Email',
    content: confirmEmailHTML(confirmURL),
  });

  return ResponseHandler.success(res, 'User registered. Please check your email to confirm your account.')
});

// Confirm email
const confirmEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  const user = await db.User.findOne({ where: { confirmToken: token } });
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.isConfirmed = true;
  user.confirmToken = null;
  await user.save();

  return ResponseHandler.success(res, 'Email confirmed successfully!')
});

// Login user
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Find user by email
  const user = await db.User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return ResponseHandler.error(res, 'Invalid email or password')
  }

  const { id, username, email: userEmail, isConfirmed, role, } = user;
  const userData = { id, username, email: userEmail, isConfirmed, role, };


  // Generate token and send response
  const token = generateToken(user.id);
  user.password = null;
  return ResponseHandler.success(res, 'Login successfully!', { userData, token })
});

// Authentication middleware to verify the JWT token
const authentication = catchAsync(async (req, res, next) => {
  let accessToken = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    accessToken = req.headers.authorization.split(' ')[1];
  }

  // Check if the token exists
  if (!accessToken) {
    return next(new AppError('You are not logged in!', 401));
  }

  // Verify the token
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

  // Find user by decoded token id
  const user = await db.User.findByPk(decoded.id);
  if (!user) {
    return next(new AppError('User belonging to this token no longer exists.', 401));
  }

  return ResponseHandler.success(res, 'Authenticate successfully!', { userData, token })
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

module.exports = { register, confirmEmail, login, authentication, restrictTo };
