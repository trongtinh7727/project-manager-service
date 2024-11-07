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
    confirmToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('free_user', 'premium_user'),
      allowNull: false,
      defaultValue: 'free_user',
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
