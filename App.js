//requireing File System module
const fs = require('fs')
//requireing express module
const express = require('express')
const port = 3000
const directory = __dirname
const Conta = require('./models/conta')
//Creating an Express App
const App = express()

//Setting the View Engine
App.set('view engine', 'ejs')
//Listen to the port
App.listen(port)

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
            res.render('conta/table_list_conta', { conta: result })
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
        res.redirect('/')//-------------------------Aqui
    }).catch((err) => {
        console.log(err)
    })
})
//Delete Conta

//Update Conta

/* ---------- FIM CONTA ---------- */