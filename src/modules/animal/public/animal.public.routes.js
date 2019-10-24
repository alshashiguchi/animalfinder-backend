'use strict';

const Controller = require('../public/animal.public.controller');
const Validator = require('./animal.public.validation');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/animal',
        config: {
          description: 'Lista Animais',
          notes: 'Lista Animais não é necessário estar logado',
          tags: ['api', 'public', 'animal'],
          auth: false,
          handler: Controller.list
        }
      },
      {
        method: 'GET',
        path: '/animal/{id}',
        config: {
          description: 'Recupera Animais',
          notes: 'Recupera Animais não é necessário estar logado',
          tags: ['api', 'public', 'animal'],
          auth: false,
          handler: Controller.get,
          validate: Validator.get()
        }
      },
      {
        method: 'PUT',
        path: '/animal/{id}/encontrei',
        config: {
          description: 'Grava pessoa que encontrou o animal ',
          notes: 'Grava pessoa que encontrou o animal não é necessário estar logado',
          tags: ['api', 'public', 'animal'],
          auth: false,
          handler: Controller.encontrei,
          validate: Validator.encontrei()
        }
      },
      {
        method: 'POST',
        path: '/animal',
        config: {
          description: 'Cadastra uma nova animal',
          notes: 'Cadastra uma nova animal não é necessário estar logado',
          tags: ['api', 'public', 'animal'],
          auth: {
            scope: ['public', 'admin']
          },
          handler: Controller.create,
          validate: Validator.create()
        }
      },
      {
        method: 'PUT',
        path: '/animal/{id}',
        config: {          
          description: 'Atualiza animais de um usuário logado',
          notes: 'Atualiza animais de um usuário logado',
          tags: ['api', 'public', 'animal'],
          auth: {
            scope: ['public', 'admin']
          },
          handler: Controller.update,
          validate: Validator.update()
        }
      },
      {
        method: 'DELETE',
        path: '/animal/{id}',
        config: {
          auth: {
            scope: ['public', 'admin']
          },
          handler: Controller.destroy,
          validate: Validator.destroy()
        }        
      },
      {
        method: 'PUT',
        path: '/animal/{id}/upload',
        config: {
          description: 'Incluir foto do Animal',
          notes: 'Adiciona um foto no Animal',
          auth: {
            scope: ['public', 'admin']
          },
          tags: ['api', 'public', 'animal'],
          payload: {
            maxBytes: 5000000,
            parse: true,
            output: 'stream',            
            allow: 'multipart/form-data'
          },
          plugins: {
            disinfect: {
              disinfectQuery: false,
              disinfectParams: false,
              disinfectPayload: false
            }
          },
          handler: Controller.uploadImagem
        }
      }  
    ]);
  },
  name: 'tarefa-public-route',
  version: '1.0.0'
};



