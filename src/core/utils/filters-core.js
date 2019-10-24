'use strict';

const plugins = ['auth.js', 'database.js'];

const filterManually = (fileName) => (!plugins.some(v => fileName === v));
const filterCoreDirectories = dirName => ( dirName === 'modules' );

module.exports = {
  filterManually,
  filterCoreDirectories
};
