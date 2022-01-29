const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agendaSchema = new Schema({
    staff : {type:Schema.Types.ObjectId, ref:'Staff', required:true},
    dia : {type:Number, required:true},
    horaEntrada : {type:String, required:true},
    horaSaida : {type:String, required:true},
    estado : {type:Boolean, default:true}
},{timestamps:true})

const Agenda = mongoose.model('Agenda', agendaSchema)

module.exports = Agenda	    