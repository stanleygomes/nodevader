const express = require('express')
const helloWorldRest = express.Router()
const httpResponse = require('../../utils/httpResponse')
<<<<<<< HEAD:src/api/helloWorld/helloWorldRest.js
const smtp = require('../../utils/smtp')
// const helloWorldService = require('../service/helloWorldService')

helloWorldRest.get('', (req, res) => {
  smtp.main().catch(console.error)
  httpResponse.json(res, {
    message: 'Hello World'
  })

  // helloWorldService.helloWorld(req, res)
=======
const helloWorldService = require('./helloWorldService')

helloWorldRest.get('', (req, res) => {
  httpResponse.json(res, helloWorldService.helloWorld())
>>>>>>> master:src/api/helloWorldExample/helloWorldRest.js
})

module.exports = helloWorldRest
