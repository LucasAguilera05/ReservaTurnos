const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordConfirm: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: 'Paciente', // administrador, doctor, paciente
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  peso: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  altura: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  historial: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'usuarios', // Asegura el nombre exacto de la tabla
  timestamps: false,     // Desactiva las columnas createdAt y updatedAt
});

module.exports = Usuario;
