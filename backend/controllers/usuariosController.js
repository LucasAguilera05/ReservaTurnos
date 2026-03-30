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

    const roleToCreate = rol ? rol.toLowerCase() : 'paciente';
    const finalRoleStr = rol || 'Paciente';

    if (roleToCreate === 'paciente') {
      nuevoPaciente = await Paciente.create({
        dni, nombre, apellido, telefono, direccion, edad, peso, altura, sexo, historial,
      });
    } else if (roleToCreate === 'medico' || roleToCreate === 'médico') {
      nuevoMedico = await Medico.create({
        dni, nombre, apellido, telefono, direccion, especialidad,
      });
    } else if (roleToCreate === 'administrador' || roleToCreate === 'admin') {
      nuevoAdmin = await Administrador.create({
        dni, nombre, apellido, telefono, direccion,
      });
    }

    const nuevoUsuario = await Usuario.create({
      email,
      password,
      passwordConfirm,
      rol: finalRoleStr,
      pacienteId: nuevoPaciente ? nuevoPaciente.id : null,
      medicoId: nuevoMedico ? nuevoMedico.id : null,
      adminId: nuevoAdmin ? nuevoAdmin.id : null,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.log("error al cargar usuario", error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
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





exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { 
    email, password, rol,
    // Datos de perfiles
    dni, nombre, apellido, telefono, direccion, 
    edad, peso, altura, sexo, historial, 
    especialidad 
  } = req.body;

  try {
    const usuario = await Usuario.findByPk(id, {
      include: [
        { model: Paciente, as: 'pacienteData' },
        { model: Medico, as: 'medicoData' },
        { model: Administrador, as: 'adminData' }
      ]
    });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Actualizar datos base del usuario
    if (email) usuario.email = email;
    if (password) {
      usuario.password = password;
      usuario.passwordConfirm = password;
    }
    
    // NOTA: El cambio de rol no suele soportarse fácilmente sin migrar los datos al nuevo perfil, 
    // pero actualizaremos el string si es provisto. Idealmente el rol es fijo.
    if (rol) usuario.rol = rol;
    await usuario.save();

    const actualRol = usuario.rol.toLowerCase();

    // Determinar qué perfil actualizar según el rol actual del usuario
    if (actualRol === 'paciente' || actualRol === 'paciente') {
      let paciente = await Paciente.findByPk(usuario.pacienteId);
      if (paciente) {
        paciente.dni = dni || paciente.dni;
        paciente.nombre = nombre || paciente.nombre;
        paciente.apellido = apellido || paciente.apellido;
        paciente.telefono = telefono || paciente.telefono;
        paciente.direccion = direccion || paciente.direccion;
        paciente.edad = edad || paciente.edad;
        paciente.peso = peso || paciente.peso;
        paciente.altura = altura || paciente.altura;
        paciente.sexo = sexo || paciente.sexo;
        paciente.historial = historial || paciente.historial;
        await paciente.save();
      }
    } else if (actualRol === 'medico' || actualRol === 'médico') {
      let medico = await Medico.findByPk(usuario.medicoId);
      if (medico) {
        medico.dni = dni || medico.dni;
        medico.nombre = nombre || medico.nombre;
        medico.apellido = apellido || medico.apellido;
        medico.telefono = telefono || medico.telefono;
        medico.direccion = direccion || medico.direccion;
        medico.especialidad = especialidad || medico.especialidad;
        await medico.save();
      }
    } else if (actualRol === 'administrador' || actualRol === 'admin') {
      let admin = await Administrador.findByPk(usuario.adminId);
      if (admin) {
        admin.dni = dni || admin.dni;
        admin.nombre = nombre || admin.nombre;
        admin.apellido = apellido || admin.apellido;
        admin.telefono = telefono || admin.telefono;
        admin.direccion = direccion || admin.direccion;
        await admin.save();
      }
    }

    // Refrescar para devolver datos actualizados
    const usuarioActualizado = await Usuario.findByPk(id, {
      include: [
        { model: Paciente, as: 'pacienteData' },
        { model: Medico, as: 'medicoData' },
        { model: Administrador, as: 'adminData' }
      ]
    });

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
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
