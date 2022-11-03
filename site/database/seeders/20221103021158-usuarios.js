'use strict';

/** @type {import('sequelize-cli').Migration} */

let listado = require('../../data/usuarios.json')

let usuarios = listado.map(usuario => {
  let elemento = {
    nombre: usuario.name,
    apellido: null,
    email: usuario.email,
    password: usuario.pass,
    imagen: usuario.image,
    rolId: usuario.rol === 'admin' ? 1 : 2,
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
