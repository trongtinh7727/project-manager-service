const express = require('express');
const workspaceController = require('../controllers/workspaceController');
const { authentication, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authentication);
router.post('/create', workspaceController.createWorkspace);
router.post('/:workspaceId/add-member', workspaceController.addMembers);

router.get('/:workspaceId/users', workspaceController.getAllUsers);
router.get('/:workspaceId/tasks', workspaceController.getTasksByWorkspace);
router.get('/:workspaceId', workspaceController.getWorkspace);
router.delete('/:workspaceId', workspaceController.deleteWorkspace);

module.exports = router;
