const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Sesion } = require('../models');
require('dotenv').config();

const generarToken = (usuario) => {
  return jwt.sign({
    id: usuario.id,
    rol: usuario.rol
  }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

module.exports = {
  async register(req, res) {
    const { nombre, email, password } = req.body;

    try {
      const existe = await Usuario.findOne({ where: { email } });
      if (existe) return res.status(400).json({ msg: 'El email ya está registrado' });

      const hash = await bcrypt.hash(password, 10);
      const nuevoUsuario = await Usuario.create({ nombre, email, password: hash });

      res.status(201).json({ msg: 'Usuario registrado', usuario: { id: nuevoUsuario.id, nombre, email } });
    } catch (error) {
      res.status(500).json({ msg: 'Error en el registro', error });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

      const valido = await bcrypt.compare(password, usuario.password);
      if (!valido) return res.status(401).json({ msg: 'Contraseña incorrecta' });

      const token = generarToken(usuario);

      // Guardar sesión
      await Sesion.create({
        usuario_id: usuario.id,
        token
      });

      res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });
    } catch (error) {
      res.status(500).json({ msg: 'Error en el login', error });
    }
  },

  async logout(req, res) {
    try {
      const token = req.token;

      const sesion = await Sesion.findOne({ where: { token } });
      if (sesion) {
        sesion.fin_sesion = new Date();
        await sesion.save();
      }

      res.json({ msg: 'Sesión cerrada correctamente' });
    } catch (error) {
      res.status(500).json({ msg: 'Error al cerrar sesión', error });
    }
  }
};
