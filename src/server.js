require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const workspaceRoutes = require('./routes/workspace');
const taskRoutes = require('./routes/task');
const healthRoutes = require('./routes/health')
const globalErrorHandler = require('./middleware/errorHandler');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/AppError');
const passport = require('./config/passport');

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/workspace', workspaceRoutes);
app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/health',healthRoutes)

app.use(
  '*',
  catchAsync(async (req, res, next) => {
      throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server up and running', PORT);
});
