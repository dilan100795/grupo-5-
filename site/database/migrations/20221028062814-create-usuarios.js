'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      imagen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      /*telefono: {
        type: Sequelize.STRING,
        
      },
      direcion: {
        type: Sequelize.STRING,
       
      },
      codigo_postal: {
        type: Sequelize.STRING,
       
      },*/
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};