const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const jwtSecret = 'your_secret_key';

// Registro (sem criptografia)
router.post('/register', 
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, password, tipo_utilizador } = req.body;
    connection.query('INSERT INTO Usuarios SET ?', 
    { nome, email, password, tipo_utilizador }, 
    (error, results) => {
      if (error) throw error;
      res.status(201).json({ msg: 'User registered!' });
    });
  });

// Login sem criptografia
router.post('/login', 
  body('email').isEmail(),
  body('password').exists(),
  (req, res) => {
    const { email, password } = req.body;

    // Verifica se o email existe no banco de dados
    connection.query('SELECT * FROM Usuarios WHERE Email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      
      // Se o usuário não for encontrado
      if (results.length === 0) {
        return res.status(400).json({ msg: 'Invalid email or password' });
      }

      // Comparar diretamente a senha fornecida com a armazenada
      const storedPassword = results[0].Password; // A senha armazenada no BD (sem hash)
      
      if (password !== storedPassword) {
        return res.status(400).json({ msg: 'Invalid email or password' });
      }

      // Gera o token JWT após a validação
      const token = jwt.sign(
        { userId: results[0].id, tipo: results[0].TipoUtilizador }, // Inclua o tipo de utilizador no payload do JWT
        jwtSecret, 
        { expiresIn: '3h' } // O token expira em 3 horas
      );

      // Retorna o token e o tipo de utilizador
      res.json({ token, userType: results[0].TipoUtilizador }); // Enviar o tipo de utilizador
    });
  }
);


module.exports = router;
