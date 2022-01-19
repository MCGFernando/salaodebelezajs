const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriaSchema = new Schema({
    categoria : {type:String, required:true},
    idCategoriaPai : {type:String, required:false},
    sequenciaCategoria : {type:String, required:true},
    sequenciaSubCategoria : {type:String, required:false}
}, {timestamps:true})

const Categoria = mongoose.model('Categoria',categoriaSchema)

module.exports = Categoria