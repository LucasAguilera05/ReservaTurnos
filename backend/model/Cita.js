const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Cita = sequelize.define('Cita', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idDoctor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idPaciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'citas', // Nombre explícito de la tabla
  timestamps: true, // Si necesitas `createdAt` y `updatedAt`
});

module.exports = Cita;
