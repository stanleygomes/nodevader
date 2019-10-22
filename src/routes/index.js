const express = require('express')
const router = express.Router()
const helloWorldRest = require('../api/helloWorld/helloWorldRest')
const middlewares = require('../middlewares')

router.use(middlewares)
router.use('/helloWorld', helloWorldRest)

module.exports = router
