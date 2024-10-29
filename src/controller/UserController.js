const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) res.status(500).json({ message: "Erro ao registrar" });
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hash], (err, result) => {
      if (err) res.status(500).json({ message: "Erro ao registrar" });
      res.status(201).json({ message: "Usuário registrado!" });
    });
  });
};

// Adicione funções para login, atualização e exclusão de usuário...
