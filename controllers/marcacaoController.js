const Marcacao = require("../models/marcacao");
const Staff = require("../models/staff");
const Cliente = require("../models/cliente");
const ProductoServico = require("../models/productoServico");

const marcacao_new = (req, res) => {
  let staff = new Staff();
  let cliente = new Cliente();
  let productoServico = new ProductoServico();
  Staff.find()
    .populate("conta")
    .then((result) => {
      staff = result;
    });

  Cliente.find()
    .populate("conta")
    .then((result) => {
      cliente = result;
    });

  ProductoServico.find().then((result) => {
    productoServico = result;
    res.render("marcacao/form_cadastro_marcacao", {
      staffs: staff,
      clientes: cliente,
      productosServicos: productoServico,
    });
  });
};

const marcacao_create = (req, res) => {
    const marcacao = new Marcacao(req.body);
  marcacao
    .save()
    .then((result) => {
      res.redirect('/marcacoes');
    })
    .catch((err) => {
      console.log(err);
    });
};

const marcacao_list = (req, res) => {
    Marcacao.find()
  .populate('staff')
  .populate('cliente')
    .populate('productoServico')
    .then((result) => {
      
       res.render("marcacao/table_lista_marcacao", { marcacoes: result }); 
    })
    .catch((err) => console.log(err));
};

const marcacao_list_id = (req, res) => {
    const id = req.params.id;
    Conta.findById(id)
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("conta/detail_conta", { conta: result });
      })
      .catch((err) => console.log(err));
};

const marcacao_update = (req, res) => {};

const marcacao_delete = (req, res) => {};

module.exports = {
    marcacao_new,
    marcacao_create,
    marcacao_list,
    marcacao_list_id,
    marcacao_update,
    marcacao_delete,
  };
  