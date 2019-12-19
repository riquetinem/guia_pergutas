const Sequelize = require("sequelize");
const connection = require("./database");

//define = define o nome da tabela no banco de dados
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({
    force: false
}).then(() => [
   console.log("Tabela pergunta criada com sucesso")
]);

module.exports = Pergunta;