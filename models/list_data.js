'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class list_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


      models.list_data.hasMany(models.user_list_permissions, {
        foreignKey: {
          name: 'id'
        },
        key: 'list_id'
      })
   
      
      models.list_data.belongsTo(models.user_accounts, {
        foreignKey: {
          name: 'creator_id'
        },
        key: 'id'
      })


      models.list_data.hasMany(models.food_list_data, {
        foreignKey: {
          name: 'list_id'
        },
        key: 'id'
      })
      // define association here
    }
  }
  list_data.init({
    list_name: DataTypes.STRING,
    creator_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'list_data',
    timestamps:true,
    underscored:true
  });
  return list_data;
};