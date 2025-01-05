const express = require('express');
const { obtenerDoctores, crearDoctor, actualizarDoctor, eliminarDoctor } = require('../controllers/AdminController}');
const { obtenerAdmin, obtenerPacientes, crearAdmin, crearPaciente, actualizarAdmin, actualizarPaciente, eliminarAdminisitrador, eliminarPaciente } = require('../controllers/AdminController');
const router = express.Router();

// Rutas de doctores
router.get('/', obtenerDoctores, obtenerAdmin, obtenerPacientes);
router.post('/', crearDoctor, crearAdmin, crearPaciente);
router.put('/:id', actualizarDoctor, actualizarAdmin, actualizarPaciente);
router.delete('/:id', eliminarDoctor, eliminarAdminisitrador, eliminarPaciente);

module.exports = router;
