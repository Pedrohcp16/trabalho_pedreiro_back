const express = require('express');
const { registerUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);

// Adicione outras rotas (login, editar, deletar)...
module.exports = router;