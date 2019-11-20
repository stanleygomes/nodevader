const express = require('express')
const sampleRest = express.Router()
const httpResponseUtils = require('../../utils/httpResponseUtils')
const sampleService = require('./sampleService')
const fsUtils = require('../../utils/fsUtils')
const firebase = require('../../utils/firebaseUtils')
const fileUtils = require('../../utils/fileUtils')
const loggerUtils = require('../../utils/loggerUtils')
const smtpUtils = require('../../utils/smtpUtils')
const httpRequestUtils = require('../../utils/httpRequestUtils')

sampleRest.get('/mustache', (req, res) => {
  sampleService.helloWorld().then((response) => {
    httpResponseUtils.json(res, response)
  })
})

sampleRest.get('/firebase', (req, res) => {
  firebase.createOrUpdateDocument('myFirstCollection2', { message: 'Hello World 2!!' }, 'messages').then((response) => {
    httpResponseUtils.json(res, response)
  }).catch((error) => {
    httpResponseUtils.error(res, error)
  })
})

sampleRest.get('/firebase/upload', fileUtils.single('file'), (req, res) => {
  console.log('Upload Image')
  const file = req.file
  if (file) {
    firebase.uploadFile(file).then((success) => {
      res.status(200).send({
        status: 'success'
      })
    }).catch((error) => {
      console.error(error)
    })
  }
})

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

sampleRest.get('/fs', (req, res) => {
  fsUtils.writeFile('./test.txt', 'hello!').then(response => {
    console.log(response)
  })
})

sampleRest.get('/httpRequest', (req, res) => {
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
