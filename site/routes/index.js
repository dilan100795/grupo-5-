const express = require('express')
const router = express.Router()

let {home,nosotros} = require('../controllers/indexController')

router.get('/', home)
router.get('/nosotros', nosotros)


module.exports = router