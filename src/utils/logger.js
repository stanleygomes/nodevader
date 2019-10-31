const winston = require('winston')

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

const error = (message, level) => {
  log(message, 'error')
}

const info = (message, level) => {
  log(message, 'info')
}

const log = (message, level) => {
  const errorLoggerConfig = {
    level: level || 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        'level': 'info',
        'filename': 'logs/nodetello-' + (level || 'info') + '.log',
        'maxsize': 10000,
        'maxFiles': 10
      })
    ]
  }

  createLogger(errorLoggerConfig).then((logger) => {
    logger.log({
      level: 'error',
      date: new Date(),
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
