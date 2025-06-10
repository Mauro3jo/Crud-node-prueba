const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/datos', require('./routes/datos.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// Conexión y sincronización con la base de datos
sequelize.sync()
  .then(() => console.log('Conectado y sincronizado con la base de datos.'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

module.exports = app;
