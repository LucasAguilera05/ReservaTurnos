const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Turno = sequelize.define('Turno', {
  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  medicoNombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  medicoTipo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pacienteNombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'turnos', // Nombre explícito de la tabla
  timestamps: false, // Si necesitas `createdAt` y `updatedAt`
});

module.exports = Turno;
