'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('imoveis', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      cep: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      complemento: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      valor: {
        type: Sequelize.DOUBLE(6, 2),
        allowNull: true
      },
      quantidade_quartos: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      disponivel: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('imoveis');
  }
};
