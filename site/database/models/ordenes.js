'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ordenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     ordenes.belongsTo(models.usuarios, {
        as: 'usuario',
        foreignKey: 'usuariosId'
      })
      ordenes.belongsTo(models.carrito, {
        as: 'cars',
        foreignKey: 'carritoId'
      })
    }
  }
  ordenes.init({
    carritoId: DataTypes.INTERGER,
    usuariosId:DataTypes.INTERGER
  }, {
    sequelize,
    modelName: 'ordenes',
  });
  return ordenes;
};