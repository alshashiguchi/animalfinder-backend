'use strict';

const logs = require('../../../core/utils/logger');

const { getAttributes: attributesUsuario } = require('../usuario.schema');
const { USUARIO_NAO_LOCALIZADO } = require('../../../core/utils/mensageExceptions');

const get = async (request, reply) => {
  const { Usuarios } = request.database;
  const credentials = request.auth.credentials;

  try {    
  
    const _usuario = Usuarios.findOne({
      attributes: attributesUsuario,
      where: {
        id: credentials.id
      }
    });

    if (!_usuario) return reply.badRequest(USUARIO_NAO_LOCALIZADO);

    return _usuario;
  } catch (err) {
    logs.error(`Function (usuario.create): ${err}`);
    return reply.badImplementationCustom(err);
  }  
};

const create = async (request, reply) => {
  try {
    const result = await request.database.Usuarios.create(request.payload);
    return reply.response({ id: result.id }).code(201);
  } catch (err) {
    logs.error(`Function (usuario.public.create): ${err}`);
    return reply.badImplementationCustom(err);
  }
};


const update = async (request, reply) => {
  try {
    const { Usuarios } = request.database;
    const credentials = request.auth.credentials;

    const _usuario = await Usuarios.findByPk(credentials.id);

    if (!_usuario) return reply.badRequest(USUARIO_NAO_LOCALIZADO);

    await _usuario.update(request.payload);
    return reply.response({ id: credentials.id }).code(202);
  } catch (err) {
    logs.error(`Function (usuario.public.update): ${err}`);
    return reply.badImplementationCustom(err);
  }
};


module.exports = {
  get,
  create,
  update
};
