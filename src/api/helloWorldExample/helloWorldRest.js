const express = require('express')
const helloWorldRest = express.Router()
const httpResponse = require('../../utils/httpResponse')
const helloWorldService = require('./helloWorldService')

const fs = require('fs')

const httpRequest = require('../../utils/httpRequest')

helloWorldRest.get('', (req, res) => {
  httpRequest.post({}).then((response) => {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    console.log('baixou')
    httpResponse.json(res, helloWorldService.helloWorld())
  }).catch((error) => {
    httpResponse.error(res, 'error')
    console.log(error)
  })
})

module.exports = helloWorldRest
