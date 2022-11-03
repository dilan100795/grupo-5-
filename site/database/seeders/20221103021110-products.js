'use strict';

/** @type {import('sequelize-cli').Migration} */

let listado = require('../../data/productos.json')

let listadoCategorias=['suspenso','novelas','poesia','infantiles', 'noFiccion', 'educativo', 'clasicos','cienciaFiccion']

let listadoEditoriales=['Fontana','Debolsillo','Alienta','Booket', 'PlanetaLector', 'Click', 'Urano']

let products = []

listado.forEach(producto => {

    let categoria
    let editorial
    
    listadoCategorias.forEach((categoriaLista,index) => {
      if (categoriaLista === producto.categoria) {
          return categoria = index + 1
      }
    });
  
    listadoEditoriales.forEach((elemento,index) => {
      if ((elemento.toUpperCase()) === (producto.editorial.toUpperCase())) {
          return editorial = index + 1
      }
    });


  let nuevo = {
    titulo: producto.titulo,
    autor: producto.autor,
    idioma: producto.idioma,
    tapa: producto.tapa,
    precio: producto.precio,
    descuento: producto.descuento,
    stock: producto.stock,
    descripcion: producto.descripcion,
    modelo: producto.modelo,
    categoriesId: categoria,
    editorialesId: editorial,
    createdAt : new Date,
    updatedAt : new Date
  }
  products.push(nuevo)
});

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', products, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('products', null, {});
  }
};
