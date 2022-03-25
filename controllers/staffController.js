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

  

  const staff = new Staff({
    conta,
    bi : req.body.bi,
    genero : req.body.genero,
    nascimento : req.body.nascimento,
    imagem : req.body.imagem,
    funcao : req.body.funcao,
    estado: req.body.estado,
    endereco :{
      endereco: req.body.endereco,
      cidade: req.body.cidade,
      bairro: req.body.bairro
    }
  });
  staff.save().then((result) => {
    console.log("Staff Cadastrada");  
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

const staff_list_id_controller = (req, res) => {
  const id = req.params.id;
  Staff.findById(id).populate('conta').then(result => {
    res.render('staff/form_edita_staff', {staff : result})
    //res.send(result)
  }).catch(err => {
    console.log(err)
  })
}

const staff_delete = (req, res) => {}

const staff_update = (req, res) => {}

module.exports = {
    staff_new,
    staff_create,
    staff_list_id_controller,
    staff_list,
    staff_list_id,
    staff_update,
    staff_delete
}