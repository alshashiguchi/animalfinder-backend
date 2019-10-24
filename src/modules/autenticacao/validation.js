'use strict';

const Joi = require('joi');
const { getSchema } = require('./schema');

const schema = getSchema();

const auth = () => ({
  payload: Joi.object({
    email: schema.email.required(),
    senha: schema.senha.required(),
  }).label('Autenticacao')
});

module.exports = {
  auth
};
