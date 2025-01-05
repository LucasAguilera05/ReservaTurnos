const Cita = require('../model/cita');
const Paciente = require('../model/Paciente');
const Doctor = require('../model/Doctor');

// Crear una nueva cita
exports.crearCita = async (req, res) => {
  const { fecha, hora, motivo, pacienteId, doctorId } = req.body;

  try {
    const nuevaCita = await Cita.create({ fecha, hora, motivo, pacienteId, doctorId });
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};

// Obtener todas las citas
exports.obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Paciente, as: 'paciente', attributes: ['nombre', 'apellido'] },
        { model: Doctor, as: 'doctor', attributes: ['nombre', 'especialidad'] },
      ],
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};

// Actualizar una cita
exports.actualizarCita = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora, motivo, pacienteId, doctorId } = req.body;

  try {
    const cita = await Cita.findByPk(id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

    cita.fecha = fecha || cita.fecha;
    cita.hora = hora || cita.hora;
    cita.motivo = motivo || cita.motivo;
    cita.pacienteId = pacienteId || cita.pacienteId;
    cita.doctorId = doctorId || cita.doctorId;

    await cita.save();
    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};

// Eliminar una cita
exports.eliminarCita = async (req, res) => {
  const { id } = req.params;

  try {
    const cita = await Cita.findByPk(id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

    await cita.destroy();
    res.status(200).json({ mensaje: 'Cita eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
};
