require('dotenv').config(); // Carga las variables de entorno desde .env

const { Sequelize } = require('sequelize');

// Configuración de Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
);

// Función para autenticar la conexión
async function authenticateDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

authenticateDatabase();

module.exports = sequelize;
