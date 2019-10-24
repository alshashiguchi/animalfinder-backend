'use strict';

module.exports = (sequelize, DataTypes) => {
  const Animais = sequelize.define('Animais', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    foto: {
      type: DataTypes.STRING(4096),
      allowNull: true
    },
    idade: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    informacoes_adicionais: {
      type: DataTypes.STRING(4096),
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: false
    },   
    encontrei_nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },      
    encontrei_telefone: {
      type: DataTypes.STRING(14),
      allowNull: true
    },    
    data_desaparecimento: {
      allowNull: false,
      type: DataTypes.DATE
    }, 
    dono: {
      type: DataTypes.BIGINT,
      field: 'dono_id',
      allowNull: false        
    }
  }, {
    tableName: 'animais',
    freezeTableName: true,
    createdAt: 'data_cadastro',
    updatedAt: 'data_atualizacao',
    schema: 'public',
    
    
    scopes: {
      dono: function (usuarioId) {        
        return {
          where: {
            dono: usuarioId
          }
        };
      }
    }
  });

  Animais.associate = function(models) {
    models.Usuarios.hasMany(models.Animais, { foreignKey: 'id', as: 'Animais' });
    models.Animais.belongsTo(models.Usuarios, { foreignKey: 'dono_id', as: 'Usuarios' });
  };

  return Animais;
};
