'use strict';

const logs = require('../../../core/utils/logger');

const { ANIMAL_NAO_LOCALIZADO } = require('../../../core/utils/mensageExceptions');
const { getAWS } = require('../../../core/utils/load');

const configAWS = getAWS();

const list = async (request, reply) => {
  try {
    const { Animais } = request.database;
    const _lista = await Animais.findAndCountAll(
      {
        offset: request.offset(),
        limit: request.limit(),        
      }
    );
    return _lista;
  } catch(err) {
    logs.error(`Function (animal.public.list): ${err}`);
    return reply.badImplementationCustom(err);
  }
};


const get = async (request, reply) => {
  try{
    const { Animais } = request.database;    
    const _animalId = request.params.id;
    
    const _animal = await Animais.findByPk(_animalId);
    
    if (!_animal) return reply.badRequest(ANIMAL_NAO_LOCALIZADO);
  
    return _animal;
  } catch(err) {
    logs.error(`Function (animal.public.get): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

const update = async (request, reply) => {
  try {
    const { Animais } = request.database;
    const _credentials = request.auth.credentials;
    const _animalId = request.params.id;

    const _animal = await Animais.scope({ method: ['dono', _credentials.id] }).findByPk(_animalId);
  
    if (!_animal) return reply.badRequest(ANIMAL_NAO_LOCALIZADO);
  
    await _animal.update(request.payload);
    return reply.response(_animal).code(202);
  } catch(err) {
    logs.error(`Function (animal.public.update): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

const destroy = async (request, reply) => {
  try {
    const { Animais } = request.database;
    const _credentials = request.auth.credentials;
    const _animal = await Animais.scope({ method: ['dono', _credentials.id] }).findByPk(request.params.id);
  
    if (!_animal) return reply.badRequest(ANIMAL_NAO_LOCALIZADO);

    if(_animal.foto) {
      if (configAWS.useAWS) {
        await request.removeFileAws(_animal.foto);
      } else {
        await request.removeFile(_animal.foto);
      }      
    } 
  
    await _animal.destroy(request.payload);
  
    return reply.response(_animal).code(200);
  } catch(err) {
    logs.error(`Function (animal.public.destroy): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

const create = async (request, reply) => {
  try {

    const { Animais } = request.database;
    const _credentials = request.auth.credentials;

    const _payload = request.payload;

    _payload.dono = _credentials.id;

    if (!_payload.data_desaparecimento) {
      _payload.data_desaparecimento = new Date();
    }

    const result = await Animais.create(request.payload);
    return reply.response(result).code(201);
  } catch (err) {
    logs.error(`Function (animal.public.create): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

const uploadImagem = async (request, reply) => {
  try {
    
    const { Animais } = request.database;
    const _animalId = request.params.id;
    const _credentials = request.auth.credentials;

    const _animal = await Animais.scope({ method: ['dono', _credentials.id] }).findByPk(_animalId);

    if (!_animal) {
      return reply.notFound(ANIMAL_NAO_LOCALIZADO);
    }

    const _payload = request.payload;    
    
    const _imagem = _payload.image;
    delete(_payload.image);

    if (!_imagem) {
      return reply.notFound('Foto não existe!');
    }

    if (!request.imageFilter(_imagem)) {
      return reply.unsupportedMediaType('Extensão do arquivo não é permitida!');
    }
    console.log(configAWS.useAWS);
    if (configAWS.useAWS) {
      const file = await request.uploadFileAws(_imagem);

      if (!file) return reply.badRequest('Erro ao salvar a foto');       
      
      _payload.foto = file.url;
    } else {
      const file = await request.uploadFile(_imagem);

      if (!file) return reply.badRequest('Erro ao salvar a foto');       

      _payload.foto = `${file.destination}/${file.filename}`;
    }      
   
    await _animal.update(request.payload);

    if(_animal.foto) {
      if (configAWS.useAWS) {
        await request.removeFileAws(_animal.foto); 
      } else {
        await request.removeFile(_animal.foto);
      }      
    } 
    
    return reply.response(_animal).code(202);
  } catch (err) {
    logs.error(`Function (animail.public.uploadImagem): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

const encontrei = async (request, reply) => {
  try {
    const { Animais } = request.database;    
    const _animalId = request.params.id;

    const _animal = await Animais.findByPk(_animalId);
  
    if (!_animal) return reply.badRequest(ANIMAL_NAO_LOCALIZADO);
  
    await _animal.update(request.payload);
    return reply.response(_animal).code(202);
  } catch(err) {
    logs.error(`Function (animal.public.encontrei): ${err}`);
    return reply.badImplementationCustom(err);
  }
};

module.exports = {
  list,
  get,
  update,
  destroy,
  create,
  uploadImagem,
  encontrei
};
