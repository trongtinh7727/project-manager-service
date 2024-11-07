'use strict';

/** @type {import('sequelize-cli').Migration} */
// migrations/xxxxxx-add-dates-to-tasks.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'dueDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'dueDate');
  },
};
