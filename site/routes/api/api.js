const express = require('express')
const router = express.Router()

let {algo} = require('../../controllers/apiController/apiController')

router.get('/algo', algo)

module.exports = router