const express = require('express')
const vendaController = require('../controllers/vendaController')
const router = express.Router()


router.get('/', vendaController.venda_list)
router.get('/new', vendaController.venda_new)
router.post('/', vendaController.venda_create)

module.exports = router
