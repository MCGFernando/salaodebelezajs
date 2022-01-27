const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contaSchema = new Schema({
    nome : {type:String, required:true},
    email : {type:String, required:true},
    telefone : {type:String, required:true},
    senha : {type:String, required:true},
    cliente : {type:Boolean, default:false},
    staff : {type:Boolean, default:false},
    admin : {type:Boolean, default:false},
    estado : {type:Boolean, default:false}
}, {timestamps:true})

const Conta = mongoose.model('Conta',contaSchema)

module.exports = Conta