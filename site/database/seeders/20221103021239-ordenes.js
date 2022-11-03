'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*await queryInterface.bulkInsert('Ordenes', ordenes , {});*/
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ordenes', null, {});
  }
};
