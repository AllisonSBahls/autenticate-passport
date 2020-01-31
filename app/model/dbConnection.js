// Conectando com o banco de dados utilizando o 

const Sequelize = require('sequelize');
const sequelize = new Sequelize('authenticate', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
});



module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

