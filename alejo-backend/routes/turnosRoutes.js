const express = require('express');
const { crearTurno, obtenerTurnos, actualizarTurno, eliminarTurno } = require('../controllers/turnosController');
const router = express.Router();

// Rutas de citas
router.get('/', obtenerTurnos);           // Obtener todas las citas
router.post('/', crearTurno);             // Crear una nueva cita
router.put('/:id', actualizarTurno);      // Actualizar una cita
router.delete('/:id', eliminarTurno);     // Eliminar una cita

module.exports = router;
