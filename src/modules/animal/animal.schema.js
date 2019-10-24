'use strict';

const Joi = require('joi');

const schema = {
  id: Joi.number().integer().min(0),  
  nome: Joi.string().trim(),    
  foto: Joi.string().allow('').trim(),
  idade: Joi.string().trim(),
  informacoes_adicionais: Joi.string().trim(),
  cidade: Joi.string().trim(),
  estado: Joi.string().trim(),  
  data_desaparecimento: Joi.date().iso(),
  dono: Joi.number().integer().min(0),
  encontrei_nome: Joi.string().trim(),  
  // eslint-disable-next-line no-useless-escape
  encontrei_telefone: Joi.string().trim().regex(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/),  
  data_cadastro: Joi.date().iso(),
  data_atualizacao: Joi.date().iso()
};


const getSchema = () => ( schema );

const getAttributes = ['id', 'nome', 'foto', 'idade', 'informacoes_adicionais', 'cidade', 'estado', 'data_desaparecimento', 'data_cadastro', 'data_atualizacao'];
module.exports = {
  getSchema,
  getAttributes
};
