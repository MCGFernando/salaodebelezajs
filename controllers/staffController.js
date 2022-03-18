const Staff = require("../models/staff");
const Conta = require('../models/conta')
const Endereco = require('../models/endereco')


const staff_list = (req, res) => {
    Staff.find()
      .sort({ createdAt: -1 })
      .populate("conta") 
      .then((result) => {
        res.render("staff/table_lista_staff", { staffs: result });
      })
      .catch((err) => console.log(err));
}

const staff_new = (req, res) =>{
    res.render("staff/form_cadastro_staff");
}

const staff_create = (req, res) => {
  const conta = new Conta(req.body);
  conta.save().then((result) => {
      console.log("Conta Cadastrada");
    }).catch((err) => console.log(err));

  const endereco = new Endereco({
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    bairro: req.body.bairro,
    conta,
  });
  endereco.save().then((result) => {
      console.log("Endereco Cadastrada");
    }).catch((err) => console.log(err));

  const staff = new Staff({
    funcao: req.body.funcao,
    nascimento: req.body.nascimento,
    genero: req.body.genero,
    bi: req.body.bi,
    conta,
  });
  staff.save().then((result) => {
      res.redirect("/staff");
    }).catch((err) => console.log(err));
}




const staff_list_id = (req, res) => {
  const id = req.params.id;
  Staff.findById(id)
    .populate("conta")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.render("404", { title: "Page not found" });
    });
}

const staff_delete = (req, res) => {}

const staff_update = (req, res) => {}

module.exports = {
    staff_new,
    staff_create,
    staff_list,
    staff_list_id,
    staff_update,
    staff_delete
}