'use strict';

const Controller = require('../public/usuario.public.controller');
const Validator = require('../public/usuario.public.validation');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/usuario',
        config: {          
          description: 'Recupera o usuários',
          notes: 'Retorna um usuário especifico cadastrado no sistema',
          tags: ['api'],
          auth: {
            scope: ['usuario', 'admin']
          },
          handler: Controller.get,
          validate: Validator.get()
        }
      },
      {
        method: 'POST',
        path: '/usuario',
        config: {
          description: 'Cadastra um novo usuário',
          notes: 'Cadastrar um novo usuário no sistema',
          tags: ['api'],
          auth: false,
          handler: Controller.create,

          validate: Validator.create()
        }
      },
      {
        method: ['PUT', 'PATCH'],
        path: '/usuario',
        config: {
          auth: {
            scope: ['usuario', 'admin']
          },
          handler: Controller.update,
          validate: Validator.update()
        }        
      }
    ]);
  },
  name: 'usuario-public-route',
  version: '1.0.0'
};



