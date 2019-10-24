'use strict';

/* eslint no-console: ["error", { allow: ["log", "warn", "error"]}] */
const fs = require('fs');
const path = require('path');
const Server = require('./server');

const { getDataBase } = require('./utils/load');
const { filterManually, filterCoreDirectories } = require('./utils/filters-core');

console.log(`Running enviroment ${ process.env.NODE_ENV || 'dev' }`);

process.on('uncaughtException', (error) => {
  console.error(`uncaughtException ${error.message}`);
});

process.on('unhandledRejection', (reason) => {
  console.error(`unhandledRejection ${reason}`);
});

const start = async () => {
  try {
    const server = await Server.init();
    
    await corePlugins(server);
    await routePlugins(server);
    
    if (process.env.NODE_ENV === 'test') return server;
    
    await server.start();
    console.log(`Server running at: ${ server.info.uri }`);
  } catch (err) {
    console.log(`====> Error starting server: ${ err }`);
    throw err;
  }
};

const corePlugins = async (server) => {
  console.log('===> load core plugins');
  try {
    const dir = path.join(__dirname, './plugins');
    
    const plugins = fs.readdirSync(dir).filter(filterManually);

    const pluginsPromise = [];
    plugins.forEach(item => {
      const plugin = require(path.join(dir, item));
      pluginsPromise.push(server.register(plugin));
    });
    
    await server.register([
      { plugin: require('hapi-boom-decorators') },
      { plugin: require('./plugins/database'), options:  getDataBase() },
      { plugin: require('./plugins/auth') }
    ]);

    return await Promise.all(pluginsPromise);
  } catch (err) {
    console.log(`error load core plugins: ${err}`);
    throw err;
  }
};

const routePlugins = async (server) => {
  console.log('===> load plugins routes');
  try {
    const dir = path.join(__dirname, '..');
    const routers = fs.readdirSync(dir).filter(filterCoreDirectories);

    const routersPromise = [];
    routers.forEach(item => {
      const plugin = require(path.join(dir, item));
      routersPromise.push(server.register(plugin));
    });

    return await Promise.all(routersPromise);
  } catch (err) {
    console.log(`error load plugins routes ${err}`);
    throw err;
  }
};

module.exports = { start };
