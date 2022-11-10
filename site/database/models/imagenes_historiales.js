'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagenes_historiales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      imagenes_historiales.belongsTo(models.historiales, {
        as: 'historial',
        foreignKey: 'historialesId'
      })
    }
  }
  imagenes_historiales.init({
    nombre: DataTypes.STRING,
    historialesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'imagenes_historiales',
  });
  return imagenes_historiales;
};