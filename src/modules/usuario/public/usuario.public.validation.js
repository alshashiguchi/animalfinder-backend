'use strict';

const Joi = require('joi');
const Schema = require('../usuario.schema');

const schema = Schema.getSchema();

const create = () => ({
  payload: Joi.object({
    nome: schema.nome.optional(),    
    email: schema.email.required(),
    telefone: schema.telefone.required(),
    senha: schema.senha.required()
  }).label('CadastroUsuario')
});


const update = () => ({  
  payload: Joi.object({
    nome: schema.nome.optional(),
    telefone: schema.telefone.optional(),
    senha: schema.senha.optional()
  }).label('AtualizacaoUsuario')
});

const get = () => ({
  
});

module.exports = {
  get,
  create,
  update
};
