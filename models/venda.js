const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vendaSchema = new Schema({
    cliente : {type:Schema.Types.ObjectId, ref:'Cliente', required:true},
    staff : {type:Schema.Types.ObjectId, ref:'Staff', required:true},
    parcela: {type:Number},
    valorTotalVenda: {type:Number},
    tipoPagamento: {type:String},
    itemVenda:[{
        productoServico : {type:Schema.Types.ObjectId, ref:'ProductoServico', required:true},
        quantidade:{type:Number}
        /* desconto:{type:Number} */
        /* marcacao : {type:Schema.Types.ObjectId, ref:'Marcacao'}, */
    }],
    pagamento:[{
        valorPago: {type:Number},
        dataPagamento:{type:Date, default: new Date()},
    }],
    estado:{type:String, default:'Aberto'}
}, {timestamps:true})

const Venda = mongoose.model('Venda',vendaSchema)

module.exports = Venda