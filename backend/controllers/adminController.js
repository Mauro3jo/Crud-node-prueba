const { Usuario, DatoPersonal } = require('../models');

module.exports = {
  // Solo para admins: ver todos los usuarios
  async listarUsuarios(req, res) {
    if (req.usuario.rol !== 'admin') return res.status(403).json({ msg: 'No autorizado' });

    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'estado', 'creado_en']
    });

    res.json(usuarios);
  },

  // Editar estado o rol de un usuario
  async editarUsuario(req, res) {
    if (req.usuario.rol !== 'admin') return res.status(403).json({ msg: 'No autorizado' });

    const { id } = req.params;
    const { rol, estado } = req.body;

    try {
      const user = await Usuario.findByPk(id);
      if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

      if (rol) user.rol = rol;
      if (estado) user.estado = estado;
      await user.save();

      res.json({ msg: 'Usuario actualizado', user });
    } catch (error) {
      res.status(500).json({ msg: 'Error al editar usuario', error });
    }
  },

  // Eliminar un usuario
  async eliminarUsuario(req, res) {
    if (req.usuario.rol !== 'admin') return res.status(403).json({ msg: 'No autorizado' });

    const { id } = req.params;

    try {
      const deleted = await Usuario.destroy({ where: { id } });
      res.json({ msg: deleted ? 'Usuario eliminado' : 'Usuario no encontrado' });
    } catch (error) {
      res.status(500).json({ msg: 'Error al eliminar usuario', error });
    }
  }
};
