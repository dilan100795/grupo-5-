const express = require('express')
const router = express.Router()

let {crear,editar,listar} = require('../controllers/adminController')

router.get('/listar', listar)
router.get('/editar', editar)
router.get('/crear', crear)

module.exports = router