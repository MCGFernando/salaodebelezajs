const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prudctoServicoSchema = new Schema({
    categoria : {type: mongoose.SchemaTypes.ObjectId, ref:'Categoria', required:true},
    productoServico : {type:String, required:true},
    descricao : {type:String},
    quantidade  : {type:Number, default:1},
    valorCompra  : {type:Number},
    desconto  : {type:Number},
    iva  : {type:Number},
    taxaLucro  : {type:Number},
    valorVenda  : {type:Number, required:true},
},{timestamps:true})

const ProductoServico = mongoose.model('ProductoServico',prudctoServicoSchema)

module.exports = ProductoServico