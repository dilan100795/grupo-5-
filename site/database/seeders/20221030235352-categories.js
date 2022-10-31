'use strict';

/** @type {import('sequelize-cli').Migration} */
let lista=['suspenso','novela','poesia']
let categories =lista.map(categoria =>{
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