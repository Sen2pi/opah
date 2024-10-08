const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const allRoutes = require('./routes/allRoutes');
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/api', allRoutes ); // Rotas de De todos recursos 


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
