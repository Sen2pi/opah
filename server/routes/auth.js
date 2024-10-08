const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const jwtSecret = 'your_secret_key';

// Registro
router.post('/register', 
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, password, tipo_utilizador } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      connection.query('INSERT INTO Usuarios SET ?', 
      { nome, email, password, tipo_utilizador }, 
      (error, results) => {
        if (error) throw error;
        res.status(201).json({ msg: 'User registered!' });
      });
    });
  });

// Login
router.post('/login', 
  body('email').isEmail(),
  body('password').exists(),
  (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM Usuarios WHERE Email = ?', [email], (err, results) => {
      if (err) throw err;
      if (results.length === 0) return res.status(400).json({ msg: 'Invalid credentials' });
      
      bcrypt.compare(password, password, (err, isMatch) => {
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
        
        const token = jwt.sign({ userId: results[0].id, tipo: results[0].tipo_utilizador }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
      });
    });
  }
);

module.exports = router;
