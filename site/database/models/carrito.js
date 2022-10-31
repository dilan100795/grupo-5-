'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      carrito.belongsTo(models.usuarios, {
        as: 'user',
        foreignKey: 'usuariosId'
      })
      carrito.belongsTo(models.Products, {
        as: 'producto',
        foreignKey: 'productsId'
      })
      carrito.hasMany(models.ordenes, {
        as: 'ordenes',
        foreignKey: 'carritoId'
      })
    }
  }
  carrito.init({
    productsId: DataTypes.INTERGER,
    usuariosId:DataTypes.INTERGER

  }, {
    sequelize,
    modelName: 'carrito',
  });
  return carrito;
};