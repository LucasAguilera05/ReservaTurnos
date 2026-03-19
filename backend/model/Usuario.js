const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
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
    defaultValue: 'Paciente', // administrador, medico, paciente
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'pacientes',
      key: 'id'
    }
  },
  medicoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'medicos',
      key: 'id'
    }
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'administradores',
      key: 'id'
    }
  }
}, {
  tableName: 'usuarios', // Asegura el nombre exacto de la tabla
  timestamps: false,     // Desactiva las columnas createdAt y updatedAt
});

module.exports = Usuario;
