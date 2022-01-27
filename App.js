//requireing File System module
const fs = require('fs')
const directory = __dirname
//requireing express module
const express = require('express')
const port = 3000
//Creating an Express App
const App = express()

const mongoose = require('mongoose')
const dbURI = "mongodb://netninja:test1234@node-shard-00-00.02vk8.mongodb.net:27017,node-shard-00-01.02vk8.mongodb.net:27017,node-shard-00-02.02vk8.mongodb.net:27017/salaobeleza?ssl=true&replicaSet=atlas-c50oyj-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{console.log('Conectado a BD')})
.catch((err)=>console.log(err))

//Setting the View Engine
App.set('view engine', 'ejs')
//Listen to the port
App.listen(port)
App.use(express.static('public/css'))
App.use(express.static('public/img'))
App.use(express.urlencoded({extended:true}))

/* ---------- LOGIN ---------- */
App.get('/', (req, res) => {
    res.render('conta/index')
})

App.get('/contas/new', (req, res) => {
    res.render('conta/form_cadastro_conta')
})

App.get('/staffs/new', (req, res) => {
    res.render('staff/form_cadastro_staff')
})
/* ---------- FIM LOGIN ---------- */

/* ---------- CONTA ---------- */
const Conta = require('./models/conta')

App.get('/contas', (req, res) => {
    Conta.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('conta/table_list_conta', { contas: result })
        }).catch((err) => console.log(err))
})

App.get('/contas/:id', (req, res) => {
    const id = req.params.id
    Conta.findById(id).sort({ createdAt: -1 })
        .then((result) => {
            res.render('conta/detail_conta', { conta: result })
        }).catch((err) => console.log(err))
})

//Post Conta
App.post('/contas', (req, res) => {
    const conta = new Conta(req.body)
    conta.save().then((result) => {
        res.redirect('/contas')
    }).catch((err) => {
        console.log(err)
    })
})

App.put('/contas/delete/:id',(req, res)=>{

})

App.put('/contas/:id',(req, res)=>{

})


/* ---------- FIM CONTA ---------- */

/* ---------- FIM CATEGORIA ---------- */
const Categoria = require('./models/categoria')
App.get('/categorias', (req, res) => {
    Categoria.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('categoria/index', { categorias: result })
        }).catch((err) => console.log(err))
    
})

App.get('/categorias/new', (req, res) => {
    res.render('categoria/form_cadastro_categoria')
})

App.get('/categorias/:id', (req, res) => {
    const id = req.params.id
    Categoria.findById(id).sort({ createdAt: -1 })
        .then((result) => {
            res.render('categoria/details', { categoria : result })
        }).catch((err) => console.log(err))
})

//Post Categoria
App.post('/categorias', (req, res) => {
    const categoria = new Categoria(req.body)
    categoria.save().then((result) => {
        res.redirect('/categorias')
    }).catch((err) => {
        console.log(err)
    })
})

App.delete('/categorias/:id',(req, res)=>{

})

App.put('/categorias/:id',(req, res)=>{

})

/* ---------- FIM CATEGORIA ---------- */
/* ---------- AGENDA ---------- */
const Agenda = require('./models/agenda')

App.post('/agendas',(req, res)=>{

})

App.get('/agendas/staff/:id',(req, res)=>{

})
App.get('/agendas/:id',(req, res)=>{

})
App.delete('/agendas/:id',(req, res)=>{

})
App.put('/agendas/:id',(req, res)=>{

})
/* ---------- FIM AGENDA ---------- */


/* ---------- CLIENTE ---------- */
const Cliente = require('./models/cliente')

App.post('/clientes',(req, res)=>{

})

App.get('/clientes',(req, res)=>{

})

App.get('/clientes/:id',(req, res)=>{

})

App.put('/clientes/delete/:id',(req, res)=>{

})

App.put('/categorias/:id',(req, res)=>{

})

/* ---------- FIM CLIENTE ---------- */

/* ---------- CONTACTO ---------- */
const Contacto = require('./models/contacto')

App.post('/contactos',(req, res)=>{

})

App.get('/contactos',(req, res)=>{

})

App.get('/contactos/staff',(req, res)=>{

})

App.get('/contactos/clientes',(req, res)=>{

})

App.get('/contactos/:id',(req, res)=>{

})

App.delete('/contactos/:id',(req, res)=>{

})

App.put('/contactos/:id',(req, res)=>{

})

/* ---------- FIM CONTACTO ---------- */

/* ---------- ENDERECO ---------- */
const Endeereco = require('./models/endereco')

App.post('/enderecos',(req, res)=>{

})

App.get('/enderecos',(req, res)=>{

})

App.get('/enderecos/staff',(req, res)=>{

})

App.get('/enderecos/clientes',(req, res)=>{

})

App.get('/enderecos/:id',(req, res)=>{

})

App.delete('/enderecos/:id',(req, res)=>{

})

App.put('/enderecos/:id',(req, res)=>{

})

/* ---------- FIM ENDERECO ---------- */

/* ---------- STAFF ---------- */
const Staff = require('./models/staff')

App.post('/staff',(req, res)=>{

})

App.get('/staff',(req, res)=>{

})

App.get('/staff/:id',(req, res)=>{

})

App.put('/staff/delete/:id',(req, res)=>{

})

App.put('/staff/:id',(req, res)=>{

})

/* ---------- FIM STAFF ---------- */


/* ---------- FIM PRODUCTO SERVICO ---------- */
const ProductoServico = require('./models/productoServico')
App.get('/productoservico',(req, res)=>{
    ProductoServico.find().sort({ createdAt: -1 }).populate('categoria')
    .then((result) => {
        res.send(result)
    }).catch((err) => console.log(err))
})

App.get('/productoservico/new',(req, res)=>{
    Categoria.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('productoservico/form_cadastro_productoservico', { categorias: result })
    }).catch((err) => console.log(err))
})

App.post('/productoservico',(req, res)=>{
    const productoservico = new ProductoServico(req.body)
    productoservico.save().then((result)=>{
        res.send(result)
    }).catch((err) => console.log(err))
})

/* ---------- FIM PRODUCTO SERVICO ---------- */