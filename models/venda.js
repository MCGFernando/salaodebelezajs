const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vendaSchema = new Schema({
    cliente : {type:Schema.Types.ObjectId, ref:'Cliente', required:true},
    staff : {type:Schema.Types.ObjectId, ref:'Staff', required:true},
    estado:{type:String, default:'Aberto'}
}, {timestamps:true})

const Venda = mongoose.model('Venda',vendaSchema)

module.exports = Venda