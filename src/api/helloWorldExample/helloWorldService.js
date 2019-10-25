const i18n = require('../../utils/i18n')
const message = i18n.translate('Hello')

const helloWorld = () => {
  return {
    message: message
  }
}

module.exports = {
  helloWorld
}
