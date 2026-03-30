const express = require('express');
const { registrarUsuario, iniciarSesion, obtenerUsuarios, eliminarUsuario, obtenerUsuarioPorId, actualizarUsuario } = require('../controllers/usuariosController');
const router = express.Router();

// Rutas de usuarios
router.post('/register', registrarUsuario); // Registrar un nuevo usuario
router.post('/login', iniciarSesion);       // Inicio de sesión
router.get('/', obtenerUsuarios);          // Obtener todos los usuarios (opcional, requiere rol admin)
router.delete('/:id', eliminarUsuario);    // Eliminar un usuario (opcional, requiere rol admin)
router.get('/:id', obtenerUsuarioPorId);    // Obtener un usuario
router.put('/:id', actualizarUsuario);      // Actualizar un usuario

module.exports = router;
