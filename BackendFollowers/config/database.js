const { Sequelize } = require('sequelize');

// Configuración de la conexión a MySQL
const sequelize = new Sequelize('redut_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a MySQL correctamente');
    })
    .catch(err => {
        console.log('Error conectando a MySQL:', err.message);
    });

module.exports = sequelize;