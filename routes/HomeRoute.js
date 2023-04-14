const express = require('express')
const { homepage, header, getPage } = require('../controllers/HomeController')
const router = express.Router()

router.get('/' , homepage)
// router.get('/:page' , getPage)
router.get('/header', header)


module.exports = router