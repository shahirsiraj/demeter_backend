'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_list_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      list_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'list_data'
          },
          key:'list_id'
        }
      },
      user_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'user_accounts'
          },
          key:'id'
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_list_permissions');
  }
};