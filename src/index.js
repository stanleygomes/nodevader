const express = require('express')
var findup = require('findup-sync')
var config = require(findup('config.json'))
const routes = require('./routes')
const moment = require('moment')
const cors = require('cors')

const app = express()
const timeStart = moment().format('DD/MM/YYYY HH:mm')

app.use(cors(config.cors))
app.use(config.baseEndpoint, routes)
app.listen(config.server.port, () => console.log(`Running on port ${config.server.port}. Started at: ${timeStart}`))
