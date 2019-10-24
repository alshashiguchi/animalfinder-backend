/* global describe, before, it, expect, server*/ 

const factory = require('../../../../test/factory.usuario.spec');

describe('Usuário admin', () => {

  let token = null;
  let idAnimal = 0;
  let idAnimalVisualizacao = 0;

  before(async () => {
    token = await factory.getToken(server);    
  });

  describe('Gerenciamento do animal', () => {
    it('Deve cadastrar um novo animal', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/animal',
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: "frida",          
          idade: "2 meses",
          data_desaparecimento: "2019-10-17",
          informacoes_adicionais: "ola",
          cidade: "marilia",
          estado: "sp"
        }
      });

      idAnimal = response.result.id;

      expect(response.statusCode).to.equals(201);
      expect(response.result).to.exist();
      expect(response.result.nome).to.exist('frida');
    });    

    it('Deve cadastrar um novo animal sem data de desaparecimento', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/animal',
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: "frida",          
          idade: "2 meses",          
          informacoes_adicionais: "ola",
          cidade: "marilia",
          estado: "sp"
        }
      });

      idAnimalVisualizacao = response.result.id;

      expect(response.statusCode).to.equals(201);
      expect(response.result).to.exist();
      expect(response.result.nome).to.exist('frida');
    });    

    it('Deve alterar um animal pelo id', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/v1/animal/${idAnimal}`,
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: "chance"        
        }
      });

      expect(response.statusCode).to.equals(202);
      expect(response.result).to.exist();
    }); 
    
    it('Não deve alterar um animal que não existe', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/v1/animal/${idAnimal + 1000}`,
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: "teste100"        
        }
      });

      expect(response.statusCode).to.equals(400);    
    });


    it('Deve alterar um animal pelo id quando encontrado', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/v1/animal/${idAnimal}/encontrei`,
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          encontrei_nome: "encontrei",
          encontrei_telefone: "(14)99123-4567"                
        }
      });
     

      expect(response.statusCode).to.equals(202);
      expect(response.result).to.exist();
    });     


    it('Deve excluir um animal', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/v1/animal/${idAnimal}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();
    });

    it('Não deve excluir um animal que não existe', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/v1/animal/${idAnimal + 1000}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(response.statusCode).to.equals(400);    
    });
  });

  describe('Visualização de animais', () => {
    it('Deve retornar uma listagem de animais', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/animal',
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();
      expect(response.result.rows).to.exist();
    });


    it('Deve retornar um animal pelo identificador', async() => {
      const response = await server.inject({
        method: 'GET',
        url: `/v1/animal/${idAnimalVisualizacao}`,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();
      expect(response.result.id).to.exist(idAnimalVisualizacao);
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