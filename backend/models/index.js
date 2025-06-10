const Usuario = require('./Usuario');
const DatoPersonal = require('./DatoPersonal');
const Sesion = require('./Sesion');

Usuario.hasOne(DatoPersonal, {
  foreignKey: 'usuario_id',
  onDelete: 'CASCADE',
});
DatoPersonal.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
});

Usuario.hasMany(Sesion, {
  foreignKey: 'usuario_id',
  onDelete: 'CASCADE',
});
Sesion.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
});

module.exports = {
  Usuario,
  DatoPersonal,
  Sesion,
};
