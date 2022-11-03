'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   /* await queryInterface.bulkInsert('Historiales', historiales, {});*/
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Historiales', null, {});
    
  }
};
