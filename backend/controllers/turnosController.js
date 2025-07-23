const Turno = require('../model/Turno');
const Paciente = require('../model/Paciente');
const Doctor = require('../model/Doctor');

// Crear una nueva cita
exports.crearTurno = async (req, res) => {
  const { fecha, horario, medicoId, medicoNombre, medicoTipo, pacienteId, pacienteNombre, estado } = req.body;

  try {
    const nuevoTurno = await Turno.create({ fecha, horario, medicoId, medicoNombre, medicoTipo, pacienteId, pacienteNombre, estado });
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la turno' });
  }
};


// Obtener todos los turnos (sin información de paciente y médico)
exports.obtenerTurnos = async (req, res) => {
  try {
    // Obtenemos todos los turnos de la base de datos sin incluir los modelos relacionados
    const turnos = await Turno.findAll();

    // Enviamos la respuesta con los turnos obtenidos
    res.status(200).json(turnos);
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    res.status(500).json({ error: 'Error al obtener turnos' });
  }
};


// Actualizar una cita
exports.actualizarTurno = async (req, res) => {
  const { id } = req.params;
  const { fecha, horario, medicoId, medicoNombre, medicoTipo, pacienteId, pacienteNombre, estado } = req.body;

  try {
    const turno = await Turno.findByPk(id);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });

    turno.fecha = fecha || turno.fecha;
    turno.horario = horario || turno.horario;
    turno.medicoId = medicoId || turno.medicoId;
    turno.medicoNombre = medicoNombre || turno.medicoNombre;
    turno.medicoTipo = medicoTipo || turno.medicoTipo;
    turno.pacienteId = pacienteId || turno.pacienteId;
    turno.pacienteNombre = pacienteNombre || turno.pacienteNombre;
    turno.estado = estado || turno.estado;

    await turno.save();
    res.status(200).json(turno);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la turno' });
  }
};

// Eliminar una cita
exports.eliminarTurno = async (req, res) => {
  const { id } = req.params;

  try {
    const turno = await Turno.findByPk(id);
    if (!turno) return res.status(404).json({ error: 'turno no encontrada' });

    await turno.destroy();
    res.status(200).json({ mensaje: 'turno eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la turno' });
  }
};
