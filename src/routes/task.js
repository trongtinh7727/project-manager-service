const express = require('express');
const taskController = require('../controllers/taskController');
const { authentication, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authentication);
router.post('/create', taskController.createTask);
router.post('/:taskId/assign', taskController.assignUsers);
router.post('/:taskId/label', taskController.addLabel);

module.exports = router;
