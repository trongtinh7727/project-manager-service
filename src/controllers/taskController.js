const db = require('../models/index');
const ResponseHandler = require('../utils/ResponseHandler');
const catchAsync = require('../utils/catchAsync');

// Create Task
const createTask = catchAsync(async (req, res) => {
  const { workspaceId, title, description, dueDate } = req.body;
  const task = await db.Task.create({ workspaceId, title, description, dueDate });
  ResponseHandler.success(res, 'Task created successfully', task, 201);
});


// Assign a user to a task
const assignToUser = catchAsync(async (req, res) => {
  const { taskId, userId } = req.body;
  const task = await db.Task.findByPk(taskId);
  const user = await db.User.findByPk(userId);

  if (task && user) {
    await task.addUser(user);
    ResponseHandler.success(res, 'User assigned to task successfully');
  } else {
    ResponseHandler.error(res, 'Task or User not found', 404);
  }
});

// Remove a user from a task
const removeUser = catchAsync(async (req, res) => {
  const { taskId, userId } = req.body;
  const task = await db.Task.findByPk(taskId);
  const user = await db.User.findByPk(userId);

  if (task && user) {
    await task.removeUser(user);
    ResponseHandler.success(res, 'User removed from task successfully');
  } else {
    ResponseHandler.error(res, 'Task or User not found', 404);
  }
});

// Update the status of a task
const updateStatus = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  const task = await db.Task.findByPk(taskId);

  if (task) {
    task.status = status;
    await task.save();
    ResponseHandler.success(res, 'Task status updated successfully');
  } else {
    ResponseHandler.error(res, 'Task not found', 404);
  }
});

// Delete a task
const deleteTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const task = await db.Task.findByPk(taskId);

  if (task) {
    await task.destroy();
    ResponseHandler.success(res, 'Task deleted successfully');
  } else {
    ResponseHandler.error(res, 'Task not found', 404);
  }
});


module.exports = { createTask, assignToUser, removeUser, updateStatus, deleteTask }
