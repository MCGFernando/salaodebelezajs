const mongoose = require('mongoose')
const Schema = mongoose.Schema


const agendaSchema = new Schema({
    staff : {type:Schema.Types.ObjectId, ref:'Staff', required:true},
    staffagenda : {
        dia : {type:Number, required:true},
        entrada : {type:String, required:true},
        saida : {type:String, required:true},
        estado : {type:Boolean, default:true}
    }
},{timestamps:true})

const Agenda = mongoose.model('Agenda', agendaSchema)

module.exports = Agenda	    