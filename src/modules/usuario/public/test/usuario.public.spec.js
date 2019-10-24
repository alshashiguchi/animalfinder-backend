/* global describe, before, it, expect, server*/ 

const factory = require('../../../../test/factory.usuario.spec');

describe('Usuário', () => {

  let token = null;
  let id_usuario = 0;

  before(async () => {
    token = await factory.getToken(server);    
  });

  describe('Criação e alteração de usuários', () => {
    it('Deve cadastrar um usuário', async() => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/usuario',        
        payload: {
          nome: "utilizando_teste",
          email: "utilizando_teste@teste.com.br",
          telefone: "(14) 3234-5678",          
          senha: "abc123"
        }      
      });

      id_usuario = response.result.id;
      
      expect(response.statusCode).to.equals(201);
      expect(response.result.id).to.equals(id_usuario);
      
    });

    it('Deve atualizar um usuário', async() => {
      const nome = `teste_${id_usuario}`;
      const response = await server.inject({
        method: 'PUT',
        url: '/v1/usuario',     
        headers: { 'Authorization': `Bearer ${token}` },   
        payload: {
          nome: nome,          
        }      
      });

      expect(response.statusCode).to.equals(202);
      expect(response.result.id).to.equals('1');
      
    });
  });

  describe('Consulta de usuários', () => {
    it('Deve retornar um usuário pelo identificador', async() => {      
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();
      expect(response.result.id).to.exist("1");
    });

    it('Não deve retornar um usuário sem token valido', async() => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario',
        headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDAwMDAiLCJlbWFpbCI6InRlc3RlMkB0ZXN0ZS5jb20uYnIiLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNTM3NDU1ODU3LCJleHAiOjE1Mzc0NTk0NTd9.ijmh1s_DJPExGp66N3ScT71SxOTgxI4Xm5bmfHw20Gs` }
      });

      expect(response.statusCode).to.equals(401);      
    });
  });
});
