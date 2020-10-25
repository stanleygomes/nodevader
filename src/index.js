const express = require('express')
const config = require('./config')
const routes = require('./routes')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const i18nUtils = require('./utils/i18n')
const privateKey = config.privateKey
const dateFns = require('date-fns')
const timeStart = dateFns.format(new Date(), 'dd/MM/yyyy HH:mm')
const started = () => console.log(`Running on port ${config.server.port}. Started at: ${timeStart}.`)

if (!privateKey) {
  console.log(i18nUtils.translate('none_private_key'))
  process.exit(1)
}

const app = express()

app.use(cors(config.cors))
app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(config.baseEndpoint, routes)

app.listen(config.server.port, started)
