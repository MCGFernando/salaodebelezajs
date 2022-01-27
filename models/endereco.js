const mongoose = require('mongoose')
const Schema = mongoose.Schema

const enderecoSchema = new Schema({
    conta : {type:Schema.Types.ObjectId, ref:'Conta', required:true},
    endereco : {type:String, required:false},
    cidade : {type:String, required:false},
    bairro : {type:String, required:false}
})

const Endereco = mongoose.model('Endereco', enderecoSchema)

module.exports = Endereco