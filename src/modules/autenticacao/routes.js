'use strict';

const Controller = require('./controller');
const Validator = require('./validation');

module.exports = {
  register: async (server) => {
    server.route({
      method: 'POST',
      path: '/auth',      
      config: {
        auth: false,
        handler: Controller.auth,
        validate: Validator.auth()
      }
    });
  },
  name: 'autenticacao-route',
  version: '1.0.0'
};
