const express = require('express')
const producerResource = express.Router()
const http = require('../utils/http')
const helloWorldService = require('../service/helloWorldService')

producerResource.get('', (req, res) => {
  http.httpJson(res, {
    'Hello': 'World'
  })
  // helloWorldService.helloWorld(req, res, http.callbackResponse(res))
})

module.exports = producerResource
