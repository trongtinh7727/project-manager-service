'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Task, {
      through: 'UserTasks',
      foreignKey: 'userId',
      as: 'tasks',
    });

    User.belongsToMany(models.Workspace, {
      through: 'UserWorkspaces',
      foreignKey: 'userId',
      as: 'workspaces',
    });
  };

  return User;
};
