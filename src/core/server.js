'use strict';

const Hapi = require('@hapi/hapi');
const { getServer } = require('./utils/load');

const init = () => {
  const config = getServer();
  return new Hapi.Server({
    port: config.port,
    host: config.host,
    routes: {
      cors: {
        origin: ['*'],          
        headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Allow-Origin']
      }
    }
  });
};

module.exports = { init };
