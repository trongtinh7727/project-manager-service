const db = require('../models/index');

exports.createTask = async (req, res) => {
  const task = await db.Task.create({ ...req.body });
  res.json(task);
};

exports.assignUsers = async (req, res) => {
  const task = await db.Task.findByPk(req.params.taskId);
  await task.addUsers(req.body.userIds);
  res.send('Users assigned');
};

exports.addLabel = async (req, res) => {
  const task = await db.Task.findByPk(req.params.taskId);
  const label = await db.Label.findOrCreate({ where: { name: req.body.labelName } });
  await task.addLabel(label[0]);
  res.send('Label added to task');
};
