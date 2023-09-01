'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_list_permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user_list_permissions.belongsTo(models.user_accounts, {
        foreignKey: {
          name: 'user_id'
        },
        key: 'id'
      })

      models.user_list_permissions.belongsTo(models.list_data, {
        foreignKey: {
          name: 'list_id'
        },
        key: 'id'
      })
   
      
    }

    
  }

  
  user_list_permissions.init({
    list_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_list_permissions',
    timestamps:true,
    underscored:true
  });
  return user_list_permissions;
}