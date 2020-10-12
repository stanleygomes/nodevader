const axios = require('axios')
const i18nUtils = require('./i18n')
const config = require('../config')

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    request('post', url, params).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    request('get', url, params).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

const request = (method, endpoint, body, headers = {}) => {
  return new Promise((resolve, reject) => {
    const baseURL = config.request.baseUrl
    const h = Object.assign({}, headers, config.request.defaultHeaders)
    const defaultParams = {
      method: method,
      url: `${baseURL}${endpoint}`,
      data: JSON.stringify(body),
      headers: h,
      timeout: config.request.timeout,
      responseType: config.request.responseType
    }

    axios(defaultParams).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

const error = (res, message, status) => {
  console.log(message || {}, status || {})
  res
    .status(status || 500)
    .set('Content-Type', 'application/json')
    .json({
      status: status || 500,
      message: (message || i18nUtils.translate('generic_error'))
    })
}

const json = (res, data) => {
  res
    .status(200)
    .set('Content-Type', 'application/json')
    .json(data)
}

module.exports = {
  error,
  json,
  post,
  get
}
