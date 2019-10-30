const express = require('express')
const sampleRest = express.Router()
const httpResponse = require('../../utils/httpResponse')
const sampleService = require('./sampleService')
const logger = require('../../utils/logger')
const httpRequest = require('../../utils/httpRequest')

sampleRest.get('/logger', (req, res) => {
  logger.error('Error!!')
  logger.info('Info!!')
  httpResponse.json(res, {
    message: 'Written log to a file'
  })
})

sampleRest.get('/helloWorld', (req, res) => {
  sampleService.helloWorld().then((response) => {
    httpResponse.json(res, response)
  })
})

sampleRest.get('/httpRequest', (req, res) => {
  const params = {
    url: 'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg'
  }

  httpRequest.get(params).then((response) => {
    console.log('OK')
    httpResponse.json(res, response)
  }).catch((error) => {
    console.log('error')
    httpResponse.error(res, error)
  })
})

module.exports = sampleRest
