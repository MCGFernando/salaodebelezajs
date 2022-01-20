const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agendaSchema = new Schema({
    staff_id : {type:String, required:true},
    dia : {type:Number, required:true},
    horaInicio : {type:String, required:true},
    horaFim : {type:String, required:true},
    estado : {type:Boolean, default:true},
},{timestamps:true})

const Agenda = mongoose.model('Agenda', agendaSchema)

module.exports = Agenda	    