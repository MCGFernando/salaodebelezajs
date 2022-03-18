const Endeereco = require("../models/endereco");

const endereco_create = (req, res) => {};

const endereco_list = (req, res) => {
  Endereco.find()
    .sort({ createdAt: -1 })
    .populate("conta")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

const endereco_staf_list = (req, res) => {};

const endereco_staf_list_id = (req, res) => {};

const endereco_clientes_list = (req, res) => {};

const endereco_clientes_list_id = (req, res) => {};

const endereco_list_id = (req, res) => {};

const endereco_delete = (req, res) => {};

const endereco_update = (req, res) => {};

module.exports = {
  endereco_create,
  endereco_list,
  endereco_staf_list,
  endereco_staf_list_id,
  endereco_clientes_list,
  endereco_clientes_list_id,
  endereco_list_id,
  endereco_delete,
  endereco_update,
};
