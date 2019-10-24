'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nome: Sequelize.STRING(255),
      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING(14),
        allowNull: false
      },
      acesso: {
        type: Sequelize.ENUM,
        values: ['admin', 'usuario'],
        allowNull: false,
        defaultValue: 'usuario'
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_cadastro: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_atualizacao: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};
