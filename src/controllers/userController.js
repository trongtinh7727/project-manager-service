const { where } = require('sequelize');
const db = require('../models/index');
const ResponseHandler = require('../utils/ResponseHandler');
const catchAsync = require('../utils/catchAsync');

const getAllWorkspaces = catchAsync(async (req, res) => {
    const user = await db.User.findByPk(req.params.userId, {
        include: {
            model: db.Workspace,
            as: 'workspaces',
            attributes: ['id', 'name', 'description'],
        },
    });

    if (!user) {
        return ResponseHandler.error(res, 'User not found', 404);
    }

    const workspaces = user.workspaces;
    ResponseHandler.success(res, 'Workspaces retrieved successfully', workspaces);
});

const getAllTasks = catchAsync(async (req, res) => {
    const user = await db.User.findByPk(req.params.userId, {
        include: {
            model: db.Task,
            as: 'tasks',
            attributes: ['id', 'title', 'description', 'status', 'dueDate', 'workspaceId'],
        },
    });

    if (!user) {
        return ResponseHandler.error(res, 'User not found', 404);
    }

    const tasks = user.tasks;
    ResponseHandler.success(res, 'Tasks retrieved successfully', tasks);
});

module.exports = {getAllWorkspaces, getAllTasks}