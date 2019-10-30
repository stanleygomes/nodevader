const express = require('express')
const sampleRest = express.Router()
const httpResponse = require('../../utils/httpResponse')
const sampleService = require('./sampleService')
const logger = require('../../utils/logger')

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

module.exports = sampleRest
