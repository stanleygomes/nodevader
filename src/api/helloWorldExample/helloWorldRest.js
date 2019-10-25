const express = require('express')
const helloWorldRest = express.Router()
const httpResponse = require('../../utils/httpResponse')
const smtp = require('../../utils/smtp')
const helloWorldService = require('./helloWorldService')

helloWorldRest.get('', (req, res) => {
  httpResponse.json(res, helloWorldService.helloWorld())
})

module.exports = helloWorldRest
