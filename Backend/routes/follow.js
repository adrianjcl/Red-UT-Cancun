const express = require('express');
const router = express.Router();
const db = require('../bd'); // asegúrate que el nombre coincida

// Ruta para seguir a un usuario
router.post('/follow/:id', (req, res) => {
  const { followerId } = req.body;
  const followedId = req.params.id;

  const query = 'INSERT INTO followers (follower_id, followed_id) VALUES (?, ?)';
  db.query(query, [followerId, followedId], (err) => {
    if (err) return res.status(500).json({ error: 'Error al seguir usuario' });
    res.json({ message: 'Seguido con éxito' });
  });
});

// Ruta para dejar de seguir
router.delete('/unfollow/:id', (req, res) => {
  const { followerId } = req.body;
  const followedId = req.params.id;

  const query = 'DELETE FROM followers WHERE follower_id = ? AND followed_id = ?';
  db.query(query, [followerId, followedId], (err) => {
    if (err) return res.status(500).json({ error: 'Error al dejar de seguir' });
    res.json({ message: 'Dejado de seguir con éxito' });
  });
});

module.exports = router;