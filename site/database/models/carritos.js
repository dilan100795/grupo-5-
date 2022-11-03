'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      carritos.belongsTo(models.usuarios, {
        as: 'user',
        foreignKey: 'usuariosId'
      })

      carritos.belongsTo(models.products, {
        as: 'producto',
        foreignKey: 'productsId'
      })
      
      carritos.hasMany(models.ordenes, {
        as: 'ordenes',
        foreignKey: 'carritosId'
      })
    }
  }
  carritos.init({
    productsId: DataTypes.INTEGER,
    usuariosId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'carritos',
  });
  return carritos;
};