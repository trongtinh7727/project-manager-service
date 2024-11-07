'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define('Workspace', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Workspace.associate = (models) => {
    Workspace.belongsToMany(models.User, {
      through: 'UserWorkspaces', 
      foreignKey: 'workspaceId',
      as: 'users',
    });

    Workspace.hasMany(models.Task, {
      foreignKey: 'workspaceId',
      as: 'tasks',
    });
  };

  return Workspace;
};
