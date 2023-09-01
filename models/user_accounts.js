'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.user_accounts.hasMany(models.user_list_permissions, {
        foreignKey: {
          name: 'id'
        },
        key: 'user_id'
      })
      models.user_accounts.hasMany(models.list_data, {
        foreignKey: {
          name: 'creator_id'
        },
        key: 'id'
      })
    }
  }
  user_accounts.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // created_at: DataTypes.DATE,
    // updated_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'user_accounts',
    timestamps:true,
    underscored:true
  });
  return user_accounts;
};