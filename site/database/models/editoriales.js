'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class editoriales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     editoriales.hasMany(models.products, {
      as: 'productos',
      foreignKey: 'editorialesId'
     })

     editoriales.hasMany(models.historiales, {
        as: 'historiales',
        foreignKey: 'editorialesId'
      })
    }
  }
  editoriales.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'editoriales',
  });
  return editoriales;
};