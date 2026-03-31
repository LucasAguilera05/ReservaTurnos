const Turno = require('../model/Turno');
const Paciente = require('../model/Paciente');
const Medico = require('../model/Medico');
const Usuario = require('../model/Usuario');
const emailService = require('../utils/emailService');

// Crear una nueva cita
exports.crearTurno = async (req, res) => {
  const { fecha, horario, medicoId, medicoNombre, medicoTipo, pacienteId, pacienteNombre, estado, diagnostico, tratamiento } = req.body;

  try {
    const nuevoTurno = await Turno.create({ fecha, horario, medicoId, medicoNombre, medicoTipo, pacienteId, pacienteNombre, estado, diagnostico, tratamiento });
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
  const { fecha, horario, medicoId, medicoNombre, medicoTipo, pacienteId, pacienteNombre, estado, diagnostico, tratamiento, canceladoPor } = req.body;

  try {
    const turno = await Turno.findByPk(id);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });

    const estadoAntiguo = turno.estado;
    const pacienteIdAntiguo = turno.pacienteId;
    const medicoIdAntiguo = turno.medicoId;

    turno.fecha = fecha || turno.fecha;
    turno.horario = horario || turno.horario;
    turno.medicoId = medicoId || turno.medicoId;
    turno.medicoNombre = medicoNombre || turno.medicoNombre;
    turno.medicoTipo = medicoTipo || turno.medicoTipo;
    turno.pacienteId = pacienteId !== undefined ? pacienteId : turno.pacienteId;
    turno.pacienteNombre = pacienteNombre !== undefined ? pacienteNombre : turno.pacienteNombre;
    turno.estado = estado || turno.estado;
    turno.diagnostico = diagnostico || turno.diagnostico;
    turno.tratamiento = tratamiento || turno.tratamiento;

    await turno.save();

    // Notificaciones por Email
    try {
      const huboCAmbioEstado = estadoAntiguo !== turno.estado;

      if (huboCAmbioEstado) {
        // 1. Paciente confirmó un turno → se notifica al paciente
        if (turno.estado === 'Confirmado' && turno.pacienteId && turno.pacienteId !== 'Ninguno') {
          const usuarioPaciente = await Usuario.findByPk(turno.pacienteId);
          if (usuarioPaciente?.email) {
            await emailService.enviarEmailTurnoSolicitado(usuarioPaciente.email, turno);
          }
        }

        // 2. Médico canceló el turno → se notifica al paciente
        if (turno.estado === 'Cancelado' && canceladoPor === 'medico' && pacienteIdAntiguo && pacienteIdAntiguo !== 'Ninguno') {
          const usuarioPaciente = await Usuario.findByPk(pacienteIdAntiguo);
          if (usuarioPaciente?.email) {
            await emailService.enviarEmailCancelacionPorMedico(usuarioPaciente.email, turno);
          }
        }

        // 3. Paciente canceló el turno (estado vuelve a "Ninguno") → se notifica al médico
        if ((turno.estado === 'Ninguno' || turno.estado === 'Cancelado') && canceladoPor === 'paciente' && medicoIdAntiguo) {
          const usuarioMedico = await Usuario.findByPk(medicoIdAntiguo);
          if (usuarioMedico?.email) {
            await emailService.enviarEmailCancelacionPorPaciente(usuarioMedico.email, {
              ...turno.dataValues,
              pacienteNombre: turno.pacienteNombre || pacienteNombre
            });
          }
        }
      }
    } catch (emailError) {
      console.error('Error al intentar enviar la notificación por correo:', emailError);
      // No bloqueamos la respuesta exitosa del turno si falla el correo
    }

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
