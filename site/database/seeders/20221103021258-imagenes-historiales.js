'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   /* await queryInterface.bulkInsert('ImagenesHistoriales', imagenesHistoriales, {});*/
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ImagenesHistoriales', null, {});
  }
};
