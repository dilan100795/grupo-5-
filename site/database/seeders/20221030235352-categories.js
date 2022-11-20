'use strict';

/** @type {import('sequelize-cli').Migration} */
let listado=['Suspenso','Novelas','Poesia','Infantiles', 'NoFiccion', 'Educativo', 'Clasicos','CienciaFiccion']
let categories =listado.map(categoria =>{
 return {
   name: categoria,
   createdAt : new Date,
   updatedAt : new Date
 }
})
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('categories', null, {});
  }
};           