'use strict';

/** @type {import('sequelize-cli').Migration} */

let listado = require('../../data/usuarios.json')

let usuarios = listado.map(usuario => {
  let elemento = {
    name: usuario.name,
    email: usuario.email,
    password: usuario.pass,
    imagen: usuario.image,
    rol: usuario.rol === 'Administrador' ? 1 : 2,
    createdAt:new Date,
    updatedAt:new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', usuarios, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
