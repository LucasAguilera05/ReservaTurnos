const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Medico = sequelize.define('Medico', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dni: { type: DataTypes.STRING, allowNull: true },
  nombre: { type: DataTypes.STRING, allowNull: true },
  apellido: { type: DataTypes.STRING, allowNull: true },
  telefono: { type: DataTypes.STRING, allowNull: true },
  direccion: { type: DataTypes.STRING, allowNull: true },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'medicos',
  timestamps: false,
});

module.exports = Medico;
