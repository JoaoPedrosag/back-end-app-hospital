const express = require('express');
const router = express.Router();


const UserController = require('../controllers/user_controller');

router.post('/cadastro', UserController.insertUser);

router.post('/login', UserController.loginUser);


module.exports = router;