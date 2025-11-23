const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Follow = sequelize.define('Follow', {
    followerId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    followingId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'follows'
});

// Sincronizar el modelo con la base de datos
Follow.sync()
    .then(() => console.log('Tabla Follow creada/existe'))
    .catch(err => console.log('Error creando tabla:', err));

module.exports = Follow;