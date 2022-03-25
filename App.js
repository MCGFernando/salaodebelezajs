//requireing File System module
const fs = require("fs");
const directory = __dirname;
//requireing express module
const express = require("express");
const port = 3000;
const categoriaRoutes = require('./routes/categoriaRoutes')
const productoServicoRoutes = require('./routes/productoServicoRoutes')
const marcacaoRoutes = require('./routes/marcacaoRoutes')
const staffRoutes = require('./routes/staffRoutes')
const clienteRoutes = require('./routes/clienteRoutes')
const enderecoRoutes = require('./routes/enderecoRoutes')
const vendaRoutes = require('./routes/vendaRoutes')
//Creating an Express App
const App = express();

const mongoose = require("mongoose");
const dbURI =
  "mongodb://netninja:test1234@node-shard-00-00.02vk8.mongodb.net:27017,node-shard-00-01.02vk8.mongodb.net:27017,node-shard-00-02.02vk8.mongodb.net:27017/salaobeleza?ssl=true&replicaSet=atlas-c50oyj-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Conectado a BD");
  })
  .catch((err) => console.log(err));

//Setting the View Engine
App.set("view engine", "ejs");
//Listen to the port
App.listen(port);
App.use(express.static("public/css"));
App.use(express.static("public/img"));
App.use(express.urlencoded({ extended: true }));

/* ---------- LOGIN ---------- */
App.get("/", (req, res) => {
  res.render("conta/index");
});

App.get("/contas/new", (req, res) => {
  res.render("conta/form_cadastro_conta");
});

/* ---------- CONTA ---------- */
const Conta = require("./models/conta");

App.get("/contas", (req, res) => {
  Conta.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("conta/table_list_conta", { contas: result });
    })
    .catch((err) => console.log(err));
});

App.get("/contas/:id", (req, res) => {
  const id = req.params.id;
  Conta.findById(id)
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("conta/detail_conta", { conta: result });
    })
    .catch((err) => console.log(err));
});

//Post Conta
App.post("/contas", (req, res) => {
  const conta = new Conta(req.body);
  conta
    .save()
    .then((result) => {
      res.redirect("/contas");
    })
    .catch((err) => {
      console.log(err);
    });
});

App.put("/contas/delete/:id", (req, res) => {});

App.put("/contas/:id", (req, res) => {});

/* CATEGORIA */
App.use('/categorias',categoriaRoutes)

/* ---------- AGENDA ---------- */
const Agenda = require("./models/agenda");

App.post("/agendas", (req, res) => {
  let agenda = [];
  let diaAgenda = req.body.dia;
  let entradaAgenda = req.body.entrada;
  let saidaAgenda = req.body.saida;
  const staff = new Staff(req.body);
  for (let i = 0; i < diaAgenda.length; i++) {
    //agenda.push({dia:diaAgenda[i], entrada:entradaAgenda[i], saida:saidaAgenda[i]})

    const agenda = new Agenda({
      staff,
      staffagenda: {
        dia: diaAgenda[i],
        entrada: entradaAgenda[i],
        saida: saidaAgenda[i],
      },
    });
    agenda
      .save()
      .then((result) => {
        console.log("ok");
      })
      .catch((err) => console.log(err));
  }
});

App.get("/agendas/staff/:id", (req, res) => {
  const id = req.params.id;
  Staff.findById(id)
    .populate("conta")
    .then((result) => {
      res.render("agenda/form_cadastro_agenda", { staffAgenda: result });
    })
    .catch((err) => {
      res.render("404", { title: "Page not found" });
    });
});
App.get("/agendas", (req, res) => {
  Agenda.find()
    .populate("staff")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.render("404", { title: "Page not found" });
    });
});
App.get("/agendas/:id", (req, res) => {});
App.delete("/agendas/:id", (req, res) => {});
App.put("/agendas/:id", (req, res) => {});
/* ---------- FIM AGENDA ---------- */

/*  CLIENTE  */
App.use('/clientes', clienteRoutes)


/* ---------- ENDERECO ---------- */
//App.use('', enderecoRoutes)

/* ---------- STAFF ---------- */
App.use('/staff', staffRoutes)

/* PRODUCTO SERVICO */
const { result } = require("lodash");
App.use('/productoservico', productoServicoRoutes)

/* ---------- MARCACAO ---------- */
App.use('/marcacoes', marcacaoRoutes)

App.use('/vendas', vendaRoutes)