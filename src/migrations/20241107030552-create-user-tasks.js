'use strict';

/** @type {import('sequelize-cli').Migration} */
// migrations/xxxxxx-create-user-tasks.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserTasks', {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      taskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tasks',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserTasks');
  },
};

