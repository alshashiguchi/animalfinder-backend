'use strict';

const jwt = require('jsonwebtoken');
const { getKeyAuth } = require('../../core/utils/load');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const bluebird = require('bluebird');

const maxWrongAttemptsByIPperMinute = 5;
const maxWrongAttemptsByIPperDay = 100;
let limiterFastBruteByIP;
let limiterSlowBruteByIP;

const configLimiterFastBruteByIP = (request) => {

  if (limiterFastBruteByIP) {
    return limiterFastBruteByIP;
  }
    
  return new RateLimiterRedis({
    redis: request.redis,
    keyPrefix: 'login_fail_ip_per_minute',
    points: maxWrongAttemptsByIPperMinute,
    duration: 30,
    blockDuration: 60 * 10, 
  });  
};

const configLimiterSlowBruteByIP = (request) => {

  if (limiterSlowBruteByIP) {
    return limiterSlowBruteByIP;
  }
  
  return new RateLimiterRedis({
    redis: request.redis,
    keyPrefix: 'login_fail_ip_per_day',
    points: maxWrongAttemptsByIPperDay,
    duration: 60 * 60 * 24,
    blockDuration: 60 * 60 * 24,
  });  
};

const logConsume = ip => {
  bluebird.promisifyAll(limiterFastBruteByIP.consume(ip));
  bluebird.promisifyAll(limiterSlowBruteByIP.consume(ip));
};

const generateToken = (usuario, expiresIn) => ({
  access_token: jwt.sign({
    id: usuario.id,
    email: usuario.email,
    scope: usuario.acesso
  }, getKeyAuth().key, { expiresIn }),
  email: usuario.email
});

const setRedis = (client, key, value, expiresIn) => {
  client.set(key, value);  
  client.expire(key, (60 * 60) * expiresIn);
};

const auth = async (request, reply) => {

  const ipAddr = request.info.remoteAddress;

  limiterFastBruteByIP = configLimiterFastBruteByIP(request);
  limiterSlowBruteByIP = configLimiterSlowBruteByIP(request);

  // const resFastByIP =  await bluebird.promisifyAll(limiterFastBruteByIP.get(ipAddr),);
  // const resSlowByIP =  await bluebird.promisifyAll(limiterSlowBruteByIP.get(ipAddr));

  const [resFastByIP, resSlowByIP] = await Promise.all([
    limiterFastBruteByIP.get(ipAddr),
    limiterSlowBruteByIP.get(ipAddr),
  ]);

  let retrySecs = 0;
  
  if (resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
    retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
  } else if (resFastByIP !== null && resFastByIP.consumedPoints > maxWrongAttemptsByIPperMinute) {    
    retrySecs = Math.round(resFastByIP.msBeforeNext / 1000) || 1;
  }

  if (retrySecs > 0) {    
    return reply.tooManyRequests(`you have exceeded your request limit. Retry-After: ${retrySecs}`);      
  } else {
    const payload = request.payload;

    const { Usuarios } = request.database;
    const _usuario = await Usuarios.findOne({ where: {email: payload.email} });
    
    if (!_usuario) {
      
      await logConsume(ipAddr);
      
      return reply.unauthorized();
    }

    if (!_usuario.checarSenha(payload.senha)) {
      
      await logConsume(ipAddr);

      return reply.unauthorized();
    };
  
    const auth = generateToken(_usuario, '1H');
    
    setRedis(request.redis, auth.access_token, _usuario.id, 60);
    
    return auth;
  }   
};

module.exports = {
  auth
};
