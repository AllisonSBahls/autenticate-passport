const bd = require('./dbConnection');


const users = bd.sequelize.define('users', {
    name: {
        type: bd.Sequelize.STRING
    },
    user: {
        type: bd.Sequelize.STRING
    },
    password: {
        type: bd.Sequelize.STRING
    },
});

module.exports = users;


// users.sync({ force: true });

