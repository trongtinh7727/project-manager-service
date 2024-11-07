const db = require('../models/index');

exports.createWorkspace = async (req, res) => {
  const workspace = await db.Workspace.create({ name: req.body.name });
  res.json(workspace);
};

exports.addMember = async (req, res) => {
  const { userId } = req.body;
  const workspace = await db.Workspace.findByPk(req.params.workspaceId);
  if (workspace) {
    await workspace.addUser(userId);
    res.send('Member added successfully');
  } else {
    res.status(404).send('Workspace not found');
  }
};
