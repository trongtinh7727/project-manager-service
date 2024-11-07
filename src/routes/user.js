const express = require('express');
const userController = require('../controllers/userController');
const { authentication, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authentication);

router.get('/:userId/workspaces', userController.getAllWorkspaces);

module.exports = router;