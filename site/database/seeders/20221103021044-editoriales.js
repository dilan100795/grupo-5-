'use strict';

/** @type {import('sequelize-cli').Migration} */
let listado=['Fontana','Debolsillo','Alienta','Booket', 'PlanetaLector', 'Click', 'Urano']
let editoriales =listado.map(editorial =>{
 return {
   name: editorial,
   createdAt : new Date,
   updatedAt : new Date
 }
})
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('editoriales', editoriales, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('editoriales', null, {});
  }
}; 