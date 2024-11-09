const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const passport = require('../config/passport')
const jwt = require('jsonwebtoken');


router.post('/register', authController.register);
router.get('/confirmEmail/:token', authController.confirmEmail);
router.post('/login', authController.login);
router.get('/getCurrentUser', authController.authentication);

// Google SSO
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        // Generate JWT token after successful Google login
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        // Send token to client or redirect
        res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
    }
);

module.exports = router;
