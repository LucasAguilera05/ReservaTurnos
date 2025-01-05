const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Admin = sequelize.define('Admin', {
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

module.exports = Admin;
