const express = require('express')
const productoServicoController = require('../controllers/productoServicoController')
const router = express.Router()

router.get('/', productoServicoController.productoServico_list)
router.get('/new', productoServicoController.productoServico_new)

router.post('/', productoServicoController.productoServico_create)
router.get('/:id', productoServicoController.productoServico_list_id)

router.delete('/:id', productoServicoController.productoServico_delete)
router.put('/:id', productoServicoController.productoServico_update)


module.exports = router