const i18n = require('./i18n')

const httpError = (res, message, status) => {
  console.log(message || {}, status || {})
  res
    .status(status || 500)
    .set('Content-Type', 'application/json')
    .json({
      status: status || 500,
      message: (message || i18n.translate('generic_error'))
    })
}

const httpJson = (res, data) => {
  res
    .status(200)
    .set('Content-Type', 'application/json')
    .json(data)
}

const callbackResponse = (res) => {
  return {
    callback: (error, results, response) => {
      error ? httpError(res) : httpJson(res, results)
    },
    response: res
  }
}

module.exports = {
  httpError,
  httpJson,
  callbackResponse
}
