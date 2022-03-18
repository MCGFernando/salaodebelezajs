const Cliente = require("../models/cliente");
const Conta = require("../models/conta");
const Endereco = require("../models/endereco");

const cliente_create = (req, res) => {
  const conta = new Conta(req.body);
  conta
    .save()
    .then((result) => {
      console.log("Conta Cadastrada");
    })
    .catch((err) => console.log(err));

  const endereco = new Endereco({
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    bairro: req.body.bairro,
    conta,
  });
  endereco
    .save()
    .then((result) => {
      console.log("Endereco Cadastrada");
    })
    .catch((err) => console.log(err));

  const cliente = new Cliente({
    imagem: req.body.imagem,
    nascimento: req.body.nascimento,
    genero: req.body.genero,
    desconto: req.body.desconto,
    conta,
  });
  cliente
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
}

const cliente_new = (req, res) => {
  res.render("cliente/form_cadastro_cliente");
}

const cliente_list = (req, res) => {
  Cliente.find()
    .sort({ createdAt: -1 })
    .populate("conta")
    .then((result) => {
      res.render("cliente/table_lista_cliente", { clientes: result });
    })
    .catch((err) => console.log(err));
}

const cliente_list_id = (req, res) => {
  const id = req.params.id;
  Cliente.findById(id)
    .populate("conta")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.render("404", { title: "Page not found" });
    });
}

const cliente_delete = (req, res) => {}

const cliente_update = (req, res) => {}

module.exports = {
    cliente_new,
    cliente_create,
    cliente_list,
    cliente_list_id,
    cliente_update,
    cliente_delete
}