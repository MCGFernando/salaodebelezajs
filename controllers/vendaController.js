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


module.exports = {
    venda_new
}