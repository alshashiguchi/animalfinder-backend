'use strict';

const Joi = require('joi');
const Schema = require('../usuario.schema');

const schema = Schema.getSchema();

const create = () => ({
  payload: Joi.object({
    nome: schema.nome.optional(),    
    email: schema.email.required(),
    telefone: schema.telefone.required(),
    acesso: schema.acesso.optional(),
    senha: schema.senha.required()
  }).label('CadastroUsuarioAdmin')
});

const update = () => ({
  params: Joi.object({
    id: schema.id.required()
  }),
  payload: Joi.object({
    nome: schema.nome.optional(),
    telefone: schema.telefone.optional(),
    senha: schema.senha.optional()
  }).label('AtualizacaoUsuarioAdmin')
});

const get = () => ({
  params: Joi.object({
    id: schema.id.required()
  }).label('GetUsuarioAdmin')
});

const destroy = () => ({
  params: Joi.object({
    id: schema.id.required()
  }).label('DeletaUsuarioAdmin')
});

module.exports = {
  get,
  create,
  update,
  destroy
};
