'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const getFiles = (type, level) => {
  const basePath = __dirname;

  return fs.readdirSync(basePath)
    .map(entity => {
      if (level) {
        const file = path.join(basePath, entity, level, entity.split('-') + '.' + level + '.' + type);

        if (!isFile(file)) {
          return;
        }

        return file;
      }

      const root = path.join(basePath, entity, type);

      if (!isFile(root)) {
        return;
      }

      return root;
    });
};

const isFile = (root) => {
  try {
    return fs.statSync(root).isFile();
  } catch (err) {
    return false;
  }
};

module.exports = {
  register: async (server) => {
    await server.methods.loadRoutes(_.compact(getFiles('routes.js', 'admin')));
    await server.methods.loadRoutes(_.compact(getFiles('routes.js', 'public')));    
    await server.methods.loadRoutes(_.compact(getFiles('routes.js')));    
  },
  name: 'modules',
  version: '1.0.0'
};
