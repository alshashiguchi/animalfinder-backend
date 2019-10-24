'use strict';

module.exports = {
  register: async (server, options) => {
    const limitDefault = options.limit || 15;

    const limit = function () {
      return this.query.limit || limitDefault ;
    };

    const offset = function () {
      const page = this.query.page || 1;
      if (page) {
        return limit.call(this) * (page - 1);
      }

      return 0;
    };

    await server.decorate('request', 'limit', limit);
    return server.decorate('request', 'offset', offset);
  },
  name: 'hapi-paginate',
  version: '1.0.0'
};