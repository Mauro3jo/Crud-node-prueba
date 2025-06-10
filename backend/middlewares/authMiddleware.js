const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ msg: 'Token no proporcionado' });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = data;
    req.token = token;
    next();
  } catch {
    return res.status(403).json({ msg: 'Token inválido o expirado' });
  }
};
