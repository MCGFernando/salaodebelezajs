const ProductoServico = require("../models/productoServico");
const Categoria = require("../models/categoria");

const productoServico_list = (req, res) => {
  ProductoServico.find()
    .sort({ createdAt: -1 })
    .populate("categoria")
    .then((result) => {
      res.render("productoservico/table_lista_productoservico", {productoservicos : result });
      //res.send(result)
    })
    .catch((err) => console.log(err));
};

const productoServico_list_autocomplete = (req, res) => {
  const search = req.params.q;
  ProductoServico.find({$productoServico : search})
    .sort({ createdAt: -1 })
    .populate("categoria")
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
};

const productoServico_list_id = (req, res) => {};

const productoServico_new = (req, res) => {
  Categoria.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("productoservico/form_cadastro_productoservico", {
        categorias: result,
      });
    })
    .catch((err) => console.log(err));
};

const productoServico_create = (req, res) => {
  const productoservico = new ProductoServico(req.body);
  productoservico
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

const productoServico_update = (req, res) => {};

const productoServico_delete = (req, res) => {};

module.exports = {
  productoServico_new,
  productoServico_create,
  productoServico_list,
  productoServico_list_id,
  productoServico_update,
  productoServico_delete,
  productoServico_list_autocomplete
};
