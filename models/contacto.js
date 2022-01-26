const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactoSchema = new Schema({
    contas_id : {type:String, required:true},
    telefone : {type:String, required:false},
    email : {type:String, required:false}
})

const Contacto = mongoose.model('Contacto', contactoSchema)

module.exports = Contacto