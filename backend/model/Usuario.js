const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: 'paciente', // admin, doctor, paciente
  },
});

module.exports = Usuario;
