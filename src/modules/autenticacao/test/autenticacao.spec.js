/* global describe, before, it, expect, server*/ 

describe('Autorizacao', () => {

  describe('Consulta', () => {
    it('Usuário com senha incorreta', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/auth',
        payload: {
          email: 'teste2@teste.com.br',
          senha: 'abc1231'
        }
      });
  
      expect(response.statusCode).to.equals(401);
      
    });

    it('Usuário com email incorreta', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/auth',
        payload: {
          email: 'teste2@teste.com.br1',
          senha: 'abc123'
        }
      });
      
      expect(response.statusCode).to.equals(401);
      
    });
	});  
});
