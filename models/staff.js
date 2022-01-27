const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({
    conta : {type:Schema.Types.ObjectId, ref:'Conta', required:true},
    bi : {type:String, required:true},
    genero : {type:Number, required:true},
    nascimento : {type:String, required:true},
    imagem : {type:String, required:false},
    funcao : {type:String, required:true},
    estado : {type:Boolean, default:true},
    agenda : [{type:Schema.Types.ObjectId, ref:'Agenda', required:true}],
    endereco : [{type:Schema.Types.ObjectId, ref:'Endereco', required:true}]
}, {timestamps:true})

const Staff = mongoose.model('Staff',staffSchema)

module.exports = Staff
