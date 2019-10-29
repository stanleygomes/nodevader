const express = require('express')
const helloWorldRest = express.Router()
const httpResponse = require('../../utils/httpResponse')
const helloWorldService = require('./helloWorldService')

helloWorldRest.get('', (req, res) => {
  helloWorldService.helloWorld().then((response) => {
    httpResponse.json(res, response)
  })
})

module.exports = helloWorldRest
