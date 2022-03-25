const express = require('express')
const clienteController = require('../controllers/clienteController')
const router = express.Router()

router.get('/', clienteController.cliente_list)
router.get('/new', clienteController.cliente_new)

router.post('/', clienteController.cliente_create)
router.get('/:id', clienteController.cliente_list_id)
router.get('/update/:id', clienteController.cliente_list_id_controller)

router.delete('/:id', clienteController.cliente_delete)
router.put('/:id', clienteController.cliente_update)


module.exports = router