const express = require('express')
const staffController = require('../controllers/staffController')
const router = express.Router()

router.get('/', staffController.staff_list)
router.get('/new', staffController.staff_new)

router.post('/', staffController.staff_create)
router.get('/:id', staffController.staff_list_id)

router.delete('/:id', staffController.staff_delete)
router.put('/:id', staffController.staff_update)


module.exports = router