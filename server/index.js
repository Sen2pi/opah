const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const publicacoesRoutes = require('./routes/publicacoes'); // Certifique-se de que você tenha esse arquivo

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/publicacoes', publicacoesRoutes); // Rotas de publicações

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
