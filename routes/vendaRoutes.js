const express = require('express')
const vendaController = require('../controllers/vendaController')
const router = express.Router()


router.get('/new', vendaController.venda_new)

module.exports = router
