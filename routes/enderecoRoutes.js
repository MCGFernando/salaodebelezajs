const express = require('express')
const enderecoController = require('../controllers/enderecoController')
const router = express.Router()

router.get('/', enderecoController.endereco_list)
//router.get('/new', contactoController.)

router.post('/', enderecoController.endereco_create)
router.get('/:id', enderecoController.endereco_list_id)

router.get('/clientes', enderecoController.endereco_clientes_list)
router.get('/clientes/:id', enderecoController.endereco_clientes_list_id)

router.get('/staff', enderecoController.endereco_staf_list)
router.get('/staff/:id', enderecoController.endereco_staf_list_id)

router.delete('/:id', enderecoController.endereco_delete)
router.put('/:id', enderecoController.endereco_update)


module.exports = router