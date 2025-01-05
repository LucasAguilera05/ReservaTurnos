const Admin = require('../model/Admin');
const Doctor = require('../model/Doctor');
const Paciente = require('../model/Paciente');

// administrar administradores

exports.obtenerAdmin = async (req, res) => {
  try {
    const administradores = await Admin.findAll();
    res.status(200).json(administradores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el Administrador' });
  }
};

exports.crearAdmin = async (req, res) => {
  const { nombre, especialidad, telefono } = req.body;

  try {
    const nuevoAdmin = await Admin.create({ nombre, especialidad, telefono });
    res.status(201).json(nuevoAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Administrador' });
  }
};

exports.actualizarAdmin = async (req, res) => {
  const { id } = req.params;
  const { nombre, especialidad, telefono } = req.body;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ error: 'Administrador no encontrado' });

    admin.nombre = nombre || admin.nombre;
    admin.especialidad = especialidad || admin.especialidad;
    admin.telefono = telefono || admin.telefono;

    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el administrador' });
  }
};

exports.eliminarAdminisitrador = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json({ error: 'Administrador no encontrado' });

    await admin.destroy();
    res.status(200).json({ mensaje: 'Administrador eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Administrador' });
  }
};




// administrar doctores


exports.obtenerDoctores = async (req, res) => {
    try {
      const doctores = await Doctor.findAll();
      res.status(200).json(doctores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener doctores' });
    }
  };
  
  exports.crearDoctor = async (req, res) => {
    const { nombre, especialidad, telefono } = req.body;
  
    try {
      const nuevoDoctor = await Doctor.create({ nombre, especialidad, telefono });
      res.status(201).json(nuevoDoctor);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el doctor' });
    }
  };
  
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
  
  // administrar pacientes

  
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
  
