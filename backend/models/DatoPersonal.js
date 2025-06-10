const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DatoPersonal = sequelize.define('DatoPersonal', {
  direccion: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
  }
}, {
  tableName: 'datos_personales',
  timestamps: false,
});

module.exports = DatoPersonal;
