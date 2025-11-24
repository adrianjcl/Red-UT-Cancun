const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./bd');

app.use(cors());
app.use(express.json());

const followRoutes = require('./routes/follow');
app.use('/api', followRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});