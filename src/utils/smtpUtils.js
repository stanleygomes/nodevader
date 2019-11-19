const config = require('../config')
const nodemailer = require('nodemailer')

const validateParameters = (emailData) => {
  let errorMessage = null

  if (emailData) {
    if (emailData.to && emailData.to.length > 0) {
      emailData.to = emailData.to.join()
    }
    if (!emailData.subject) {
      errorMessage = 'Invalid mail subject'
    }
    if (!emailData.html) {
      errorMessage = 'Invalid mail html'
    }
  } else {
    errorMessage = 'Invalid mail parameters'
  }

  if (errorMessage) {
    return {
      error: true,
      message: errorMessage
    }
  } else {
    return emailData
  }
}

const send = (emailData, transporter) => {
  return new Promise((resolve, reject) => {
    emailData = Object.assign(emailData, config.smtp.send)

    transporter.sendMail(emailData).then((info) => {
      const response = {
        response: info,
        messageUrl: nodemailer.getTestMessageUrl(info)
      }
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

const sendMail = (emailData) => {
  return new Promise((resolve, reject) => {
    const params = validateParameters(emailData)

    if (params && params.error) {
      const errorMessage = new Error(params.error)
      reject(errorMessage)
    }

    emailData = Object.assign(emailData, params)
    const transporter = nodemailer.createTransport(config.smtp)

    send(emailData, transporter).then((resolved) => {
      const response = {
        emailData: emailData,
        response: resolved
      }

      resolve(response)
    }).catch((error) => {
      const errorMessage = new Error(error)
      reject(errorMessage)
    })
  })
}

module.exports = {
  sendMail
}
