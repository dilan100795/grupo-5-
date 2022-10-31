'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      imagenes.belongsTo(models.Products, {
        as: 'producto',
        foreignKey: ' productsId'
      })
    }
  }
  imagenes.init({
    nombre: DataTypes.STRING,
    productsId:DataTypes.INTERGER

  }, {
    sequelize,
    modelName: 'imagenes',
  });
  return imagenes;
};