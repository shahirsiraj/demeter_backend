'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('food_list_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      list_id: {
        allowNull:false, 
        type:Sequelize.INTEGER,
        references: {
          model: {
            tableName:'list_data'
          },
          key:"list_id"
        }
      },
      food_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'food_places'
          },
          key:'food_id'
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
    await queryInterface.dropTable('food_list_data');
  }
};