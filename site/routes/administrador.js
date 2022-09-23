const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multerProductos')
const adminCheck = require('../middlewares/adminCheck')
let {crear,listar,nuevo,editar,actualizar,destruir,historial,basura} = require('../controllers/adminController')

router.get('/listar',adminCheck, listar)
router.get('/historial',adminCheck, historial);

/*crear producto*/
router.get('/crear',adminCheck, crear)
router.post('/crear', adminCheck,upload.array('Imagen'), nuevo)


/*editar producto*/ 
/*router.get('/editar', editar)*/
router.get('/editar/:id',adminCheck, editar);
router.put('/editar/:id', adminCheck,upload.array('Imagen'), actualizar);

/* Eliminar un producto */
router.delete('/destruir/:id', destruir);
router.delete('/basura/:id', basura);

module.exports = router