const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multerProductos')

let {crear,listar,nuevo,editar,actualizar,destruir,historial,/*basura*/} = require('../controllers/adminController')

router.get('/listar', listar)
router.get('/historial', historial);

/*crear producto*/
router.get('/crear', crear)
router.post('/crear', upload.array('Imagen'), nuevo)


/*editar producto*/ 
/*router.get('/editar', editar)*/
router.get('/editar/:id', editar);
router.put('/editar/:id', upload.array('Imagen'), actualizar);

/* Eliminar un producto */
router.delete('/destruir/:id', destruir);
/*router.delete('/basura/:id', basura);*/

module.exports = router