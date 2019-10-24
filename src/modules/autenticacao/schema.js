'use strict';

const Joi = require('joi');

const Schema = {
  email: Joi.string().email().trim(),
  senha: Joi.string().min(5).max(255).trim()
};

const getSchema = () => ( Schema );

module.exports = {
  getSchema
};
