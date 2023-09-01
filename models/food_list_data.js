'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food_list_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.food_list_data.belongsTo(models.list_data, {
        foreignKey: {
          name: 'id'
        },
        key: 'list_id'
      })

      models.food_list_data.belongsTo(models.food_places, {
        foreignKey:{
          name: 'id'
      }, 
      key: 'food_id'
      })


    }
  }

  food_list_data.init({
    list_id: DataTypes.INTEGER,
    food_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'food_list_data',
    timestamps:true,
    underscored:true
  });
  return food_list_data;
};