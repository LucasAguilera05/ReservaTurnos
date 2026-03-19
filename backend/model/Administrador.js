const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Administrador = sequelize.define('Administrador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'administradores',
  timestamps: false,
});

module.exports = Administrador;
