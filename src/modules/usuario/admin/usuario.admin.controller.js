'use strict';

const logs = require('../../../core/utils/logger');
const { getAttributes: attributesUsuario } = require('../usuario.schema');

const list = async (request, reply) => {     
  try {
    const { Usuarios } = request.database;  
  
    const options = {
      attributes: attributesUsuario
    };
  
    return Usuarios.findAndCountAll(options);
  } catch (err) {
    logs.error(`Function (usuario.public.list): ${err}`);
    return reply.badImplementationCustom(err);
  }   
};


const get = async (request, reply) => {         
  try {
    const { Usuarios } = request.database;

    const options = {
      attributes: attributesUsuario,
      where:{
        id: request.params.id
      }
    };
  
    const _usuario = await Usuarios.findOne(options);
  
    if (!_usuario) return reply.badRequest('Usuário não localizado');
  
    return _usuario;
  } catch (err) {
    logs.error(`Function (usuario.public.get): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

const create = async (request, reply) => {
  try {
    const result = await request.database.Usuarios.create(request.payload);
    return reply.response({ id: result.id}).code(201);
  } catch (err) {
    logs.error(`Function (usuario.public.create): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

const update = async (request, reply) => {
  try {
    const { Usuarios } = request.database;
    const _usuario = await Usuarios.findByPk(request.params.id);
  
    if (!_usuario) return reply.badRequest('Usuário não localizado');
  
    await _usuario.update(request.payload);
    return reply.response({ id: request.params.id}).code(202);
  } catch (err) {
    logs.error(`Function (usuario.public.update): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

const destroy = async (request, reply) => {
  try{
    const { Usuarios } = request.database;
    const _usuario = await Usuarios.findByPk(request.params.id);
  
    if (!_usuario) return reply.badRequest('Usuário não localizado');
  
    await _usuario.destroy(request.payload);
  
    return reply.response({ id: request.params.id}).code(200);
  } catch(err) {
    logs.error(`Function (usuario.public.destroy): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

module.exports = {
  list,
  get,
  create,
  update,
  destroy
};
