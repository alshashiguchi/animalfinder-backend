'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const AWS = require('aws-sdk');
const fs = require('fs');
const Promise = require('bluebird');
const uuid = require('uuid');
const path = require('path');
const imagePick = require('imagemagick');
const { getAWS } = require('../utils/load');

const configAWS = getAWS();

const bucket = 'animalfinder-imagem';

module.exports = {
  register: async (server) => {
    const uploadFile = function (file) {

      if (!file) throw new Error('Não há arquivos');
  
      const originalName = file.hapi.filename;      
      const extension = originalName.substring(originalName.indexOf('.'));
      const filename = uuid.v1().concat(extension);
      const upload = path.join(process.env.PWD, 'uploads', 'img');
      const nameFull = `${upload}/${filename}`;
      
      const fileStream = fs.createWriteStream(nameFull);      
            
      return new Promise((resolve, reject) => {
        file.on('error', function (err) {
          return reject(err);
        });
  
        file.pipe(fileStream);
          
        file.on('end', function (err) {
          if (err) {
            return reject(err);
          }
          if (!fs.existsSync(upload)) { fs.mkdirSync(upload); };
          
          const fileDetails = {
            fieldname: file.hapi.name,
            originalname: originalName,
            filename,
            mimetype: file.hapi.headers['content-type'],
            destination: `${upload}`,         
            size: fs.statSync(nameFull).size,
          };

          return resolve(fileDetails);          
        });
      });  
    };

    const uploadFileAws = function (file) {
      return new Promise((resolve, reject) => {
        imagePick.resize({
          srcData: file._data,
          quality: 0.8,
          format: 'jpg',
          progressive: false,
          width: 1280,
          height: 720,
          strip: true
        }, function (err, stdout, stderr) {
          if (err) {
            return reject(err);
          }
  
          // const base64Data = new Buffer(stdout, 'binary');
          const base64Data = Buffer.from(stdout, 'binary');
          const originalName = file.hapi.filename;
          const index = originalName.indexOf('.');
          const fileName = originalName.substring(0, index);
          const extension = originalName.substring(index);
          const name = fileName + '-' + uuid.v1() + extension;
  
          AWS.config.update({
            accessKeyId: configAWS.app_id,
            secretAccessKey: configAWS.app_key
          });
  
          const s3bucket = new AWS.S3({ params: { Bucket: bucket } });
          s3bucket.createBucket(function (err) {
            if (err) {
              return reject(err);
            }
  
            const params = {
              Key: name,
              Body: base64Data,
              ACL:'public-read'
            };
  
            s3bucket.upload(params, (err, data) => {
              if (err) {                
                return reject(err);
              }
  
              return resolve({
                url: decodeURIComponent(data.Location),
                filename: name
              });
            });
  
          });
        });
      });
    };

    const removeFileAws = function(file){  
      AWS.config.update({
        accessKeyId: configAWS.app_id,
        secretAccessKey: configAWS.app_key
      });    

      const url = file;  
      const regexp = /(https:\/\/nw-imagens.s3.amazonaws.com\/)(.*)/g;
      let name = '';
      let match = regexp.exec(url);
      while (match != null) {        
        name = match[2]; 
        match = regexp.exec(url);     
      }

      if (name) {
        const s3bucket = new AWS.S3();
        var params = {  
          Bucket: bucket,        
          Key: name.trim()
        };
        
        s3bucket.deleteObject(params, function(err, data) {
          if (err) console.error(err, err.stack);          
        });
      }

    };

    const removeFile = function(file) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    };

    const imageFilter = function (file) {
      const fileName = file.hapi.filename;
      if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
        return false;
      }

      return true;
    }

    await server.decorate('request', 'imageFilter', imageFilter);
    await server.decorate('request', 'removeFileAws', removeFileAws);
    await server.decorate('request', 'removeFile', removeFile);
    await server.decorate('request', 'uploadFileAws', uploadFileAws);
    return server.decorate('request', 'uploadFile', uploadFile); 
  },
  name: 'hapi-file',
  version: '1.0.0'
};
