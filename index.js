const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

//DATABASE
connection
    .authenticate()
    .then(() => {
        console.log("Conexao ok")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

//setando o ejs para ser a engine para exibir html
app.set('view engine', 'ejs');
app.use(express.static('public'));

//setando para conseguir receber coisas por post
app.use(bodyParser.urlencoded({
    extend: false
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC'] //ASC = crescente || DESC = decrescente
        ]
    }).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
});

app.get("/perguntar", (req, res) => {
    res.render('perguntar')
});

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id

    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        if (pergunta != undefined) { //acho um resultado
            Resposta.findAll({
                where: {
                    pergunta_id: pergunta.id
                },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })

        } else { // nao achou
            res.redirect('/')
        }
    })
});

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo
    let idPergunta = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        pergunta_id: idPergunta
    }).then(() => {
        res.redirect('/pergunta/' + idPergunta)
    })
});

app.listen(8080, () => {
    console.log("App rodando!")
});