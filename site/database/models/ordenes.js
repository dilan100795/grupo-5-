'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ordenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ordenes.belongsTo(models.usuarios,{
        as: 'usuario',
        foreignKey: 'usuariosId'
      })
      Ordenes.hasMany(models.Carritos,{
        as: 'carrito',
        foreignKey: 'ordenesId'
      })
    }
  }
  Ordenes.init({
    usuariosId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ordenes',
  });
  return Ordenes;
};