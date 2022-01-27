const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prudctoServicoSchema = new Schema({
    categorias_id : {type:String, required:true},
    productoServico : {type:String, required:true},
    descricao : {type:String, required:true},
    quantidade  : {type:Number, default:1},
    valorCompra  : {type:Number},
    desconto  : {type:Number},
    iva  : {type:Number, required:true},
    taxaLucro  : {type:String},
    valorVanda  : {type:String, required:true},
},{timestamps:true})

const ProductoServico = mongoose.model('ProductoServico',prudctoServicoSchema)

module.exports = ProductoServico