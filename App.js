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
//,{useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{console.log('Conectado a BD')})
.catch((err)=>console.log(err))
App.set('view engine', 'ejs')



//Setting the View Engine
App.set('view engine', 'ejs')
//Listen to the port
App.listen(port)
App.use(express.urlencoded({extended:true}))

/* Setting The Request Handlers */

/* ---------- CONTA ---------- */

//Get Conta
const Conta = require('./models/conta')
App.get('/', (req, res) => {
    res.render('conta/index')
})

App.get('/contas/new', (req, res) => {
    res.render('conta/form_cadastro_conta')
})

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
//Delete Conta

//Update Conta

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
/* ---------- FIM CATEGORIA ---------- */