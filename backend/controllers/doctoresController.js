const Doctor = require('../model/Doctor');

// Obtener todos los doctores
exports.obtenerDoctores = async (req, res) => {
  try {
    const doctores = await Doctor.findAll();
    res.status(200).json(doctores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener doctores' });
  }
};

// Crear un nuevo doctor
exports.crearDoctor = async (req, res) => {
  const { nombre, especialidad, telefono } = req.body;

  try {
    const nuevoDoctor = await Doctor.create({ nombre, especialidad, telefono });
    res.status(201).json(nuevoDoctor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el doctor' });
  }
};

// Actualizar un doctor
exports.actualizarDoctor = async (req, res) => {
  const { id } = req.params;
  const { nombre, especialidad, telefono } = req.body;

  try {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ error: 'Doctor no encontrado' });

    doctor.nombre = nombre || doctor.nombre;
    doctor.especialidad = especialidad || doctor.especialidad;
    doctor.telefono = telefono || doctor.telefono;

    await doctor.save();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el doctor' });
  }
};

// Eliminar un doctor
exports.eliminarDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ error: 'Doctor no encontrado' });

    await doctor.destroy();
    res.status(200).json({ mensaje: 'Doctor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el doctor' });
  }
};
