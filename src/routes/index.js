const express = require('express')
const router = express.Router()
const helloWorldResource = require('../resource/helloWorldResource')
const middlewares = require('../middlewares')

router.use(middlewares)
router.use('/helloWorld', helloWorldResource)

module.exports = router
