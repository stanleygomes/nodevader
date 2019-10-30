const express = require('express')
const router = express.Router()
const sampleRest = require('../api/sample/sampleRest')
const middlewares = require('../middlewares')

router.use(middlewares)
router.use('/sample', sampleRest)

module.exports = router
