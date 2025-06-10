const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const datosController = require('../controllers/datosController');

router.get('/', auth, datosController.verMisDatos);
router.put('/', auth, datosController.actualizarMisDatos);

module.exports = router;
