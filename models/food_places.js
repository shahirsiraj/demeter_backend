'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food_places extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.food_places.hasMany(models.list_data, {
        foreignKey:{
          name: 'id'
      }, 
      key: 'food_id'
      })
    }
  }
  food_places.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    // opening_hours: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'food_places',
    timestamps:true,
    underscored:true
  });
  return food_places;
};