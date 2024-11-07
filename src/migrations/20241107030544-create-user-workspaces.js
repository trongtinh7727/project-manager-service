'use strict';

/** @type {import('sequelize-cli').Migration} */
// migrations/xxxxxx-create-user-workspaces.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserWorkspaces', {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',  // The table name
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      workspaceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Workspaces',  // The table name
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserWorkspaces');
  },
};

