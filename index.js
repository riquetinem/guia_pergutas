const express = require("express");
const app = express();

//setando o ejs para ser a engine para exibir html
app.set('view engine', 'ejs');

app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome
    var lang = req.params.lang
    var exibirMsg = true;

    var produtos = [
        {
            nome: "Doritos", preco: 3.14
        },

        {
            nome: "Coca-cola", preco: 5.50
        }
    ]

    res.render("index", {
        nome : nome,
        lang : lang,
        msg : exibirMsg,
        produtos : produtos
    })
});

app.listen(8080, () => {
    console.log("App rodando!")
})