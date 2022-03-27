const Categoria = require("../models/categoria");

const categoria_new = (req, res) => {
  res.render("categoria/form_cadastro_categoria");
};

const categoria_create = (req, res) => {
  const categoria = new Categoria(req.body);
  categoria
    .save()
    .then((result) => {
       
      res.redirect("/categorias");
    })
    .catch((err) => {
      console.log(err);
    });
};

const categoria_list = (req, res) => {
  Categoria.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("categoria/table_lista_categoria", { categorias: result });
    })
    .catch((err) => console.log(err));
};

const categoria_list_id = (req, res) => {
  const id = req.params.id;
  Categoria.findById(id)
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("categoria/details", { categoria: result });
    })
    .catch((err) => console.log(err));
};

const categoria_update = (req, res) => {};
const categoria_delete = (req, res) => {};

module.exports = {
  categoria_new,
  categoria_create,
  categoria_list,
  categoria_list_id,
  categoria_update,
  categoria_delete,
};
