'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuarios', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nome:  DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    acesso: {
      type: DataTypes.ENUM,
      values: ['admin', 'usuario'],
      allowNull: false,
      defaultValue: 'usuario'
    },
    senha: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        this.salt = bcrypt.genSaltSync(12);
        this.setDataValue('senha', val);
        this.setDataValue('senha_hash', this.criptografarSenha(val));
      }
    },
    senha_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: DataTypes.VIRTUAL
  }, {
    tableName: 'usuarios',
    freezeTableName: true,
    createdAt: 'data_cadastro',
    updatedAt: 'data_atualizacao',
    schema: 'public'
  });

  Usuario.prototype.checarSenha = function (senha) {    
    return bcrypt.compareSync(senha, this.senha_hash);
  };

  Usuario.prototype.criptografarSenha = function (senha) {    
    return bcrypt.hashSync(senha, this.salt);
  };

  return Usuario;
};
