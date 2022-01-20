const mongoose = require('mongoose')
const Schema = mongoose.Schema

const enderecoSchema = new Schema({
    contas_id : {type:String, required:true},
    endereco : {type:String, required:false},
    cidade : {type:String, required:false},
    bairro : {type:String, required:false}
})

const Endereco = mongoose.model('Endereco', clienteSchema)

module.exports = Endereco