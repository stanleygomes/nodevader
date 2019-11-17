const express = require('express')
const router = express.Router()
const sampleRest = require('../api/sample/sampleRest')
const authRest = require('../api/auth/authRest')
const protectedRoutesRest = require('../api/auth/protectedRoutesRest')
const authMiddleware = require('../middlewares/authMiddleware')

/* non auth routes */
router.use('/auth', authRest)
router.use('/sample', sampleRest)

/* auth routes */
router.use(authMiddleware)
router.use('/protected', protectedRoutesRest)

module.exports = router
