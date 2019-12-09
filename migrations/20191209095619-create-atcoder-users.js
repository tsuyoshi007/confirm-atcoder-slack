'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('atcoder_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slack_id: {
        type: Sequelize.STRING
      },
      slack_username: {
        type: Sequelize.STRING
      },
      atcoder_username: {
        type: Sequelize.STRING
      },
      vc_name: {
        type: Sequelize.STRING
      },
      batch: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('atcoder_users');
  }
};