'use strict';

const Lab = require('lab');
const Code = require('code');
const bootstrap = require('../core/bootstrap');

const lab = exports.lab = Lab.script();

global.expect = Code.expect;

global.it = lab.it;
global.before = lab.before;
global.beforeEach = lab.beforeEach;
global.after = lab.after;
global.describe = lab.describe;

global.describe('===> load the bootstrap', () => {
  global.before(async () => {
    const server = await bootstrap.start();
    global.server = server;
  });

  global.it('===> load server finalized', () => {
    global.expect(global.server).to.exists();
  });
});

