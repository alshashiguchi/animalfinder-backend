'use strict';

const Boom = require('boom');

module.exports = {
  register: async (server) => {
    const badImplementationCustom = (err) => {
      if (!err) {
        throw Boom.badImplementation('method not implemented');
      }

      if (err.isBoom) return err;
  
      if (!err.name) {
        throw Boom.badRequest(err);
      }
  
      switch (err.name) {
      case 'AttributesInvalidError':
        throw Boom.badData('fields invalid header');
      case 'SequelizeForeignKeyConstraintError':
        throw Boom.badData('foreign key constraint error');
      case 'SequelizeUniqueConstraintError':
        throw Boom.badData('unique constraint error');
      case 'SequelizeExclusionConstraintError':
        throw Boom.badData('exclusion constraint error');
      case 'SequelizeValidationError':
        throw Boom.badRequest(err.errors.forEach(item => item.message));
      default:
        throw Boom.badImplementation(err.message);
      }
    };
  
    await server.decorate('toolkit', 'badImplementationCustom', badImplementationCustom);
  },
  name: 'exception',
  version: '1.0.0'
};
