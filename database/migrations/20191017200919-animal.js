'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('animais', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },      
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING(4096),
        allowNull: true
      },      
      idade: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      informacoes_adicionais: {
        type: Sequelize.STRING(4096),
        allowNull: true
      },      
      cidade: {
        type: Sequelize.STRING(100),
        allowNull: false
      },    
      estado: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      encontrei_nome: {
        type: Sequelize.STRING(255),
        allowNull: true
      },      
      encontrei_telefone: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      data_desaparecimento: {
        allowNull: false,
        type: Sequelize.DATE
      },          
      dono: {
        type: Sequelize.BIGINT,
        field: 'dono_id',
        allowNull: false
      },  
      data_cadastro: {
        allowNull: false,
        type: Sequelize.DATE
      },
      data_atualizacao: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    return queryInterface.addConstraint('animais', ['dono_id'], {
      type: 'foreign key',
      name: 'FK_ANIMAIS_USUARIO_ID001',
      references: {
        table: 'usuarios',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('animais', 'FK_ANIMAIS_USUARIO_ID001');
    return queryInterface.dropTable('animais');
  }
};