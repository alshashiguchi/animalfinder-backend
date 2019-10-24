'use strict';

const { getELK } = require('../utils/load');

const config = getELK();

module.exports = {
  register: async (server) => {
    const options = {
      ops: {
        interval: 10000
      },
      includes: {
        request: ['headers', 'payload'],
        response: ['payload']
      },
      reporters: {
        console: [{
          module: '@hapi/good-console'
        }, 'stdout'],
        file: [{
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [{ ops: '*', error: '*' }]
        }]
      }
    };

    if (config.enabled) {
      options.reporters.http = [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', error: '*', request: '*', response: '*' }]
      }, {
        module: 'good-http',
        args: [config.host, {
          threshold: 0,
          wreck: {
            headers: { }
          }
        }]
      }];
    };

    return server.register({
      plugin: require('@hapi/good'),
      options
    });
  },
  name: 'logs',
  version: '1.0.0'
};
