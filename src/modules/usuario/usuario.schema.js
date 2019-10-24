'use strict';

const Joi = require('joi');

const schema = {
  id: Joi.number().integer().min(0),
  nome: Joi.string().trim(),
  email: Joi.string().email(),
  // eslint-disable-next-line no-useless-escape
  telefone: Joi.string().trim().regex(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/),
  senha: Joi.string().trim(),
  acesso: Joi.string().allow(['usurio', 'admin']),
  data_cadastro: Joi.date().iso(),
  data_atualizacao: Joi.date().iso()
};

const getSchema = () => ( schema );
const getAttributes = ['id', 'nome', 'email', 'telefone', 'data_cadastro', 'data_atualizacao'];

module.exports = {
  getSchema,
  getAttributes
};
