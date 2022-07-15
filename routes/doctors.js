const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const DoctorController = require('../controllers/doctors_controller');

/// Retorna todos os medicos
router.get('/', login.obrigatorio, DoctorController.returnAllDoctors );
/// Insere um medico
router.post('/', login.obrigatorio, DoctorController.insertDoctor); 



module.exports = router;