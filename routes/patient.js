const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const PatientsController = require('../controllers/patients_controller');

/// Retorna todos os pacientes
router.get('/', login.obrigatorio, PatientsController.getAllPacients); 

/// Insere um paciente
router.post('/',  login.obrigatorio, PatientsController.insertPatient);

/// Retorna os dados de um paciente
router.get('/:id_patient',  login.obrigatorio, PatientsController.retornoUnPatients);

/// Atualiza os dados de um paciente
router.patch('/',  login.obrigatorio, PatientsController.updatePatient);

/// Deleta um paciente
router.delete('/',  login.obrigatorio, PatientsController.deletePatient);


module.exports = router;