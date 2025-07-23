const express = require('express');
const cors = require('cors');
const sequelize = require('./config/dataBase');
require('dotenv').config();

// Importar rutas
const usuariosRoutes = require('./routes/usuariosRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');
const doctoresRoutes = require('./routes/doctoresRoutes');
const turnosRoutes = require('./routes/turnosRoutes');

// Inicializar la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/doctores', doctoresRoutes);
app.use('/api/turnos', turnosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Sistema funcionando correctamente');
});

// Conexión a la base de datos y levantamiento del servidor
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});
