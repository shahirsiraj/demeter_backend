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
    }
  }
  food_places.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'food_places',
    timestamps:true,
    underscored:true
  });
  return food_places;
};