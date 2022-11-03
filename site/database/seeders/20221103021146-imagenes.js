'use strict';

/** @type {import('sequelize-cli').Migration} */

let listado = require('../../data/productos.json')

let imagenes = []

listado.forEach(producto => {
 
  let imagen = {
    name: producto.imagen,
    productsId: producto.id,
    createdAt : new Date,
    updatedAt : new Date
  }
  imagenes.push(imagen)
});

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Imagenes', imagenes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Imagenes', null, {});
    
  }
};
