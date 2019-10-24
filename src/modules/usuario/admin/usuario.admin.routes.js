'use strict';

const Controller = require('../admin/usuario.admin.controller');
const Validator = require('../admin/usuario.admin.validation');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/usuario/admin',
        config: {
          description: 'Listagem de usuários',
          notes: 'Retorna uma lista de usuários cadastrado no sistema',
          tags: ['api'],
          auth: {
            scope: ['admin']
          },
          handler: Controller.list
        }
      },
      {
        method: 'GET',
        path: '/usuario/admin/{id}',
        config: {          
          description: 'Recupera o usuários',
          notes: 'Retorna um usuário especifico cadastrado no sistema',
          tags: ['api'],
          auth: {
            scope: ['admin']
          },
          handler: Controller.get,
          validate: Validator.get()
        }
      },
      {
        method: 'POST',
        path: '/usuario/admin',
        config: {
          description: 'Cadastra um novo usuário',
          notes: 'Cadastrar um novo usuário no sistema',
          tags: ['api'],
          auth: {
            scope: ['admin']
          },
          handler: Controller.create,
          validate: Validator.create()
        }
      },
      {
        method: ['PUT', 'PATCH'],
        path: '/usuario/admin/{id}',
        config: {
          description: 'Atualiza o usuário no sistema',
          notes: 'Atualiza o usuário no sistema',
          tags: ['api'],          
          auth: {
            scope: ['admin']
          },
          handler: Controller.update,
          validate: Validator.update()
        }        
      },
      {
        method: 'DELETE',
        path: '/usuario/admin/{id}',        
        config: {
          description: 'Exclui o usuário no sistema',
          notes: 'Exclui o usuário no sistema',
          tags: ['api'],                  
          auth: {
            scope: ['admin']
          },
          handler: Controller.destroy,
          validate: Validator.destroy()
        }        
      }
    ]);
  },
  name: 'usuario-admin-route',
  version: '1.0.0'
};



