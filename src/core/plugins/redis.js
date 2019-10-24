'use strict';

const redis = require('redis');
const bluebird = require('bluebird');
const { getRedisConfig } = require('../utils/load');

const config = getRedisConfig();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/* eslint no-console: ["error", { allow: ["log", "warn", "error"]}] */

module.exports = {
  register: async (server, options) => {      
        
    const client = redis.createClient(config.heroku !== '' ? config.heroku : config.port, config.host);    
    
    client.on('error', function(err) {
      console.log('Redis-Error:', err);
    });
    
    client.on('connect', function(){
      console.log('Redis connect');
    });

    return server.decorate('request', 'redis', client);
  },
  name: 'hapi-cache',
  version: '1.0.0'
};