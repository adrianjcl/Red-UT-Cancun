const express = require('express');
const Follow = require('../models/Follow');
const router = express.Router();

// Seguir a un usuario
router.post('/follow', async (req, res) => {
    try {
        const { followerId, followingId } = req.body;

        const newFollow = await Follow.create({
            followerId: followerId,
            followingId: followingId
        });
        
        res.json({ message: 'Usuario seguido exitosamente', follow: newFollow });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

// Dejar de seguir
router.delete('/unfollow', async (req, res) => {
    try {
        const { followerId, followingId } = req.body;
        await Follow.destroy({ 
            where: { 
                followerId: followerId, 
                followingId: followingId 
            } 
        });
        res.json({ message: 'Dejado de seguir exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verificar si sigue a un usuario
router.get('/check-follow/:followerId/:followingId', async (req, res) => {
    try {
        const follow = await Follow.findOne({
            where: {
                followerId: req.params.followerId,
                followingId: req.params.followingId
            }
        });
        res.json({ isFollowing: !!follow });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar seguidores de un usuario (quienes me siguen)
router.get('/followers/:userId', async (req, res) => {
    try {
        const followers = await Follow.findAll({
            where: { followingId: req.params.userId }
        });
        res.json({ followers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar seguidos por un usuario (a quien sigo)
router.get('/following/:userId', async (req, res) => {
    try {
        const following = await Follow.findAll({
            where: { followerId: req.params.userId }
        });
        res.json({ following });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});