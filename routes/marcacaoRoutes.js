const express = require('express')
const marcacaoController = require('../controllers/marcacaoController')
const router = express.Router()

router.get('/', marcacaoController.marcacao_list)
router.get('/new', marcacaoController.marcacao_new)

router.post('/', marcacaoController.marcacao_create)
router.get('/:id', marcacaoController.marcacao_list_id)

router.delete('/:id', marcacaoController.marcacao_delete)
router.put('/:id', marcacaoController.marcacao_update)


module.exports = router