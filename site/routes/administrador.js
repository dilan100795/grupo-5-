const express = require('express')
const router = express.Router()

let {crear,editar,listar,nuevo} = require('../controllers/adminController')

router.get('/listar', listar)
router.get('/editar', editar)

/*crear producto*/
router.get('/crear', crear)
router.post('/crear', nuevo)

module.exports = router