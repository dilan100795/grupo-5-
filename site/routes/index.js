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


module.exports = router