const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sesion = sequelize.define('Sesion', {
  token: {
    type: DataTypes.TEXT,
  },
  inicio_sesion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fin_sesion: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'sesiones',
  timestamps: false,
});

module.exports = Sesion;
