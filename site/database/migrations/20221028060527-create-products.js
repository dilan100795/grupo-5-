'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idioma: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tapa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     precio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
       descuento: {
        type: Sequelize.INTEGER

      }, stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, descripcion: {
        type: Sequelize.STRING(400),
        allowNull: false,
      }, modelo: {
        type: Sequelize.INTEGER

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      categoriesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Categories'
          },
          key: 'id'
        }, 
      },
      editorialesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'editoriales'
          },
          key: 'id'
        }, 
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};