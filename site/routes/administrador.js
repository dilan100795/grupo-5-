const express = require('express')
const router = express.Router()

let {crear,editar,listar,nuevo,actualizar,eliminar} = require('../controllers/adminController')

router.get('/listar', listar)
router.get('/editar', editar)

/*crear producto*/
router.get('/crear', crear)
router.post('/crear', nuevo)

router.get('/editar/:id', editar);
router.put('/editar/:id', actualizar);

router.delete('/eliminar/:id' , eliminar);

module.exports = router