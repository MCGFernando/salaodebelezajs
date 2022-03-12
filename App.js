//requireing File System module
const fs = require("fs");
const directory = __dirname;
//requireing express module
const express = require("express");
const port = 3000;
const categoriaRoutes = require('./routes/categoriaRoutes')
const productoServicoRoutes = require('./routes/productoServicoRoutes')
const marcacaoRoutes = require('./routes/marcacaoRoutes')
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

App.get("/staff/new", (req, res) => {
  res.render("staff/form_cadastro_staff");
});

App.get("/clientes/new", (req, res) => {
  res.render("cliente/form_cadastro_cliente");
});
/* ---------- FIM LOGIN ---------- */

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

/* ---------- FIM CONTA ---------- */

/* ---------- FIM CATEGORIA ---------- */
const Categoria = require("./models/categoria");
App.use('/categorias',categoriaRoutes)
/* ---------- FIM CATEGORIA ---------- */



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

/* ---------- CLIENTE ---------- */
const Cliente = require("./models/cliente");

App.post("/clientes", (req, res) => {
  const conta = new Conta(req.body);

  conta
    .save()
    .then((result) => {
      console.log("Conta Cadastrada");
    })
    .catch((err) => console.log(err));

  const endereco = new Endereco({
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    bairro: req.body.bairro,
    conta,
  });
  endereco
    .save()
    .then((result) => {
      console.log("Endereco Cadastrada");
    })
    .catch((err) => console.log(err));

  const cliente = new Cliente({
    imagem: req.body.imagem,
    nascimento: req.body.nascimento,
    genero: req.body.genero,
    desconto: req.body.desconto,
    conta,
  });
  cliente
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

App.get("/clientes", (req, res) => {
  Cliente.find()
    .sort({ createdAt: -1 })
    .populate("conta")
    .then((result) => {
      res.render("cliente/table_lista_cliente", { clientes: result });
    })
    .catch((err) => console.log(err));
});

App.get("/clientes/:id", (req, res) => {
  const id = req.params.id;
  Cliente.findById(id)
    .populate("conta")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.render("404", { title: "Page not found" });
    });
});

App.put("/clientes/delete/:id", (req, res) => {});

App.put("/categorias/:id", (req, res) => {});

/* ---------- FIM CLIENTE ---------- */

/* ---------- CONTACTO ---------- */
const Contacto = require("./models/contacto");

App.post("/contactos", (req, res) => {});

App.get("/contactos", (req, res) => {});

App.get("/contactos/staff", (req, res) => {});

App.get("/contactos/clientes", (req, res) => {});

App.get("/contactos/:id", (req, res) => {});

App.delete("/contactos/:id", (req, res) => {});

App.put("/contactos/:id", (req, res) => {});

/* ---------- FIM CONTACTO ---------- */

/* ---------- ENDERECO ---------- */
const Endeereco = require("./models/endereco");

App.post("/enderecos", (req, res) => {});

App.get("/enderecos", (req, res) => {
  Endereco.find()
    .sort({ createdAt: -1 })
    .populate("conta")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

App.get("/enderecos/staff", (req, res) => {});

App.get("/enderecos/clientes", (req, res) => {});

App.get("/enderecos/:id", (req, res) => {});

App.delete("/enderecos/:id", (req, res) => {});

App.put("/enderecos/:id", (req, res) => {});

/* ---------- FIM ENDERECO ---------- */

/* ---------- STAFF ---------- */
const Staff = require("./models/staff");

App.post("/staff", (req, res) => {
  const conta = new Conta(req.body);

  conta
    .save()
    .then((result) => {
      console.log("Conta Cadastrada");
    })
    .catch((err) => console.log(err));

  const endereco = new Endereco({
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    bairro: req.body.bairro,
    conta,
  });
  endereco
    .save()
    .then((result) => {
      console.log("Endereco Cadastrada");
    })
    .catch((err) => console.log(err));

  const staff = new Staff({
    funcao: req.body.funcao,
    nascimento: req.body.nascimento,
    genero: req.body.genero,
    bi: req.body.bi,
    conta,
  });
  staff
    .save()
    .then((result) => {
      res.redirect("/staff");
    })
    .catch((err) => console.log(err));
});

/* async function saveStaff(req){
    const conta = new Conta(req.body)
    const staff = new Staff(req.body)
    const endereco = new Endereco(req.body)

    await conta.save()
    await endereco.save()
    await staff.save()
} */

App.get("/staff", (req, res) => {
  Staff.find()
    .sort({ createdAt: -1 })
    .populate("conta")
    .then((result) => {
      res.render("staff/table_lista_staff", { staffs: result });
    })
    .catch((err) => console.log(err));
});

App.get("/staff/:id", (req, res) => {
  const id = req.params.id;
  Staff.findById(id)
    .populate("conta")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.render("404", { title: "Page not found" });
    });
});

App.put("/staff/delete/:id", (req, res) => {});

App.put("/staff/:id", (req, res) => {});

/* ---------- FIM STAFF ---------- */

/* ---------- FIM PRODUCTO SERVICO ---------- */
const { result } = require("lodash");
App.use('/productoservico', productoServicoRoutes)
/* ---------- FIM PRODUCTO SERVICO ---------- */

/* ---------- MARCACAO ---------- */
const Marcacao = require("./models/marcacao");
App.use('/marcacoes', marcacaoRoutes)

/* ---------- FIM MARCACAO ---------- */
