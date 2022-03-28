const Venda = require('../models/venda')
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

const venda_new = (req, res) =>{
    getObejectsInfo().then(data => {
        const {staffs, clientes, productosServicos} = data
        res.render("venda/form_venda", {
          staffs,
          clientes,
          productosServicos,
        })
      }).catch(err=>{
        res.render('404')
      })
    
}
const venda_list = (req, res) =>{
  Venda.find().populate({
    path:'staff',
    populate:{
      path:'conta',
      model:'Conta'
    }
  }).populate({
    path:'cliente',
    populate:{
      path:'conta',
      model:'Conta'
    }
  }).then(result =>{
    res.render('venda/table_lista_venda',{vendas : result})
  }).catch(err=>{
    res.render('404')
  })
}
const venda_create = (req, res) =>{
  console.log(req.body)
  /* const {staff, cliente} = req.body 
  let itemVenda = []

  for (let i = 0; i < req.body.id.length; i++){
    itemVenda[i] = {
      productoServico : req.body.id[i],
      quantidade : req.body.quantidade[i]
    }
  }
  
  const venda = new Venda({
    staff,
    cliente,
    itemVenda
  })
  venda
    .save()
    .then((result) => {
      res.redirect('/vendas/new');
    })
    .catch((err) => console.log(err)); */
}
module.exports = {
    venda_new,
    venda_create,
    venda_list
}