const express = require('express')
const contactoController = require('../controllers/contactoController')
const router = express.Router()

router.get('/', contactoController.contacto_list)
//router.get('/new', contactoController.)

router.post('/', contactoController.contacto_create)
router.get('/:id', contactoController.contacto_list_id)

router.get('/cliesntes', contactoController.contacto_clientes_list)
router.get('/cliesntes/:id', contactoController.contacto_clientes_list_id)

router.get('/staff', contactoController.contacto_staff_list)
router.get('/staff/:id', contactoController.contacto_staff_list_id)

router.delete('/:id', contactoController.contacto_delete)
router.put('/:id', contactoController.contacto_update)


module.exports = router