const express = require('express')
const helloWorldResource = express.Router()
const http = require('../utils/http')
// const helloWorldService = require('../service/helloWorldService')

helloWorldResource.get('', (req, res) => {
  http.httpJson(res, {
    message: 'Hello World'
  })
  // helloWorldService.helloWorld(req, res, http.callbackResponse(res))
})

module.exports = helloWorldResource
