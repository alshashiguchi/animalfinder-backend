'use strict';

const dotenv = require('dotenv');

dotenv.config({ silent: true });

const env = process.env.NODE_ENV || 'development';  

const getServer = () => ({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 3000
});

const getDataBase = () => ({
  host: process.env.POSTGRES_PORT_5432_TCP_PORT || process.env.DATABASE_HOST || 'localhost',
  port: process.env.POSTGRES_PORT_5432_TCP_ADDR || process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  database: (env === 'test') ? process.env.BD_NAME_TEST :process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL ? process.env.DATABASE_SSL === 'true' : false
});

const getKeyAuth = () => ({
  key: process.env.KEYAUTH || 'boson-de-higgs'
});

const getRedisConfig = () => ({
  host: process.env.REDIS_HOST || '',
  port: process.env.REDIS_PORT || '',
  heroku: process.env.REDIS_URL || ''
});


const getELK = () => ({
  host: process.env.ELK_HOST || process.env.ELK_HOST,
  enabled: process.env.ELK_ENABLED  ? (process.env.ELK_ENABLED === 'true'): false
});

const getAWS = () => ({
  app_id: process.env.AWS_ID || '',
  app_key: process.env.AWS_KEY || '',
  useAWS: (process.env.AWS_ID && process.env.AWS_KEY) || false
});

module.exports = {
  getServer,
  getDataBase,
  getKeyAuth,
  getRedisConfig,
  getELK,
  getAWS
};
