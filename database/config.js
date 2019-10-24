'use strict';

const dotenv = require('dotenv');
dotenv.config({ silent: true });

module.exports = {
  development: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || '',
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DATABASE_SSL ? process.env.DATABASE_SSL === 'true' : false
    }
  },
  test: {
    host: process.env.POSTGRES_PORT_5432_TCP_PORT || process.env.DATABASE_HOST || 'localhost',
    port: process.env.POSTGRES_PORT_5432_TCP_ADDR || process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.BD_NAME_TEST || '',
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DATABASE_SSL ? process.env.DATABASE_SSL === 'true' : false
    }
  },
  production: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || '',
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DATABASE_SSL ? process.env.DATABASE_SSL === 'true' : false
    }
  }
};
