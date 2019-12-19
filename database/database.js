const Sequelize = require('sequelize');

const connection = new Sequelize('guia_perguntas', 'root', 'tinem714', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;