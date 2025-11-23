const express = require('express');
const cors = require('cors');

const followRoutes = require('./routes/follow');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', followRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend Red UT funcionando!' });
});

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});