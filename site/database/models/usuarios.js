'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarios.hasMany(models.ordenes, {
        as: 'ordenes',
        foreignKey: 'usuariosId'
      })
      usuarios.hasMany(models.carritos, {
        as: 'carritos',
        foreignKey: 'usuariosId'
      })
    }
  }
  usuarios.init({
    name: DataTypes.STRING,
    emai: DataTypes.STRING,
    password: DataTypes.STRING,
    imagen: DataTypes.STRING,
    rol: DataTypes.STRING,
    /*telefono: DataTypes.STRING,
    direcion:DataTypes.STRING,
    codigo_postal: DataTypes.STRING,*/
    
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};