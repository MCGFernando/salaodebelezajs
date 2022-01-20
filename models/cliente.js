const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clienteSchema = new Schema({
    contas_id : {type:String, required:true},
    genero : {type:Number, required:false},
    nascimento : {type:String, required:false},
    imagem : {type:String, required:false},
    estado : {type:Boolean, default:true},
},{timestamps:true})

const Cliente = mongoose.model('Cliente', clienteSchema)

module.exports = Cliente	    