const express = require('./express')
const config = require('./config')
const moment = require('moment')

const timeStart = moment().format('DD/MM/YYYY HH:mm')

express.listen(config.port, () => console.log(`Running on port ${config.port}. Started at: ${timeStart}`))
