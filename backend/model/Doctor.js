const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Doctor = sequelize.define('Doctor', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Doctor;
