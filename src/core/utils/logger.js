'use strict';

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' })    
  ]
});
if (process.env === 'development') {
  logger.add(winston.transports.Console, { level: 'debug' });
}

module.exports = logger;
