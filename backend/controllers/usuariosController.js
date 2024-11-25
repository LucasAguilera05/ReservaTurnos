const Usuario = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwtConfig');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) return res.status(400).json({ error: 'El email ya está registrado' });

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña: hashedPassword,
      rol,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    // Buscar al usuario por email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Verificar la contraseña
    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar token JWT
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, secret, { expiresIn });
    res.status(200).json({ token, usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    await usuario.destroy();
    res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
