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
          key:"id"
        }
      },
      food_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'food_places'
          },
          key:'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('food_list_data')
  }
};