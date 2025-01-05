const express = require('express');
const { crearCita, obtenerCitas, actualizarCita, eliminarCita } = require('../controllers/citasController');
const router = express.Router();

// Rutas de citas
router.get('/', obtenerCitas);           // Obtener todas las citas
router.post('/', crearCita);             // Crear una nueva cita
router.put('/:id', actualizarCita);      // Actualizar una cita
router.delete('/:id', eliminarCita);     // Eliminar una cita

module.exports = router;
