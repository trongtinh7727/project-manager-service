'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserTasks', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('UserTasks', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserTasks', 'createdAt');
    await queryInterface.removeColumn('UserTasks', 'updatedAt');
  },
};