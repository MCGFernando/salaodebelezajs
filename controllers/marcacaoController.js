const Marcacao = require("../models/marcacao");
const Staff = require("../models/staff");
const Cliente = require("../models/cliente");
const ProductoServico = require("../models/productoServico");

const getObejectsInfo = async () => {
  const responseStaff = await Staff.find().populate("conta");
  const dataStaff = await responseStaff;

  const responseCliente = await Cliente.find().populate("conta");
  const dataCliente = await responseCliente;

  const responseProductoServico = await ProductoServico.find();
  const dataProductoServico = await responseProductoServico;
  
  return {
    staffs: dataStaff,
    clientes: dataCliente,
    productosServicos: dataProductoServico,
  };
};



const marcacao_new = (req, res) => {
  getObejectsInfo().then(data => {
    const {staffs, clientes, productosServicos} = data
    res.render("marcacao/form_cadastro_marcacao", {
      staffs,
      clientes,
      productosServicos,
    })
  }).catch(err=>{
    res.render('404')
  })
  
  
 /*  
  const {staffs, clientes, productosServicos} = getObejectsInfo()
  const staff = new Staff(staffs)
  const cliente = new Cliente(clientes)
  const productoServico = new ProductoServico(productosServicos)
  console.log(getObejectsInfo());
  res.render("marcacao/form_cadastro_marcacao", {
    staffs: staff,
    clientes: cliente,
    productosServicos: productoServico,
  } ); */

  /* getObejectInfo(Staff, 'conta').then(data =>{
    return getObejectInfo(Cliente, 'conta')
  }).then(data => {
    return ProductoServico.find()
  }).then()

  console.log(s) */

  /* let staff = new Staff();
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
  }); */
};

const marcacao_create = (req, res) => {
  const marcacao = new Marcacao(req.body);
  marcacao
    .save()
    .then((result) => {
      res.redirect("/marcacoes");
    })
    .catch((err) => {
      console.log(err);
    });
};

const marcacao_list = (req, res) => {
  Marcacao.find()
    .populate({
      path:'staff',
      populate:{
        path:'conta',
        model:'Conta'
      }
    })
    .populate({
      path:'cliente',
      populate:{
        path:'conta',
        model:'Conta'
      }
    })
    .populate("productoServico")
    .then((result) => {
      res.render("marcacao/table_lista_marcacao", { marcacoes: result });
      //res.send(result)
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
