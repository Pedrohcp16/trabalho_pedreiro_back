const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para registrar usuário
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: "Erro ao registrar" });
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hash], (err, result) => {
      if (err) return res.status(500).json({ message: "Erro ao registrar" });
      res.status(201).json({ message: "Usuário registrado!" });
    });
  });
};

// Função para login do usuário
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: "Login bem-sucedido!", token });
    });
  });
};

// Função para atualizar dados do usuário
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: "Erro ao atualizar usuário" });
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [name, email, hash, id], (err, result) => {
      if (err) return res.status(500).json({ message: "Erro ao atualizar usuário" });
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    });
  });
};

// Função para excluir usuário
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erro ao excluir usuário" });
    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  });
};
