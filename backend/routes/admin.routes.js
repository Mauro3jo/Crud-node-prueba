const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/usuarios', auth, adminController.listarUsuarios);
router.put('/usuarios/:id', auth, adminController.editarUsuario);
router.delete('/usuarios/:id', auth, adminController.eliminarUsuario);

module.exports = router;
