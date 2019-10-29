const express = require('express')
const config = require('./config.json')
const routes = require('./routes')
const moment = require('moment')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const i18n = require('./utils/i18n')

const app = express()
const timeStart = moment().format('DD/MM/YYYY HH:mm')

const expressConfig = {
  cors: config.cors,
  baseEndpoint: config.baseEndpoint,
  port: config.server.port
}

app.use('/static', express.static('src/public'))
app.use(cors(expressConfig.cors))
app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(expressConfig.baseEndpoint, routes)

app.use((req, res, next) => {
  return res
    .status(404)
    .send({ message: i18n.translate('route_not_found %s', req.url) })
})

app.use((err, req, res, next) => {
  if (err) {
    return res
      .status(500)
      .send({ message: i18n.translate('system_error') })
  }
})

module.exports = {
  app: app,
  config: expressConfig,
  time: timeStart
}
