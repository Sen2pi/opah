const express = require('express');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const app = express();

app.use(helmet());
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
