'use strict';

const Joi = require('joi');
const Schema = require('../animal.schema');

const schema = Schema.getSchema();

const update = () => ({
  params: Joi.object({
    id: schema.id.required()
  }),
  payload: Joi.object({
    nome: schema.nome.optional(),
    idade: schema.idade.optional(),    
    informacoes_adicionais: schema.informacoes_adicionais.optional(),
    foto: schema.foto.optional(),
    cidade: schema.cidade.optional(),
    estado: schema.estado.optional()
  }).label('AtualizacaoAnimal')
});

const encontrei = () => ({
  params: Joi.object({
    id: schema.id.required()
  }),
  payload: Joi.object({
    encontrei_nome: schema.encontrei_nome.required(),
    encontrei_telefone: schema.encontrei_telefone.required(),    
    
  }).label('EncontreiAnimal')
});

const get = () => ({
  params: Joi.object({
    id: schema.id.required()
  }).label('GetAnimal')
});

const destroy = () => ({
  params: Joi.object({
    id: schema.id.required()
  }).label('DeletaAnimal')
});

const create = () => ({
  payload: Joi.object({  
    nome: schema.nome.required(),    
    idade: schema.idade.required(),    
    data_desaparecimento: schema.data_desaparecimento.optional(),
    informacoes_adicionais: schema.informacoes_adicionais.optional(),
    cidade: schema.cidade.required(),
    estado: schema.estado.required()
  }).label('CadastroAnimal')  
});

module.exports = {
  get,
  update,
  destroy,
  create,
  encontrei
};
