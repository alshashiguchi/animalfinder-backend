'use strict';

const { getKeyAuth } = require('../utils/load');

module.exports = {
  register: async (server) => {
    await server.register(require('hapi-auth-jwt2'));

    const validate = async function (decoded, request) {

      const _token = request.headers.authorization.replace('Bearer', '').trim();

      const { Usuarios } = request.database;
      const _usuario = await Usuarios.findOne({ where: { email: decoded.email } });

      if (!_usuario) return { isValid: false };

      const value = await request.redis.getAsync(_token);

      if (_usuario.id === value) return { isValid: true };

      return { isValid: false };
    };

    server.auth.strategy('jwt', 'jwt', {
      key: getKeyAuth().key,
      validate: validate,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });

    server.auth.default({
      strategy: 'jwt',
      scope: ['admin']
    });
  },
  name: 'auth',
  version: '1.0.0'
};
