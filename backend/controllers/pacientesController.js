const Paciente = require('../model/Paciente');

exports.obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
};

exports.crearPaciente = async (req, res) => {
  const { nombre, apellido, dni, telefono } = req.body;

  try {
    const nuevoPaciente = await Paciente.create({ nombre, apellido, dni, telefono });
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el paciente' });
  }
};

exports.actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, dni, telefono } = req.body;

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    paciente.nombre = nombre || paciente.nombre;
    paciente.apellido = apellido || paciente.apellido;
    paciente.dni = dni || paciente.dni;
    paciente.telefono = telefono || paciente.telefono;

    await paciente.save();
    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el paciente' });
  }
};

exports.eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    await paciente.destroy();
    res.status(200).json({ mensaje: 'Paciente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el paciente' });
  }
};
