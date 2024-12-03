const express = require('express');
const { registrarUsuario, iniciarSesion, obtenerUsuarios, eliminarUsuario, obtenerUsuarioPorId } = require('../controllers/usuariosController');
const router = express.Router();

// Rutas de usuarios
router.post('/register', registrarUsuario); // Registrar un nuevo usuario
router.post('/login', iniciarSesion);       // Inicio de sesión
router.get('/', obtenerUsuarios);          // Obtener todos los usuarios (opcional, requiere rol admin)
router.delete('/:id', eliminarUsuario);    // Eliminar un usuario (opcional, requiere rol admin)
router.get('/:id', obtenerUsuarioPorId);    // Eliminar un usuario (opcional, requiere rol admin)

module.exports = router;
