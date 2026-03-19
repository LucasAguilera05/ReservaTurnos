const { Usuario, Paciente, Medico, Administrador } = require('../model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwtConfig');

exports.registrarUsuario = async (req, res) => {
  const { dni, nombre, apellido, email, telefono, direccion, password, passwordConfirm, rol, edad, peso, altura, historial, sexo, especialidad } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) return res.status(400).json({ error: 'El email ya está registrado' });

    let nuevoPaciente = null;
    let nuevoMedico = null;
    let nuevoAdmin = null;

    if (rol && rol.toLowerCase() === 'paciente') {
      nuevoPaciente = await Paciente.create({
        dni, nombre, apellido, telefono, direccion, edad, peso, altura, sexo, historial,
      });
    } else if (rol && (rol.toLowerCase() === 'medico' || rol.toLowerCase() === 'médico')) {
      nuevoMedico = await Medico.create({
        dni, nombre, apellido, telefono, direccion, especialidad,
      });
    } else if (rol && (rol.toLowerCase() === 'administrador' || rol.toLowerCase() === 'admin')) {
      nuevoAdmin = await Administrador.create({
        dni, nombre, apellido, telefono, direccion,
      });
    }

    const nuevoUsuario = await Usuario.create({
      email,
      password,
      passwordConfirm,
      rol,
      pacienteId: nuevoPaciente ? nuevoPaciente.id : null,
      medicoId: nuevoMedico ? nuevoMedico.id : null,
      adminId: nuevoAdmin ? nuevoAdmin.id : null,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.log("error al cargar usuario", error);
    res.status(500).json({ error: 'Error al registrar el usuario'});
  }
};


exports.iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ 
      where: { email },
      include: [
        { model: Paciente, as: 'pacienteData' },
        { model: Medico, as: 'medicoData' },
        { model: Administrador, as: 'adminData' }
      ]
    });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (password !== usuario.password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, secret, { expiresIn });
    res.status(200).json({ token, usuario });
  } catch (error) {
    console.log("error al iniciar sesión");
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};





exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        { model: Paciente, as: 'pacienteData' },
        { model: Medico, as: 'medicoData' },
        { model: Administrador, as: 'adminData' }
      ]
    });
    res.status(200).json(usuarios);
  } catch (error) {
    console.log("error al obtener");
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    await usuario.destroy();
    res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.log("error al eliminar");
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id, {
      include: [
        { model: Paciente, as: 'pacienteData' },
        { model: Medico, as: 'medicoData' },
        { model: Administrador, as: 'adminData' }
      ]
    }); // Buscar por clave primaria
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.log("error al buscar");
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};
