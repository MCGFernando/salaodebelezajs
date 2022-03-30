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

const venda_list_id = (req, res) =>{
  const id = req.params.id;
  Venda.findById(id).populate({
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
  }).populate({
    path:'itemVenda',
    populate:{
      path:'productoServico',
      model:'ProductoServico'
    }
  })
  .then(result =>{
    //res.send(result)
    res.render('venda/venda_details',{venda : result})
  }).catch(err=>{
    console.log(err)
    res.render('404')
  })
}
const venda_create = (req, res) =>{
  console.log(req.body)
  const pagamento = {
    valorPago: req.body.valorPago,
  }
   const {staff, cliente} = req.body 
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
    parcela: req.body.parcela,
    valorTotalVenda: req.body.valorTotalVenda,
    tipoPagamento: req.body.tipoPagamento,
    itemVenda,
    pagamento
  })
  console.log(venda)
  venda
    .save()
    .then((result) => {
      res.redirect('/vendas/new');
    })
    .catch((err) => console.log(err));
}
module.exports = {
    venda_new,
    venda_create,
    venda_list,
    venda_list_id
}