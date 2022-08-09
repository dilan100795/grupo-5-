const express = require('express')
const router = express.Router()

let {home,nosotros, error404} = require('../controllers/indexController')

router.get('/', home)
router.get('/nosotros', nosotros)
/*router.get('*', error404) */


module.exports = router