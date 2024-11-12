const { where } = require('sequelize');
const db = require('../models/index');
const ResponseHandler = require('../utils/ResponseHandler');
const catchAsync = require('../utils/catchAsync');

const createWorkspace = catchAsync(async (req, res) => {
  const workspace = await db.Workspace.create({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description || '',
  });

  // Find author
  const author = await db.User.findOne({
    where: { email: req.body.author }
  });

  // Add author to workspace
  await workspace.addUser(author)

  ResponseHandler.success(res, 'Created workspace!', workspace)

});

const addMembers = catchAsync(async (req, res) => {
  const { emails } = req.body; // Expecting an array of emails
  const workspace = await db.Workspace.findByPk(req.params.workspaceId);


  if (workspace) {
    const users = await db.User.findAll({
      where: { email: emails },
    });

    if (users.length === 0) {
      return ResponseHandler.error(res, 'No users found for the given emails', 404);
    }
    // Add all found users to the workspace
    await workspace.addUsers(users);
    ResponseHandler.success(res, `${users.length} members added successfully`)
  } else {
    return ResponseHandler.error(res, 'Workspace not found', 404);
  }
});

const getAllUsers = catchAsync(async (req, res) => {
  const workspace = await db.Workspace.findByPk(req.params.workspaceId, {
    include: {
      model: db.User,
      as: 'users',
      attributes: ['id', 'username', 'email'],
    },
  });

  if (!workspace) {
    return ResponseHandler.error(res, 'Workspace not found', 404);
  }

  const users = workspace.users;
  ResponseHandler.success(res, 'Users retrieved successfully', users);
});

const deleteUser = catchAsync(async (req, res) => {
  const { workspaceId, userId } = req.params;

  // Find the workspace by ID
  const workspace = await db.Workspace.findByPk(workspaceId);

  if (!workspace) {
    return ResponseHandler.error(res, 'Workspace not found', 404);
  }

  // Find the user by ID
  const user = await db.User.findByPk(userId);

  if (!user) {
    return ResponseHandler.error(res, 'User not found', 404);
  }

  // Check if the user is associated with the workspace
  const isMember = await workspace.hasUser(user);
  if (!isMember) {
    return ResponseHandler.error(res, 'User is not a member of this workspace', 400);
  }

  // Remove the user from the workspace
  await workspace.removeUser(user);
  ResponseHandler.success(res, 'User removed successfully from the workspace');
});

const deleteWorkspace = catchAsync(async (req, res) => {
  const { workspaceId } = req.params;

  // Find the workspace by ID
  const workspace = await db.Workspace.findByPk(workspaceId);

  if (!workspace) {
    return ResponseHandler.error(res, 'Workspace not found', 404);
  }

  // Delete the workspace
  await workspace.destroy();
  ResponseHandler.success(res, 'Workspace deleted successfully');
});

const getWorkspace = catchAsync(async (req, res) => {
  const { workspaceId } = req.params;

  // Find the workspace by ID
  const workspace = await db.Workspace.findByPk(workspaceId);

  if (!workspace) {
    return ResponseHandler.error(res, 'Workspace not found', 404);
  }

  const tasks = await db.Task.findAll({
    where: { workspaceId },
    include: [
      {
        model: db.User,
        as: 'users',
        attributes: ['id', 'username'],
        through: { attributes: [] },
      },
    ],
  });

  ResponseHandler.success(res, 'successfully', { workspace, tasks });
});

const getTasksByWorkspace = catchAsync(async (req, res) => {
  const { workspaceId } = req.params;

  const tasks = await db.Task.findAll({
    where: { workspaceId },
    include: [
      {
        model: db.Workspace,
        as: 'workspace',
        attributes: ['id', 'name'],
      },
      {
        model: db.User,
        as: 'users',
        attributes: ['id', 'username'],
        through: { attributes: [] },
      },
    ],
  });

  res.status(200).json(tasks);
});

module.exports = { createWorkspace, addMembers, getAllUsers, deleteUser, deleteWorkspace, getWorkspace, getTasksByWorkspace };