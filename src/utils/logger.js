const winston = require('winston')
const config = require('../config.json')

const createLogger = (loggerConfig) => {
  return new Promise((resolve, reject) => {
    const logger = winston.createLogger(loggerConfig)

    if (!logger) {
      console.log('erro')
      reject(reject)
    }

    resolve(logger)
  })
}

const error = (message) => {
  const errorLoggerConfig = {
    level: 'error',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File(config.logger.error)
    ]
  }

  createLogger(errorLoggerConfig).then((logger) => {
    logger.log({
      level: 'error',
      message: message
    })
  }).catch((error) => {
    console.log(error)
  })
}

const info = (message) => {
  const infoLoggerConfig = {
    level: 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File(config.logger.error)
    ]
  }

  createLogger(infoLoggerConfig).then((logger) => {
    logger.log({
      level: 'info',
      message: message
    })
  }).catch((error) => {
    console.log(error)
  })
}

module.exports = {
  error,
  info
}
