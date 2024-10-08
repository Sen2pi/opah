// routes/publicacoes.js
const express = require('express');
const router = express.Router();
const { getUltimasPublicacoes } = require('../controllers/publicacoesController');

// Rota para obter as últimas publicações
router.get('/ultimas', getUltimasPublicacoes);

module.exports = router;
