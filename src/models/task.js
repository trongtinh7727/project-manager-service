'use strict';
// src/models/task.js
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'to do',
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    timestamps: true,
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Workspace, {
      foreignKey: 'workspaceId',
      as: 'workspace',
    });

    Task.belongsToMany(models.User, {
      through: 'UserTasks',
      foreignKey: 'taskId',
      as: 'users',
    });
  };

  return Task;
};
