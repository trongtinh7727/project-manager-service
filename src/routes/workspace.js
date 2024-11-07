const express = require('express');
const workspaceController = require('../controllers/workspaceController');
const { authentication, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authentication);
router.post('/create', workspaceController.createWorkspace);
router.post('/:workspaceId/add-member', workspaceController.addMember);

module.exports = router;
