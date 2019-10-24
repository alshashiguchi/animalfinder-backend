'use strict';

module.exports = {
  async getToken (server) {
    const data = await server.inject({
      method: 'POST',
      url: '/v1/auth',
      payload: {
        email: 'teste2@teste.com.br',
        senha: 'abc123'
      }
    });
    
    return data.result.access_token;          
  }  
};
