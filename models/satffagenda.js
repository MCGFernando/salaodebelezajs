const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffAgendaSchema = new Schema({
    dia : {type:Number, required:true},
    entrada : {type:String, required:true},
    saida : {type:String, required:true},
    estado : {type:Boolean, default:true}
})

const StaffAgenda = mongoose.model('StaffAgenda', staffAgendaSchema)

module.exports = StaffAgenda	    