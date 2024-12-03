const express = require('express');
const { obtenerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente } = require('../controllers/pacientesController');
const router = express.Router();

// Rutas de pacientes
router.get('/', obtenerPacientes);
router.post('/', crearPaciente);
router.put('/:id', actualizarPaciente);
router.delete('/:id', eliminarPaciente);

module.exports = router;
