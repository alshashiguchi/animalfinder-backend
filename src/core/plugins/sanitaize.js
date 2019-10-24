'use strict';
module.exports = {
  register: async (server) => {
    
    await server.register([{
      plugin: require('disinfect'),
      options: {
        disinfectQuery: true,
        disinfectParams: true,
        disinfectPayload: true
      }
    }

    ]);

  },
  name: 'sanitaize',
  version: '1.0.0'
};
