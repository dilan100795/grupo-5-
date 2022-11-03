'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*await queryInterface.bulkInsert('Carritos', carritos, {});*/
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Carritos', null, {});
  }
};
