const mongoose = require('mongoose')
const Schema = mongoose.Schema

const marcacaoSchema = new Schema({
    staff : {type:Schema.Types.ObjectId, ref:'Staff', required:true},
    cliente : {type:Schema.Types.ObjectId, ref:'Cliente', required:true},
    agenda : {type:Schema.Types.ObjectId, ref:'Agenda'},
    productoServico : {type:Schema.Types.ObjectId, ref:'ProductoServico', required:true},
    dataMarcacao : {type:String, required:true},
    horaMarcacao : {type:String, required:true},
    estado : {type:Boolean, default:true}
})

const Marcacao = mongoose.model('Marcacao', marcacaoSchema)

module.exports = Marcacao	    