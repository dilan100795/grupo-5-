const express = require('express')
const router = express.Router()

let {carrito,detalle,categorias} = require('../controllers/productosController')

router.get('/carrito', carrito)
router.get('/detalle/:id',detalle)
router.get('/categorias',categorias)
module.exports = router