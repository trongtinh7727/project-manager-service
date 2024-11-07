'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserWorkspaces', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('UserWorkspaces', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserWorkspaces', 'createdAt');
    await queryInterface.removeColumn('UserWorkspaces', 'updatedAt');
  },
};