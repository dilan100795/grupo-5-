'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Products.belongsTo(models.categories, {
        as: 'categoria',
        foreignKey: 'categoriesId'
      })
      
      Products.belongsTo(models.editoriales, {
        as: 'editorial',
        foreignKey: 'editorialesId'
      })

      Products.hasMany(models.imagenes, {
        as: 'imagenes',
        foreignKey: ' productsId'
      })
      Products.hasMany(models.carrito, {
        as: 'carritos',
        foreignKey: ' productsId'
      })

    }

  }
  Products.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    idioma: DataTypes.STRING,
    tapa: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descuento: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    modelo: DataTypes.INTEGER,
    categoriesId: DataTypes.INTEGER,
    editorialesId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'products',
  });
  return Products;
};