const { DatoPersonal, Usuario } = require('../models');

module.exports = {
  // Ver datos personales del usuario logueado
  async verMisDatos(req, res) {
    try {
      const datos = await DatoPersonal.findOne({
        where: { usuario_id: req.usuario.id }
      });

      res.json(datos || {});
    } catch (error) {
      res.status(500).json({ msg: 'Error al obtener datos personales', error });
    }
  },

  // Actualizar mis datos personales
  async actualizarMisDatos(req, res) {
    const { direccion, telefono, fecha_nacimiento } = req.body;

    try {
      const [datos, creado] = await DatoPersonal.findOrCreate({
        where: { usuario_id: req.usuario.id },
        defaults: { direccion, telefono, fecha_nacimiento }
      });

      if (!creado) {
        datos.direccion = direccion;
        datos.telefono = telefono;
        datos.fecha_nacimiento = fecha_nacimiento;
        await datos.save();
      }

      res.json({ msg: 'Datos personales actualizados', datos });
    } catch (error) {
      res.status(500).json({ msg: 'Error al actualizar', error });
    }
  }
};
