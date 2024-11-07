'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  }
};
