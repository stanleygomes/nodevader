const express = require('express')
const protectedRoutesRest = express.Router()
const httpResponseUtils = require('../../utils/httpResponseUtils')
const i18nUtils = require('../../utils/i18nUtils')
const message = i18nUtils.translate('Hello')

protectedRoutesRest.get('/logger', (req, res) => {
  httpResponseUtils.json(res, message)
})

module.exports = protectedRoutesRest
