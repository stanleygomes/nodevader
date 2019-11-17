const express = require('express')
const sampleRest = express.Router()
const httpResponseUtils = require('../../utils/httpResponseUtilsUtils')
const sampleService = require('./sampleService')
const loggerUtils = require('../../utils/loggerUtils')
const smtpUtils = require('../../utils/smtpUtils')
const httpRequestUtils = require('../../utils/httpRequestUtils')

sampleRest.get('/logger', (req, res) => {
  loggerUtils.error('Error!!')
  loggerUtils.info('Info!!')
  httpResponseUtils.json(res, {
    message: 'Written log to a file'
  })
})

sampleRest.get('/helloWorld', (req, res) => {
  sampleService.helloWorld().then((response) => {
    httpResponseUtils.json(res, response)
  })
})

sampleRest.get('/httpRequestUtils', (req, res) => {
  const params = {
    url: 'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg'
  }

  httpRequestUtils.get(params).then((response) => {
    console.log('OK')
    httpResponseUtils.json(res, response)
  }).catch((error) => {
    console.log('error')
    httpResponseUtils.error(res, error)
  })
})

sampleRest.get('/sendMail', (req, res) => {
  const emailData = {
    to: ['recipient1@server.com', 'recipient2@server.com'],
    subject: 'Hello ✔✔✔',
    html: '<b>Hello world ✔✔✔</b>'
  }

  smtpUtils.sendMail(emailData).then((response) => {
    console.log(response)
    httpResponseUtils.json(res, response)
  }).catch((error) => {
    console.log(error)
    loggerUtils.error(error)
    httpResponseUtils.error(res, error)
  })
})

sampleRest.get('/validateJsonBody', (req, res) => {
  sampleService.validateJsonBody(req).then((response) => {
    console.log(response)
    httpResponseUtils.json(res, response)
  }).catch((error) => {
    console.log(error)
    loggerUtils.error(error)
    httpResponseUtils.error(res, error)
  })
})

module.exports = sampleRest
