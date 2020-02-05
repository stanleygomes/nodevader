const express = require('./express')
const started = () => console.log(`Running on port ${express.config.port}. Started at: ${express.time}.`)

express.app.listen(express.config.port, started)
