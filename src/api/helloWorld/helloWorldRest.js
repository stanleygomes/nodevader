const express = require('express')
const helloWorldRest = express.Router()
const httpResponse = require('../../utils/httpResponse')
// const helloWorldService = require('../service/helloWorldService')

helloWorldRest.get('', (req, res) => {
  httpResponse.json(res, {
    message: 'Hello World'
  })

  // helloWorldService.helloWorld(req, res)
})

module.exports = helloWorldRest
