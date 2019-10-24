/* global describe, before, it, expect, server*/ 

const factory = require('../../../../test/factory.usuario.spec');

describe('Usuário admin', () => {

  let token = null;
  let idUser = 0

  before(async () => {
    token = await factory.getToken(server);    
  });

  describe('Gerenciamento de usuarios utilizando permissão administrativa', () => {
    it('Deve cadastrar um novo usuário', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/usuario/admin',
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: "admin_teste",
          email: "admin_teste@admin.com.br",
          telefone: "(14) 3234-5678", 
          acesso: 'admin',
          senha: "abc123"
        }
      });
  
      idUser = response.result.id
      
      expect(response.statusCode).to.equals(201);
      expect(response.result).to.exist();
      expect(response.result.id).to.exist(idUser);
    });
  
    it('Deve alterar um usuário', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/v1/usuario/admin/${idUser}`,
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: "teste100"        
        }
      });
  
      expect(response.statusCode).to.equals(202);
      expect(response.result).to.exist();
    });
  
    it('Não deve alterar um usuário que não existe', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/v1/usuario/admin/${idUser + 1000}`,
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: "teste100"        
        }
      });
  
      expect(response.statusCode).to.equals(400);    
    });
  
    it('Deve excluir um usuário', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/v1/usuario/admin/${idUser}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();
    });
  
    it('Não deve excluir um usuário que não existe', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/v1/usuario/admin/${idUser + 1000}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      expect(response.statusCode).to.equals(400);    
    });
  });

  describe('Visualização dos usuários utilizando a permissão adminsitrativa', () => {
    it('Deve retornar uma listagem administrativa de usuário', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario/admin',
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();
      expect(response.result.rows).to.exist();
    });
  
  
    it('Deve retornar um usuário pelo identificador rota administrativa', async() => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario/admin/1',
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();
      expect(response.result.id).to.exist("1");
    });
  
    it('Não deve retornar um usuário pelo identificador rota administrativa', async() => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario/admin/1000000',
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      expect(response.statusCode).to.equals(400);    
    });
  });

  
});