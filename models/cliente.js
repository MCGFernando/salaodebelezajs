const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clienteSchema = new Schema({
    conta : {type:Schema.Types.ObjectId, ref:'Conta', required:true},
    genero : {type:String, required:false},
    nascimento : {type:String, required:false},
    imagem : {type:String, required:false},
    desconto: {type:Number, required:false},
    estado : {type:Boolean, default:true},
    endereco : {
        endereco : {type:String, required:false},
        cidade : {type:String, required:false},
        bairro : {type:String, required:false}
    }
},{timestamps:true})

const Cliente = mongoose.model('Cliente', clienteSchema)

module.exports = Cliente	    