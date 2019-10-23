const express = require('express')
const helloWorldRest = express.Router()
const httpResponse = require('../../utils/httpResponse')
const smtp = require('../../utils/smtp')
// const helloWorldService = require('../service/helloWorldService')

helloWorldRest.get('', (req, res) => {
  smtp.main().catch(console.error)
  httpResponse.json(res, {
    message: 'Hello World'
  })

  // helloWorldService.helloWorld(req, res)
})

module.exports = helloWorldRest
