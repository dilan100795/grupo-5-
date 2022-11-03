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
      ordenes.belongsTo(models.carritos, {
        as: 'cars',
        foreignKey: 'carritosId'
      })
    }
  }
  ordenes.init({
    carritosId: DataTypes.INTEGER,
    usuariosId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ordenes',
  });
  return ordenes;
};