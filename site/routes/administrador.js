const express = require('express')
const router = express.Router()

let {crear,editar,listar,nuevo} = require('../controllers/adminController')

router.get('/listar', listar)

/*crear producto*/
router.get('/crear', crear)
router.post('/crear', nuevo)

/*editar producto*/ 
router.get('/editar', editar)
/*router.get('/editar/:id', cambio);*/
router.put('/editar/:id', actualizar);

/* Eliminar un producto */
router.delete('/destruir/:id', destruir);

module.exports = router