const express = require('express');
const { obtenerDoctores, crearDoctor, actualizarDoctor, eliminarDoctor } = require('../controllers/doctoresController');
const router = express.Router();

// Rutas de doctores
router.get('/', obtenerDoctores);
router.post('/', crearDoctor);
router.put('/:id', actualizarDoctor);
router.delete('/:id', eliminarDoctor);

module.exports = router;
