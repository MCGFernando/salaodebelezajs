const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Conta = require('../models/conta')

const staffSchema = new Schema({
    //contas_id : {type:String, required:true},
    conta_contas : {type:Schema.Types.ObjectId, ref:'Conta', required:true},
    bi : {type:String, required:true},
    genero : {type:Number, required:true},
    nascimento : {type:String, required:true},
    imagem : {type:String, required:false},
    funcao : {type:String, required:true},
    estado : {type:Boolean, default:true}
}, {timestamps:true})

const Staff = mongoose.model('Staff',staffSchema)

module.exports = Staff
