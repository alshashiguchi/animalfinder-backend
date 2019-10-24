'use strict';

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../../package');

module.exports = {
  register: async (server) => {
    const swaggerOptions = {
      schemes: ['http'],
      host: server.info.uri,
      info: {
        title: 'Test API Documentation',
        version: Pack.version,
      },
      swaggerUIPath: '/v1/',
      jsonPath: '/v1/swagger.json',
      documentationPath: '/v1/docs',
      pathPrefixSize: 2,
      securityDefinitions: {
        'Bearer': {
          'type': 'apiKey',
          'name': 'Authorization',
          'in': 'header'
        }
      }
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);

  },
  name: 'documentation',
  version: '1.0.0'
};
