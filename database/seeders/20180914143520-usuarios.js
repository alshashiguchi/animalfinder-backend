'use strict';

module.exports = {  
  
  up: (queryInterface, Sequelize) => {  
    const model = queryInterface.sequelize.import('../../src/models/usuario.models');
    const usuario = new model({
      nome: 'André',
      email: 'teste2@teste.com.br',
      telefone: '(14) 1234-5678',
      senha: 'abc123',
      acesso: 'admin'
    });

    return usuario.save();

  },
	
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('usuarios', null, { where: { email: 'teste2@teste.com.br' } });
  }
};
