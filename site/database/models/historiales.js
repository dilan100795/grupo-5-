'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historiales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      historiales.belongsTo(models.categories, {
        as: 'categoria',
        foreignKey: 'categoriesId'
      })
      
      historiales.belongsTo(models.editoriales, {
        as: 'editorial',
        foreignKey: 'editorialesId'
      })

      historiales.hasMany(models.imagenes_historiales, {
        as: 'imagen_historial',
        foreignKey: 'historialesId'
      })
    }
    
  }
  historiales.init({
    titulo: DataTypes.STRING,
    autor:DataTypes.STRING,
    idioma:DataTypes.STRING,
    tapa:DataTypes.STRING,
    precio:DataTypes.INTEGER,
    descuento:DataTypes.INTEGER,
    stock:DataTypes.INTEGER,
    descripcion:DataTypes.STRING,
    modelo:DataTypes.INTEGER,
    categoriesId:DataTypes.INTEGER,
    editorialesId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'historiales',
  });
  return historiales;
};