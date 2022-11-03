'use strict';

/** @type {import('sequelize-cli').Migration} */
let listado=['suspenso','novelas','poesia','infantiles', 'noFiccion', 'educativo', 'clasicos','cienciaFiccion']
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