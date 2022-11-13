const express = require('express')
const router = express.Router()
let db = require('../database/models')

let {home,nosotros} = require('../controllers/indexController')

router.get('/', home)
router.get('/nosotros', nosotros)

/*router.get("/prueba", (req, res) => {db.historiales.findAll({
    include: [
        {
            all: true
        }
    ]
})
.then(editoriales => {
    return res.send(editoriales)
})
.catch(err => res.send(err))

})*/

/*    
dejo comentado el viejo redireccionamento de basura: 
                            <a href="/administrador/editar/<%= product.id%>">
                              <button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
                          </a>
                          
                            
                              <form action="/administrador/destruir/<%= product.id%>?_method=DELETE" method="post">
                                <button type="submit" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                              </form>

 */

module.exports = router