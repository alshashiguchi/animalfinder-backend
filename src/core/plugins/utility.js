'use strict';

module.exports = {
  register: async (server) => {
    const loadRoutes = async (routes) => {
      const registerRoutes = routes.map(item => ({
        plugin: require(item),
        routes: {
          prefix: '/v1'
        }
      }));
      
      return server.register(registerRoutes);
    };
    
    await server.method('loadRoutes', loadRoutes);
  },
  name: 'utility',
  version: '1.0.0'
};
