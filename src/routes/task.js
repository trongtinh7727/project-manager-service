const express = require('express');
const taskController = require('../controllers/taskController');
const { authentication, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authentication);

router.post('/create', taskController.createTask);
router.post('/assign', taskController.assignToUser);
router.post('/remove', taskController.removeUser);
router.put('/:taskId/status', taskController.updateStatus);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
